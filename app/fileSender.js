import Nanobus from 'nanobus';
import { arrayToHex, bytes } from './utils';

export default class FileSender extends Nanobus {
  constructor(file) {
    super('FileSender');
    this.file = file;
    this.msg = 'importingFile';
    this.progress = [0, 1];
    this.cancelled = false;
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

  static delete(id, token) {
    return new Promise((resolve, reject) => {
      if (!id || !token) {
        return reject();
      }
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `/api/delete/${id}`);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          resolve();
        }
      };

      xhr.send(JSON.stringify({ delete_token: token }));
    });
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
    if (this.msg === 'fileSizeProgress') {
      this.uploadXHR.abort();
    }
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
      const id = arrayToHex(this.iv);
      const dataView = new DataView(encrypted);
      const blob = new Blob([dataView], { type: file.type });
      const fd = new FormData();
      fd.append('data', blob, file.name);

      const xhr = this.uploadXHR;

      xhr.upload.addEventListener('progress', e => {
        if (e.lengthComputable) {
          this.progress = [e.loaded, e.total];
          this.emit('progress', this.progress);
        }
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            this.progress = [1, 1];
            this.msg = 'notifyUploadDone';
            const responseObj = JSON.parse(xhr.responseText);
            return resolve({
              url: responseObj.url,
              id: responseObj.id,
              secretKey: keydata.k,
              deleteToken: responseObj.delete
            });
          }
          this.msg = 'errorPageHeader';
          reject(new Error(xhr.status));
        }
      };

      xhr.open('post', '/api/upload', true);
      xhr.setRequestHeader(
        'X-File-Metadata',
        JSON.stringify({
          id: id,
          filename: encodeURIComponent(file.name)
        })
      );
      xhr.send(fd);
      this.msg = 'fileSizeProgress';
    });
  }

  async upload() {
    const key = await this.key;
    const plaintext = await this.readFile();
    if (this.cancelled) {
      throw new Error(0);
    }
    this.msg = 'encryptingFile';
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
    if (this.cancelled) {
      throw new Error(0);
    }
    const keydata = await window.crypto.subtle.exportKey('jwk', key);
    return this.uploadFile(encrypted, keydata);
  }
}
