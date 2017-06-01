function onChange(event) {

  var file = event.target.files[0];
  var reader = new FileReader();
  reader.readAsArrayBuffer(file);

  let random_iv = window.crypto.getRandomValues(new Uint8Array(16));
  var hex = ivToStr(random_iv);

  reader.onload = function(event) {
    let self = this;
    window.crypto.subtle.generateKey({
      name: "AES-CBC",
      length: 128
    },
    true,
    ["encrypt", "decrypt"])
    .then((key) => {
      let arrayBuffer = self.result;
      let array = new Uint8Array(arrayBuffer);

      window.crypto.subtle.encrypt({
        name: "AES-CBC",
        iv: random_iv },
        key,
        array)
      .then(uploadFile.bind(null, file, hex, key))
      .catch((err) => console.error(err));

    }).catch((err) => console.error(err));
  };
}

let uploadFile = (file, hex, key, encrypted) => {
  var dataView = new DataView(encrypted);
  var blob = new Blob([dataView], { type: file.type });

  var fd = new FormData();
  fd.append("fname", file.name);
  fd.append("data", blob, file.name);

  var xhr = new XMLHttpRequest();

  xhr.open("post", "/upload/" + hex, true);

  let prog = new window.ProgressEmitter(file.name, hex, file.type);

  var li = document.createElement("li");
  var name = document.createElement("p");
  name.innerHTML = file.name;
  li.appendChild(name);

  var link = document.createElement("a");
  li.appendChild(link);

  var progress = document.createElement("p");
  li.appendChild(progress);


  document.getElementById("uploaded_files").appendChild(li);


  xhr.upload.addEventListener("progress", returnBindedLI(progress, name, link, li));

  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      window.crypto.subtle.exportKey("jwk", key).then(function(keydata) {
        var curr_name = localStorage.getItem(file.name);

        localStorage.setItem(hex, xhr.responseText);

        prog.link = "http://localhost:3000/download/" + hex + "/#" + keydata.k;
        prog.emit();

        link.innerHTML = "http://localhost:3000/download/" + hex + "/#" + keydata.k;
        link.setAttribute("href", "http://localhost:3000/download/" + hex + "/#" + keydata.k);

        console.log("Share this link with a friend: http://localhost:3000/download/" + hex + "/#" + keydata.k);
      })
    }
  };

  xhr.send(fd);
  // setupLI(file.name);

}

function setupLI(emitter) {
  var li = document.createElement("li");
  var name = document.createElement("p");
  name.innerHTML = emitter;
  li.appendChild(name);

  var link = document.createElement("a");
  link.addEventListener('NotifyProgress', (progress_event) => {
    console.log(progress_event);
  });
  li.appendChild(link);

  var progress = document.createElement("p");
  li.appendChild(progress);
  document.getElementById("uploaded_files").appendChild(li);
}

function ivToStr(iv) {
  let hexStr = '';
  for (var i in iv) {
    if (iv[i] < 16) {
      hexStr += '0' + iv[i].toString(16);
    } else {
      hexStr += iv[i].toString(16);
    }
  }
  window.hexStr = hexStr;
  return hexStr;
}

function strToIv(str) {
  var iv = new Uint8Array(16);
  for (var i = 0; i < str.length; i += 2) {
    iv[i / 2] = parseInt(str.charAt(i) + str.charAt(i + 1), 16);
  }

  return iv;
}

function returnBindedLI(a_element, name, link, li) {
  return function updateProgress(e) {
    if (e.lengthComputable) {
      var percentComplete = Math.floor(e.loaded / e.total * 100);
      a_element.innerHTML = 'Progress: ' + percentComplete + '%';

      if (percentComplete === 100) {
        var btn = document.createElement('button');
        btn.innerHTML = 'Delete from server';
        btn.addEventListener('click', function() {
          var segments = link.innerHTML.split('/');
          var key = segments[segments.length - 2];

          var xhr = new XMLHttpRequest();
          xhr.open('post', '/delete/' + key, true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          if (!localStorage.getItem(key)) return;

          xhr.send(JSON.stringify({ delete_token: localStorage.getItem(key) }));

          xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              document.getElementById('uploaded_files').removeChild(li);
              localStorage.removeItem(key);
            }

            if (xhr.status === 200) {
              console.log('The file was successfully deleted.');
            } else {
              console.log('The file has expired, or has already been deleted.');
            }
          };
        });
        li.appendChild(btn);
      }
    }
  };
}
