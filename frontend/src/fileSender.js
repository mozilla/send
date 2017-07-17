const EventEmitter = require('events');
const { arrayToHex } = require('./utils');

const Raven = window.Raven;

class FileSender extends EventEmitter {
  constructor(file) {
    super();
    this.file = file;
    this.iv = window.crypto.getRandomValues(new Uint8Array(12));
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

        if (xhr.status === 200) {
          console.log('The file was successfully deleted.');
        } else {
          console.log('The file has expired, or has already been deleted.');
        }
      };

      xhr.send(JSON.stringify({ delete_token: token }));
    });
  }

  upload() {
    const self = this;
    self.emit('loading', true);
    return Promise.all([
      window.crypto.subtle
        .generateKey(
          {
            name: 'AES-GCM',
            length: 128
          },
          true,
          ['encrypt', 'decrypt']
        )
        .catch(err =>
          console.log('There was an error generating a crypto key')
        ),
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(this.file);
        reader.onload = function(event) {
          self.emit('loading', false);
          self.emit('hashing', true);
          const plaintext = new Uint8Array(this.result);
          window.crypto.subtle.digest('SHA-256', plaintext).then(hash => {
            self.emit('hashing', false);
            self.emit('encrypting', true);
            resolve({ plaintext: plaintext, hash: new Uint8Array(hash) });
          });
        };
        reader.onerror = function(err) {
          reject(err);
        };
      })
    ])
      .then(([secretKey, file]) => {
        return Promise.all([
          window.crypto.subtle
            .encrypt(
              {
                name: 'AES-GCM',
                iv: this.iv,
                additionalData: file.hash,
                tagLength: 128
              },
              secretKey,
              file.plaintext
            )
            .then(encrypted => {
              self.emit('encrypting', false);
              return new Promise((resolve, reject) => {
                resolve(encrypted);
              });
            }),
          window.crypto.subtle.exportKey('jwk', secretKey),
          new Promise((resolve, reject) => {
            resolve(file.hash);
          })
        ]);
      })
      .then(([encrypted, keydata, hash]) => {
        return new Promise((resolve, reject) => {
          const file = this.file;
          const fileId = arrayToHex(this.iv);
          const dataView = new DataView(encrypted);
          const blob = new Blob([dataView], { type: file.type });
          const fd = new FormData();
          fd.append('data', blob, file.name);

          const xhr = new XMLHttpRequest();

          xhr.upload.addEventListener('progress', e => {
            if (e.lengthComputable) {
              self.emit('progress', [e.loaded, e.total]);
            }
          });

          xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              // uuid field and url field
              const responseObj = JSON.parse(xhr.responseText);
              resolve({
                url: responseObj.url,
                fileId: responseObj.id,
                secretKey: keydata.k,
                deleteToken: responseObj.delete
              });
            }
          };

          xhr.open('post', '/upload', true);
          xhr.setRequestHeader(
            'X-File-Metadata',
            JSON.stringify({
              aad: arrayToHex(hash),
              id: fileId,
              filename: encodeURIComponent(file.name)
            })
          );
          xhr.send(fd);
        });
      })
      .catch(err => {
        Raven.captureException(err);
        return Promise.reject(err);
      });
  }
}

module.exports = FileSender;
