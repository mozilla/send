const EventEmitter = require('events');
const { hexToArray } = require('./utils');

class FileReceiver extends EventEmitter {
  constructor() {
    super();
  }

  download() {
    return Promise.all([
      new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onprogress = event => {
          if (event.lengthComputable && event.target.status !== 404) {
            const percentComplete = Math.floor(
              event.loaded / event.total * 100
            );
            this.emit('progress', percentComplete);
          }
        };

        xhr.onload = function(event) {
          if (xhr.status === 404) {
            reject(
              new Error('The file has expired, or has already been deleted.')
            );
            return;
          }

          const blob = new Blob([this.response]);
          const fileReader = new FileReader();
          fileReader.onload = function() {
            const meta = JSON.parse(xhr.getResponseHeader('X-File-Metadata'));
            resolve({
              data: this.result,
              aad: meta.aad,
              filename: meta.filename,
              iv: meta.id
            });
          };

          fileReader.readAsArrayBuffer(blob);
        };

        xhr.open('get', '/assets' + location.pathname.slice(0, -1), true);
        xhr.responseType = 'blob';
        xhr.send();
      }),
      window.crypto.subtle.importKey(
        'jwk',
        {
          kty: 'oct',
          k: location.hash.slice(1),
          alg: 'A128GCM',
          ext: true
        },
        {
          name: 'AES-GCM'
        },
        true,
        ['encrypt', 'decrypt']
      )
    ]).then(([fdata, key]) => {
      this.emit('decrypting', true);
      return Promise.all([
        window.crypto.subtle.decrypt(
          {
            name: 'AES-GCM',
            iv: hexToArray(fdata.iv),
            additionalData: hexToArray(fdata.aad)
          },
          key,
          fdata.data
        ).then(decrypted => {
          this.emit('decrypting', false);
          return Promise.resolve(decrypted)
        }),
        fdata.filename,
        hexToArray(fdata.aad)
      ]);
    }).then(([decrypted, fname, proposedHash]) => {
      this.emit('hashing', true);
      return window.crypto.subtle.digest('SHA-256', decrypted).then(calculatedHash => {
        this.emit('hashing', false);
        const integrity = new Uint8Array(calculatedHash).toString() === proposedHash.toString();
        if (!integrity) {
          this.emit('unsafe', true)
          return Promise.reject();
        } else {
          this.emit('safe', true);
          return Promise.all([
            decrypted,
            fname
          ]);
        }
      })
    })
  }
}

module.exports = FileReceiver;
