const EventEmitter = require('events');
const { strToIv } = require('./utils');

class FileReceiver extends EventEmitter {
  constructor() {
    super();
    this.salt = strToIv(location.pathname.slice(10, -1));
  }

  download() {
    return Promise.all([
      new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.onprogress = e => {
          if (e.lengthComputable) {
            let percentComplete = Math.floor(e.loaded / e.total * 100);
            this.emit('progress', percentComplete);
          }
        };

        xhr.onload = function(e) {
          if (xhr.status === 404) {
            reject(
              new Error('The file has expired, or has already been deleted.')
            );
            return;
          }

          let blob = new Blob([this.response]);
          let fileReader = new FileReader();
          fileReader.onload = function() {
            resolve({
              data: this.result,
              fname: xhr
                .getResponseHeader('Content-Disposition')
                .match(/=(.+)/)[1]
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
    ]).then(([fdata, key]) => {
      let salt = this.salt;
      return Promise.all([
        window.crypto.subtle.decrypt(
          {
            name: 'AES-CBC',
            iv: salt
          },
          key,
          fdata.data
        ),
        new Promise((resolve, reject) => {
          resolve(fdata.fname);
        })
      ]);
    });
  }
}

module.exports = FileReceiver;
