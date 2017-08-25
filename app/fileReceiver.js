import Nanobus from 'nanobus';
import { hexToArray, bytes } from './utils';

export default class FileReceiver extends Nanobus {
  constructor(url, k) {
    super('FileReceiver');
    this.key = window.crypto.subtle.importKey(
      'jwk',
      {
        k,
        kty: 'oct',
        alg: 'A128GCM',
        ext: true
      },
      {
        name: 'AES-GCM'
      },
      false,
      ['decrypt']
    );
    this.url = url;
    this.msg = 'fileSizeProgress';
    this.progress = [0, 1];
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
    // TODO
  }

  downloadFile() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onprogress = event => {
        if (event.lengthComputable && event.target.status !== 404) {
          this.progress = [event.loaded, event.total];
          this.emit('progress', this.progress);
        }
      };

      xhr.onload = function(event) {
        if (xhr.status === 404) {
          reject(new Error('notfound'));
          return;
        }

        const blob = new Blob([this.response]);
        const meta = JSON.parse(xhr.getResponseHeader('X-File-Metadata'));
        const fileReader = new FileReader();
        fileReader.onload = function() {
          resolve({
            data: this.result,
            name: meta.filename,
            type: meta.mimeType,
            iv: meta.id
          });
        };

        fileReader.readAsArrayBuffer(blob);
      };

      xhr.open('get', this.url);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }

  async download() {
    const key = await this.key;
    const file = await this.downloadFile();
    this.msg = 'decryptingFile';
    this.emit('decrypting');
    const plaintext = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: hexToArray(file.iv),
        tagLength: 128
      },
      key,
      file.data
    );
    this.msg = 'downloadFinish';
    return {
      plaintext,
      name: decodeURIComponent(file.name),
      type: file.type
    };
  }
}
