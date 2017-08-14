import EventEmitter from 'events';
import { hexToArray } from './utils';

export default class FileReceiver extends EventEmitter {
  constructor(url, k) {
    super();
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
  }

  downloadFile() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onprogress = event => {
        if (event.lengthComputable && event.target.status !== 404) {
          this.emit('progress', [event.loaded, event.total]);
        }
      };

      xhr.onload = function(event) {
        if (xhr.status === 404) {
          reject(new Error('notfound'));
          return;
        }

        const blob = new Blob([this.response]);
        const type = xhr.getResponseHeader('Content-Type');
        const meta = JSON.parse(xhr.getResponseHeader('X-File-Metadata'));
        const fileReader = new FileReader();
        fileReader.onload = function() {
          resolve({
            data: this.result,
            name: meta.filename,
            type,
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
    return {
      plaintext,
      name: decodeURIComponent(file.name),
      type: file.type
    };
  }
}
