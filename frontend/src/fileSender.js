import EventEmitter from 'events';
import { arrayToHex } from './utils';

export default class FileSender extends EventEmitter {
  constructor(file) {
    super();
    this.file = file;
    this.iv = window.crypto.getRandomValues(new Uint8Array(12));
    this.uploadXHR = new XMLHttpRequest();
    this.key = window.crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 128
      },
      true,
      ['encrypt']
    );
  }

  static delete(fileId, token) {
    return new Promise((resolve, reject) => {
      if (!fileId || !token) {
        return reject();
      }
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/delete/' + fileId, true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          resolve();
        }
      };

      xhr.send(JSON.stringify({ delete_token: token }));
    });
  }

  cancel() {
    this.uploadXHR.abort();
  }

  readFile() {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(this.file);
      reader.onload = function(event) {
        const plaintext = new Uint8Array(this.result);
        resolve(plaintext);
      };
      reader.onerror = function(err) {
        reject(err);
      };
    });
  }

  uploadFile(encrypted, keydata) {
    return new Promise((resolve, reject) => {
      const file = this.file;
      const fileId = arrayToHex(this.iv);
      const dataView = new DataView(encrypted);
      const blob = new Blob([dataView], { type: file.type });
      const fd = new FormData();
      fd.append('data', blob, file.name);

      const xhr = this.uploadXHR;

      xhr.upload.addEventListener('progress', e => {
        if (e.lengthComputable) {
          this.emit('progress', [e.loaded, e.total]);
        }
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            const responseObj = JSON.parse(xhr.responseText);
            return resolve({
              url: responseObj.url,
              fileId: responseObj.id,
              secretKey: keydata.k,
              deleteToken: responseObj.delete
            });
          }
          reject(xhr.status);
        }
      };

      xhr.open('post', '/upload', true);
      xhr.setRequestHeader(
        'X-File-Metadata',
        JSON.stringify({
          id: fileId,
          filename: encodeURIComponent(file.name)
        })
      );
      xhr.send(fd);
    });
  }

  async upload() {
    this.emit('loading');
    const key = await this.key;
    const plaintext = await this.readFile();
    this.emit('encrypting');
    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: this.iv,
        tagLength: 128
      },
      key,
      plaintext
    );
    const keydata = await window.crypto.subtle.exportKey('jwk', key);
    return this.uploadFile(encrypted, keydata);
  }
}
