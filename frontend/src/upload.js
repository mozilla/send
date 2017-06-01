const EventEmitter = require('events');
const UIWrapper = require('./ui').UIWrapper;

let onChange = event => {
  let file = event.target.files[0];
  let reader = new FileReader();
  reader.readAsArrayBuffer(file);

  let random_iv = window.crypto.getRandomValues(new Uint8Array(16));
  let hex = ivToStr(random_iv);

  reader.onload = function(event) {
    let self = this;
    window.crypto.subtle
      .generateKey(
        {
          name: 'AES-CBC',
          length: 128
        },
        true,
        ['encrypt', 'decrypt']
      )
      .then(key => {
        let arrayBuffer = self.result;
        let array = new Uint8Array(arrayBuffer);

        window.crypto.subtle
          .encrypt(
            {
              name: 'AES-CBC',
              iv: random_iv
            },
            key,
            array
          )
          .then(uploadFile.bind(null, file, hex, key))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  };
};

window.onChange = onChange;

let uploadFile = (file, hex, key, encrypted) => {
  let dataView = new DataView(encrypted);
  let blob = new Blob([dataView], { type: file.type });

  let fd = new FormData();
  fd.append('fname', file.name);
  fd.append('data', blob, file.name);

  let xhr = new XMLHttpRequest();
  xhr.open('post', '/upload/' + hex, true);

  let listelem = setupUI();
  listelem.emit('name', file.name);
  xhr.upload.addEventListener('progress', updateProgress.bind(null, listelem));

  xhr.onreadystatechange = () => {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      window.crypto.subtle.exportKey('jwk', key).then(keydata => {
        localStorage.setItem(hex, xhr.responseText);

        listelem.emit(
          'link',
          'http://localhost:3000/download/' + hex + '/#' + keydata.k
        );

        console.log(
          'Share this link with a friend: http://localhost:3000/download/' +
            hex +
            '/#' +
            keydata.k
        );
      });
    }
  };

  xhr.send(fd);
};

let updateProgress = (UIelem, e) => {
  if (e.lengthComputable) {
    let percentComplete = Math.floor(e.loaded / e.total * 100);
    UIelem.emit('progress', 'Progress: ' + percentComplete + '%');

    if (percentComplete === 100) {
      let btn = document.createElement('button');
      btn.innerText = 'Delete from server';
      btn.addEventListener('click', () => {
        let segments = UIelem.link.innerText.split('/');
        let key = segments[segments.length - 2];

        let xhr = new XMLHttpRequest();
        xhr.open('post', '/delete/' + key, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        if (!localStorage.getItem(key)) return;

        xhr.send(JSON.stringify({ delete_token: localStorage.getItem(key) }));

        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            document.getElementById('uploaded_files').removeChild(UIelem.li);
            localStorage.removeItem(key);
          }

          if (xhr.status === 200) {
            console.log('The file was successfully deleted.');
          } else {
            console.log('The file has expired, or has already been deleted.');
          }
        };
      });
      UIelem.li.appendChild(btn);
    }
  }
};

let setupUI = () => {
  let li = document.createElement('li');
  let name = document.createElement('p');
  li.appendChild(name);

  let link = document.createElement('a');
  li.appendChild(link);

  let progress = document.createElement('p');
  li.appendChild(progress);

  document.getElementById('uploaded_files').appendChild(li);

  return new UIWrapper(li, name, link, progress);
};

let ivToStr = iv => {
  let hexStr = '';
  for (let i in iv) {
    if (iv[i] < 16) {
      hexStr += '0' + iv[i].toString(16);
    } else {
      hexStr += iv[i].toString(16);
    }
  }
  window.hexStr = hexStr;
  return hexStr;
};

let strToIv = str => {
  let iv = new Uint8Array(16);
  for (let i = 0; i < str.length; i += 2) {
    iv[i / 2] = parseInt(str.charAt(i) + str.charAt(i + 1), 16);
  }

  return iv;
};
