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
    this.cancelled = true;
    if (this.fileDownload) {
      this.fileDownload.cancel();
    }
  }

  reset() {
    this.fileDownload = null;
    this.msg = 'fileSizeProgress';
    this.state = 'initialized';
    this.progress = [0, 1];
    this.cancelled = false;
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

  async download(noSave = false) {
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
      this.state = 'decrypting';
      this.emit('decrypting');
      const plaintext = await this.keychain.decryptFile(ciphertext);
      if (this.cancelled) {
        throw new Error(0);
      }
      if (!noSave) {
        await saveFile({
          plaintext,
          name: decodeURIComponent(this.fileInfo.name),
          type: this.fileInfo.type
        });
      }
      this.msg = 'downloadFinish';
      this.state = 'complete';
      return;
    } catch (e) {
      this.state = 'invalid';
      throw e;
    }
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
