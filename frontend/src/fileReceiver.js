const EventEmitter = require('events');
const { strToIv } = require('./utils');
const { IntegrityError } = require('./errors');

const Raven = window.Raven;

class FileReceiver extends EventEmitter {
  constructor() {
    super();
    this.salt = strToIv(location.pathname.slice(10, -1));
  }

  download() {
    return Promise.all([
      new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onprogress = event => {
          if (event.lengthComputable) {
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
            resolve({
              data: this.result,
              fname: xhr
                .getResponseHeader('Content-Disposition')
                .match(/=(.+)/)[1],
              checksum: xhr.getResponseHeader('Checksum')
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
          alg: 'A128CBC',
          ext: true
        },
        {
          name: 'AES-CBC'
        },
        true,
        ['encrypt', 'decrypt']
      )
    ])
    .then(([fdata, key]) => {
      const salt = this.salt;
      return window.crypto.subtle.decrypt(
        {
          name: 'AES-CBC',
          iv: salt
        },
        key,
        fdata.data
      ).then((decrypted) => {
        return window.crypto.subtle.digest({name: 'SHA-256'}, decrypted).then(checksum => {
          const hasIntegrity = new Uint8Array(checksum).toString() === fdata.checksum;
          return new Promise((resolve, reject) => {
            if (hasIntegrity) {
              resolve([decrypted, fdata.fname]);
            } else {
              reject(new IntegrityError('Checksums do not match.'));
            }
          })
        })
      });
    })
    .catch(err => {
      Raven.captureException(err);
      return Promise.reject(err);
    });
  }
}

module.exports = FileReceiver;
