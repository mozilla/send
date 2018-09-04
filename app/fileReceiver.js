import Nanobus from 'nanobus';
import Keychain from './keychain';
import { delay, bytes, streamToArrayBuffer } from './utils';
import { downloadFile, metadata } from './api';
import { blobStream } from './streams';
import Zip from './zip';

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
    this.fileInfo.name = meta.name;
    this.fileInfo.type = meta.type;
    this.fileInfo.iv = meta.iv;
    this.fileInfo.size = meta.size;
    this.fileInfo.manifest = meta.manifest;
    this.state = 'ready';
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

  async downloadBlob(noSave = false) {
    this.state = 'downloading';
    this.downloadRequest = await downloadFile(
      this.fileInfo.id,
      this.keychain,
      p => {
        this.progress = p;
        this.emit('progress');
      }
    );
    try {
      const ciphertext = await this.downloadRequest.result;
      this.downloadRequest = null;
      this.msg = 'decryptingFile';
      this.state = 'decrypting';
      this.emit('decrypting');
      let size = this.fileInfo.size;
      let plainStream = this.keychain.decryptStream(blobStream(ciphertext));
      if (this.fileInfo.type === 'send-archive') {
        const zip = new Zip(this.fileInfo.manifest, plainStream);
        plainStream = zip.stream;
        size = zip.size;
      }
      const plaintext = await streamToArrayBuffer(plainStream, size);
      if (!noSave) {
        await saveFile({
          plaintext,
          name: decodeURIComponent(this.fileInfo.name),
          type: this.fileInfo.type
        });
      }
      this.msg = 'downloadFinish';
      this.state = 'complete';
    } catch (e) {
      this.downloadRequest = null;
      throw e;
    }
  }

  async downloadStream(noSave = false) {
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
        type: this.fileInfo.type,
        manifest: this.fileInfo.manifest,
        key: this.fileInfo.secretKey,
        requiresPassword: this.fileInfo.requiresPassword,
        password: this.fileInfo.password,
        url: this.fileInfo.url,
        size: this.fileInfo.size,
        nonce: this.keychain.nonce,
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
      }

      let prog = 0;
      while (prog < this.fileInfo.size) {
        const msg = await this.sendMessageToSw({
          request: 'progress',
          id: this.fileInfo.id
        });
        prog = msg.progress;
        onprogress([prog, this.fileInfo.size]);
        await delay(1000);
      }

      this.downloadRequest = null;
      this.msg = 'downloadFinish';
      this.emit('complete');
      this.state = 'complete';
    } catch (e) {
      this.downloadRequest = null;
      if (e === 'cancelled' || e.message === '400') {
        throw new Error(0);
      }
      throw e;
    }
  }

  download(options) {
    if (options.stream) {
      return this.downloadStream(options.noSave);
    }
    return this.downloadBlob(options.noSave);
  }
}

async function saveFile(file) {
  return new Promise(function(resolve, reject) {
    const dataView = new DataView(file.plaintext);
    const blob = new Blob([dataView], { type: file.type });

    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, file.name);
      return resolve();
    } else if (/iPhone|fxios/i.test(navigator.userAgent)) {
      // This method is much slower but createObjectURL
      // is buggy on iOS
      const reader = new FileReader();
      reader.addEventListener('loadend', function() {
        if (reader.error) {
          return reject(reader.error);
        }
        if (reader.result) {
          const a = document.createElement('a');
          a.href = reader.result;
          a.download = file.name;
          document.body.appendChild(a);
          a.click();
        }
        resolve();
      });
      reader.readAsDataURL(blob);
    } else {
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(downloadUrl);
      setTimeout(resolve, 100);
    }
  });
}
