import Nanobus from 'nanobus';
import Keychain from './keychain';
import { delay, bytes } from './utils';
import { metadata } from './api';

export default class FileReceiver extends Nanobus {
  constructor(fileInfo) {
    super('FileReceiver');
    this.keychain = new Keychain(fileInfo.secretKey, fileInfo.nonce);
    if (fileInfo.requiresPassword) {
      this.keychain.setPassword(fileInfo.password, fileInfo.url);
    }
    this.fileInfo = fileInfo;
    this.reset();
  }

  get progressRatio() {
    return this.progress[0] / this.progress[1];
  }

  get progressIndefinite() {
    return this.state !== 'downloading';
  }

  get sizes() {
    return {
      partialSize: bytes(this.progress[0]),
      totalSize: bytes(this.progress[1])
    };
  }

  cancel() {
    if (this.downloadRequest) {
      this.downloadRequest.cancel();
    }
  }

  reset() {
    this.msg = 'fileSizeProgress';
    this.state = 'initialized';
    this.progress = [0, 1];
  }

  async getMetadata() {
    const meta = await metadata(this.fileInfo.id, this.keychain);
    this.keychain.setIV(meta.iv);
    this.fileInfo.name = meta.name;
    this.fileInfo.type = meta.type;
    this.fileInfo.iv = meta.iv;
    this.fileInfo.size = meta.size;
    this.state = 'ready';
  }

  async streamToArrayBuffer(stream, streamSize, onprogress) {
    const result = new Uint8Array(streamSize);
    let offset = 0;
    const reader = stream.getReader();
    let state = await reader.read();
    while (!state.done) {
      result.set(state.value, offset);
      offset += state.value.length;
      state = await reader.read();
      onprogress([offset, streamSize]);
    }

    onprogress([streamSize, streamSize]);
    return result.slice(0, offset).buffer;
  }

  sendMessageToSw(msg) {
    return new Promise((resolve, reject) => {
      const channel = new MessageChannel();

      channel.port1.onmessage = function(event) {
        if (event.data === undefined) {
          reject('bad response from serviceWorker');
        } else if (event.data.error !== undefined) {
          reject(event.data.error);
        } else {
          resolve(event.data);
        }
      };

      navigator.serviceWorker.controller.postMessage(msg, [channel.port2]);
    });
  }

  async download(noSave = false) {
    const onprogress = p => {
      this.progress = p;
      this.emit('progress');
    };

    this.downloadRequest = {
      cancel: () => {
        this.sendMessageToSw({ request: 'cancel', id: this.fileInfo.id });
      }
    };

    try {
      this.state = 'downloading';

      const info = {
        request: 'init',
        id: this.fileInfo.id,
        filename: this.fileInfo.name,
        key: this.fileInfo.secretKey,
        requiresPassword: this.fileInfo.requiresPassword,
        password: this.fileInfo.password,
        url: this.fileInfo.url,
        size: this.fileInfo.size,
        noSave
      };
      await this.sendMessageToSw(info);

      onprogress([0, this.fileInfo.size]);

      if (noSave) {
        const res = await fetch(`/api/download/${this.fileInfo.id}`);
        if (res.status !== 200) {
          throw new Error(res.status);
        }
      } else {
        const downloadUrl = `${location.protocol}//${
          location.host
        }/api/download/${this.fileInfo.id}`;
        const a = document.createElement('a');
        a.href = downloadUrl;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(downloadUrl);
      }

      let prog = 0;
      while (prog < this.fileInfo.size) {
        const msg = await this.sendMessageToSw({
          request: 'progress',
          id: this.fileInfo.id
        });
        prog = msg.progress;
        onprogress([prog, this.fileInfo.size]);
        await delay();
      }

      this.downloadRequest = null;
      this.msg = 'downloadFinish';
      this.state = 'complete';
    } catch (e) {
      this.downloadRequest = null;
      if (e === 'cancelled') {
        throw new Error(0);
      }
      throw e;
    }
  }
}
