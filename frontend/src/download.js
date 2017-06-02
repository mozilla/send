const FileReceiver = require('./fileReceiver');

let download = () => {

  const fileReceiver = new FileReceiver();

  let li = document.createElement('li');
  let name = document.createElement('p');
  li.appendChild(name);
  let progress = document.createElement('p');
  li.appendChild(progress);

  document.getElementById('downloaded_files').appendChild(li);

  fileReceiver.on('progress', percentComplete => {
    progress.innerText = `Progress: ${percentComplete}%`;

    if (percentComplete === 100) {
      let finished = document.createElement('p');
      finished.innerText = 'Your download has finished.';
      li.appendChild(finished);

      let close = document.createElement('button');
      close.innerText = 'Ok';
      close.addEventListener('click', () => {
        document.getElementById('downloaded_files').removeChild(li);
      });
      li.appendChild(close);
    }
  });

  fileReceiver.download().then(([decrypted, fname]) => {
    name.innerText = fname;
    let dataView = new DataView(decrypted);
    let blob = new Blob([dataView]);
    let downloadUrl = URL.createObjectURL(blob);

    let a = document.createElement('a');
    a.href = downloadUrl;
    a.download = fname;
    document.body.appendChild(a);
    a.click();
  })
}
// const FileReceiver = require('./fileReceiver');

// let download = () => {
//   let xhr = new XMLHttpRequest();
//   xhr.open('get', '/assets' + location.pathname.slice(0, -1), true);
//   xhr.responseType = 'blob';

//   let listelem = setupUI();
//   xhr.addEventListener('progress', updateProgress.bind(null, listelem));

//   xhr.onload = function(e) {
//     // maybe send a separate request before this one to get the filename?

//     // maybe render the html itself with the filename, since it's generated server side
//     // after a get request with the unique id
//     listelem.emit(
//       'name',
//       xhr.getResponseHeader('Content-Disposition').match(/filename="(.+)"/)[1]
//     );

//     if (this.status == 200) {
//       let self = this;
//       let blob = new Blob([this.response]);
//       let arrayBuffer;
//       let fileReader = new FileReader();
//       fileReader.onload = function() {
//         arrayBuffer = this.result;
//         let array = new Uint8Array(arrayBuffer);
//         salt = strToIv(location.pathname.slice(10, -1));

//         window.crypto.subtle
//           .importKey(
//             'jwk',
//             {
//               kty: 'oct',
//               k: location.hash.slice(1),
//               alg: 'A128CBC',
//               ext: true
//             },
//             {
//               name: 'AES-CBC'
//             },
//             true,
//             ['encrypt', 'decrypt']
//           )
//           .then(key => {
//             return window.crypto.subtle.decrypt(
//               {
//                 name: 'AES-CBC',
//                 iv: salt
//               },
//               key,
//               array
//             );
//           })
//           .then(decrypted => {
//             let dataView = new DataView(decrypted);
//             let blob = new Blob([dataView]);
//             let downloadUrl = URL.createObjectURL(blob);
//             let a = document.createElement('a');
//             a.href = downloadUrl;
//             a.download = xhr
//               .getResponseHeader('Content-Disposition')
//               .match(/filename="(.+)"/)[1];
//             document.body.appendChild(a);
//             a.click();
//           })
//           .catch(err => {
//             alert(
//               'This link is either invalid or has expired, or the uploader has deleted the file.'
//             );
//             console.error(err);
//           });
//       };

//       fileReader.readAsArrayBuffer(blob);
//     } else {
//       alert(
//         'This link is either invalid or has expired, or the uploader has deleted the file.'
//       );
//     }
//   };
//   xhr.send();
// };

window.download = download;

// let setupUI = () => {
//   let li = document.createElement('li');
//   let name = document.createElement('p');
//   li.appendChild(name);

//   let progress = document.createElement('p');
//   li.appendChild(progress);

//   document.getElementById('downloaded_files').appendChild(li);

//   return new UIWrapper(li, name, null, progress);
// };

// let ivToStr = iv => {
//   let hexStr = '';
//   for (let i in iv) {
//     if (iv[i] < 16) {
//       hexStr += '0' + iv[i].toString(16);
//     } else {
//       hexStr += iv[i].toString(16);
//     }
//   }
//   window.hexStr = hexStr;
//   return hexStr;
// };

// let strToIv = str => {
//   let iv = new Uint8Array(16);
//   for (let i = 0; i < str.length; i += 2) {
//     iv[i / 2] = parseInt(str.charAt(i) + str.charAt(i + 1), 16);
//   }

//   return iv;
// };

// let updateProgress = (UIelem, e) => {
//   if (e.lengthComputable) {
//     let percentComplete = Math.floor(e.loaded / e.total * 100);
//     UIelem.emit('progress', 'Progress: ' + percentComplete + '%');

//     if (percentComplete === 100) {
//       let finished = document.createElement('p');
//       finished.innerText = 'Your download has finished.';
//       UIelem.li.appendChild(finished);

//       let close = document.createElement('button');
//       close.innerText = 'Ok';
//       close.addEventListener('click', () => {
//         document.getElementById('downloaded_files').removeChild(UIelem.li);
//       });

//       UIelem.li.appendChild(close);
//     }
//   }
// };
