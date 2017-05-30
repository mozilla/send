function download() {

  var xhr = new XMLHttpRequest();
  xhr.open('get', '/assets' + location.pathname.slice(0, -1), true);
  xhr.responseType = 'blob';

  xhr.onload = function(e) {
      if (this.status == 200) {
          let self = this;
          var blob = new Blob([this.response]);
          var arrayBuffer;
          var fileReader = new FileReader();
          fileReader.onload = function() {
              arrayBuffer = this.result;
              var array = new Uint8Array(arrayBuffer);
              salt = strToIv(location.pathname.slice(10, -1));

              window.crypto.subtle.importKey(
                  "jwk",
                  {
                      kty: "oct",
                      k: location.hash.slice(1),
                      alg: "A128CBC",
                      ext: true,
                  },
                  {
                      name: "AES-CBC",
                  },
                  true,
                  ["encrypt", "decrypt"]
              )
              .then(function(key){  
                  window.crypto.subtle.decrypt(
                      {
                          name: "AES-CBC",
                          iv: salt,
                      },
                      key,
                      array
                  )
                  .then(function(decrypted){
                      var dataView = new DataView(decrypted);
                      var blob = new Blob([dataView]);
                      var downloadUrl = URL.createObjectURL(blob);
                      var a = document.createElement("a");
                      a.href = downloadUrl;
                      a.download = xhr.getResponseHeader('Content-Disposition').match(/filename="(.+)"/)[1];;
                      document.body.appendChild(a);
                      a.click();
                  })
                  .catch(function(err){
                      console.error(err);
                  });
              })
              .catch(function(err){
                  console.error(err);
              });
          };
          fileReader.readAsArrayBuffer(blob);
      } else {
          alert('Unable to download excel.')
      }
  };
  xhr.send();
}

function onChange(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
    let self = this;
    window.crypto.subtle.generateKey({
      name: "AES-CBC",
      length: 128 
    },
    true,
    ["encrypt", "decrypt"])
    .then(function(key){
      var arrayBuffer = self.result;
      var array = new Uint8Array(arrayBuffer);

      var random_iv = window.crypto.getRandomValues(new Uint8Array(16));

      window.crypto.subtle.encrypt({
        name: "AES-CBC",
        iv: random_iv },
        key,
        array)
        .then(function(encrypted){
          console.log('Send this salt to a friend: [' + random_iv.toString() + ']');

          var dataView = new DataView(encrypted);
          var blob = new Blob([dataView], { type: file.type });
          
          var fd = new FormData();
          fd.append('fname', file.name);
          fd.append('data', blob, file.name);

          var xhr = new XMLHttpRequest();
          var hex = ivToStr(random_iv);
          xhr.open('post', '/upload/' + hex, true);
          xhr.onreadystatechange = function() { 
            if (xhr.readyState == XMLHttpRequest.DONE) {
              window.crypto.subtle.exportKey("jwk", key).then(function(keydata){
                console.log('Go to this URL: http://localhost:3000/download/' + hex + '/#' + keydata.k);
                alert('Go to this URL: http://localhost:3000/download/' + hex + '/#' + keydata.k);

              })
            }
          };

          xhr.send(fd);
        })
        .catch(function(err){
          console.error(err);
        });

      })
    .catch(function(err){
        console.error(err);
    });
    
  };
  reader.readAsArrayBuffer(file);
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
    iv[i/2] = parseInt((str.charAt(i) + str.charAt(i + 1)), 16);
  }

  return iv;
}