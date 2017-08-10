import EventEmitter from 'events';
import { hexToArray } from './utils';

export default class FileReceiver extends EventEmitter {
  constructor() {
    super();
  }

  download() {
    return window.crypto.subtle
      .importKey(
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
      .then(key => {
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
              resolve([
                {
                  data: this.result,
                  filename: meta.filename,
                  type,
                  iv: meta.id
                },
                key
              ]);
            };

            fileReader.readAsArrayBuffer(blob);
          };

          xhr.open('get', '/assets' + location.pathname.slice(0, -1), true);
          xhr.responseType = 'blob';
          xhr.send();
        });
      })
      .then(([fdata, key]) => {
        this.emit('decrypting');
        return Promise.all([
          window.crypto.subtle
            .decrypt(
              {
                name: 'AES-GCM',
                iv: hexToArray(fdata.iv),
                tagLength: 128
              },
              key,
              fdata.data
            )
            .then(decrypted => {
              return Promise.resolve(decrypted);
            }),
          {
            name: decodeURIComponent(fdata.filename),
            type: fdata.type
          }
        ]);
      });
  }
}
