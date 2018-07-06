import Nanobus from 'nanobus';
import Keychain from './keychain';
import { bytes } from './utils';
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

  async download(noSave = false) {
    const onprogress = p => {
      this.progress = p;
      this.emit('progress');
    };

    try {
      this.state = 'downloading';

      const auth = await this.keychain.authHeader();
      const info = {
        key: this.fileInfo.secretKey,
        nonce: this.fileInfo.nonce,
        filename: this.fileInfo.name,
        auth: auth
      };
      navigator.serviceWorker.controller.postMessage(info);

      onprogress([0, this.fileInfo.size]);

      if (!noSave) {
        const downloadUrl = `${location.protocol}//${
          location.host
        }/api/download/${this.fileInfo.id}`;
        const a = document.createElement('a');
        a.href = downloadUrl;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(downloadUrl);
      }

      //this.msg = 'downloadFinish';
      //this.state = 'complete';
    } catch (e) {
      this.downloadRequest = null;
      throw e;
    }
  }
}
