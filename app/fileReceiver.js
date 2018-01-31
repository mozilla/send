import Nanobus from 'nanobus';
import Keychain from './keychain';
import { bytes } from './utils';
import { metadata, downloadFile } from './api';

export default class FileReceiver extends Nanobus {
  constructor(fileInfo) {
    super('FileReceiver');
    this.keychain = new Keychain(fileInfo.secretKey, fileInfo.nonce);
    if (fileInfo.requiresPassword) {
      this.keychain.setPassword(fileInfo.password, fileInfo.url);
    }
    this.fileInfo = fileInfo;
    this.fileDownload = null;
    this.msg = 'fileSizeProgress';
    this.state = 'initialized';
    this.progress = [0, 1];
    this.cancelled = false;
  }

  get progressRatio() {
    return this.progress[0] / this.progress[1];
  }

  get sizes() {
    return {
      partialSize: bytes(this.progress[0]),
      totalSize: bytes(this.progress[1])
    };
  }

  cancel() {
    this.cancelled = true;
    if (this.fileDownload) {
      this.fileDownload.cancel();
    }
  }

  async getMetadata() {
    const meta = await metadata(this.fileInfo.id, this.keychain);
    if (meta) {
      this.keychain.setIV(meta.iv);
      this.fileInfo.name = meta.name;
      this.fileInfo.type = meta.type;
      this.fileInfo.iv = meta.iv;
      this.fileInfo.size = meta.size;
      this.state = 'ready';
      return;
    }
    this.state = 'invalid';
    return;
  }

  async download() {
    this.state = 'downloading';
    this.emit('progress', this.progress);
    try {
      const download = await downloadFile(this.fileInfo.id, this.keychain);
      download.onprogress = p => {
        this.progress = p;
        this.emit('progress', p);
      };
      this.fileDownload = download;
      const ciphertext = await download.result;
      this.fileDownload = null;
      this.msg = 'decryptingFile';
      this.emit('decrypting');
      const plaintext = await this.keychain.decryptFile(ciphertext);
      if (this.cancelled) {
        throw new Error(0);
      }
      this.msg = 'downloadFinish';
      this.state = 'complete';
      return {
        plaintext,
        name: decodeURIComponent(this.fileInfo.name),
        type: this.fileInfo.type
      };
    } catch (e) {
      this.state = 'invalid';
      throw e;
    }
  }
}
