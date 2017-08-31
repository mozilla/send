import Nanobus from 'nanobus';
import { arrayToB64, b64ToArray, bytes } from './utils';

export default class FileReceiver extends Nanobus {
  constructor(url, file) {
    super('FileReceiver');
    this.secretKeyPromise = window.crypto.subtle.importKey(
      'raw',
      b64ToArray(file.key),
      'HKDF',
      false,
      ['deriveKey']
    );
    this.encryptKeyPromise = this.secretKeyPromise.then(sk => {
      const encoder = new TextEncoder();
      return window.crypto.subtle.deriveKey(
        {
          name: 'HKDF',
          salt: new Uint8Array(),
          info: encoder.encode('encryption'),
          hash: 'SHA-256'
        },
        sk,
        {
          name: 'AES-GCM',
          length: 128
        },
        false,
        ['decrypt']
      );
    });
    if (file.pwd) {
      const encoder = new TextEncoder();
      console.log(file.password + file.url);
      this.authKeyPromise = window.crypto.subtle
        .importKey(
          'raw',
          encoder.encode(file.password),
          { name: 'PBKDF2' },
          false,
          ['deriveKey']
        )
        .then(pwdKey =>
          window.crypto.subtle.deriveKey(
            {
              name: 'PBKDF2',
              salt: encoder.encode(file.url),
              iterations: 100,
              hash: 'SHA-256'
            },
            pwdKey,
            {
              name: 'HMAC',
              hash: 'SHA-256'
            },
            true,
            ['sign']
          )
        );
    } else {
      this.authKeyPromise = this.secretKeyPromise.then(sk => {
        const encoder = new TextEncoder();
        return window.crypto.subtle.deriveKey(
          {
            name: 'HKDF',
            salt: new Uint8Array(),
            info: encoder.encode('authentication'),
            hash: 'SHA-256'
          },
          sk,
          {
            name: 'HMAC',
            hash: { name: 'SHA-256' }
          },
          false,
          ['sign']
        );
      });
    }
    this.metaKeyPromise = this.secretKeyPromise.then(sk => {
      const encoder = new TextEncoder();
      return window.crypto.subtle.deriveKey(
        {
          name: 'HKDF',
          salt: new Uint8Array(),
          info: encoder.encode('metadata'),
          hash: 'SHA-256'
        },
        sk,
        {
          name: 'AES-GCM',
          length: 128
        },
        false,
        ['decrypt']
      );
    });
    this.file = file;
    this.url = url;
    this.msg = 'fileSizeProgress';
    this.state = 'initialized';
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

  fetchMetadata(sig) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          const nonce = xhr.getResponseHeader('WWW-Authenticate').split(' ')[1];
          this.file.nonce = nonce;
          if (xhr.status === 200) {
            return resolve(xhr.response);
          }
          reject(new Error(xhr.status));
        }
      };
      xhr.onerror = () => reject(new Error(0));
      xhr.ontimeout = () => reject(new Error(0));
      xhr.open('get', `/api/metadata/${this.file.id}`);
      xhr.setRequestHeader('Authorization', `send-v1 ${arrayToB64(sig)}`);
      xhr.responseType = 'json';
      xhr.timeout = 2000;
      xhr.send();
    });
  }

  async getMetadata(nonce) {
    try {
      const authKey = await this.authKeyPromise;
      const sig = await window.crypto.subtle.sign(
        {
          name: 'HMAC'
        },
        authKey,
        b64ToArray(nonce)
      );
      const data = await this.fetchMetadata(new Uint8Array(sig));
      const metaKey = await this.metaKeyPromise;
      const json = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: new Uint8Array(12),
          tagLength: 128
        },
        metaKey,
        b64ToArray(data.metadata)
      );
      const decoder = new TextDecoder();
      const meta = JSON.parse(decoder.decode(json));
      this.file.name = meta.name;
      this.file.type = meta.type;
      this.file.iv = meta.iv;
      this.file.size = data.size;
      this.file.ttl = data.ttl;
      this.state = 'ready';
    } catch (e) {
      this.state = 'invalid';
      throw e;
    }
  }

  downloadFile(sig) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onprogress = event => {
        if (event.lengthComputable && event.target.status !== 404) {
          this.progress = [event.loaded, event.total];
          this.emit('progress', this.progress);
        }
      };

      xhr.onload = event => {
        if (xhr.status === 404) {
          reject(new Error('notfound'));
          return;
        }

        if (xhr.status !== 200) {
          return reject(new Error(xhr.status));
        }

        const blob = new Blob([xhr.response]);
        const fileReader = new FileReader();
        fileReader.onload = function() {
          resolve(this.result);
        };

        fileReader.readAsArrayBuffer(blob);
      };

      xhr.open('get', this.url);
      xhr.setRequestHeader('Authorization', `send-v1 ${arrayToB64(sig)}`);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }

  async download(nonce) {
    this.state = 'downloading';
    this.emit('progress', this.progress);
    try {
      const encryptKey = await this.encryptKeyPromise;
      const authKey = await this.authKeyPromise;
      const sig = await window.crypto.subtle.sign(
        {
          name: 'HMAC'
        },
        authKey,
        b64ToArray(nonce)
      );
      const ciphertext = await this.downloadFile(new Uint8Array(sig));
      this.msg = 'decryptingFile';
      this.emit('decrypting');
      const plaintext = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: b64ToArray(this.file.iv),
          tagLength: 128
        },
        encryptKey,
        ciphertext
      );
      this.msg = 'downloadFinish';
      this.state = 'complete';
      return {
        plaintext,
        name: decodeURIComponent(this.file.name),
        type: this.file.type
      };
    } catch (e) {
      this.state = 'invalid';
      throw e;
    }
  }
}
