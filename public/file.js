
function download() {
  // console.log(location.pathname.slice(10, -1));

// var new_salt = ;
// console.log(new_salt);
// console.log(salt);

  var xhr = new XMLHttpRequest();
  xhr.open('get', '/assets' + location.pathname.slice(0, -1), true);
  xhr.responseType = 'blob';
  // $.each(SERVER.authorization(), function(k, v) {
  //     xhr.setRequestHeader(k, v);
  // });
  // xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

  xhr.onload = function(e) {
      if (this.status == 200) {
          let self = this;
          var blob = new Blob([this.response]);
          var arrayBuffer;
          var fileReader = new FileReader();
          fileReader.onload = function() {
              arrayBuffer = this.result;
              // console.log(arrayBuffer);
              var array = new Uint8Array(arrayBuffer);
              salt = strToIv(location.pathname.slice(10, -1));
              // var new_salt = strToIv(location.pathname.slice(10, -1));
              // console.log(new_salt);
              // console.log(salt);
              window.crypto.subtle.importKey(
                  "jwk", //can be "jwk" or "raw"
                  {   //this is an example jwk key, "raw" would be an ArrayBuffer
                      kty: "oct",
                      k: location.hash.slice(1),
                      alg: "A128CBC",
                      ext: true,
                  },
                  {   //this is the algorithm options
                      name: "AES-CBC",
                  },
                  true, //whether the key is extractable (i.e. can be used in exportKey)
                  ["encrypt", "decrypt"] //can be "encrypt", "decrypt", "wrapKey", or "unwrapKey"
              )
              .then(function(key){
                  //returns the symmetric key
                  window.crypto.subtle.decrypt(
                      {
                          name: "AES-CBC",
                          iv: salt, //The initialization vector you used to encrypt
                      },
                      key, //from generateKey or importKey above
                      array //ArrayBuffer of the data
                  )
                  .then(function(decrypted){
                      //returns an ArrayBuffer containing the decrypted data
                      // let original = new Uint8Array(decrypted);
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
                  // console.log(key);
              })
              .catch(function(err){
                  console.error(err);
              });
          };
          fileReader.readAsArrayBuffer(blob);
          // console.log(blob);
          // var downloadUrl = URL.createObjectURL(blob);
          // var a = document.createElement("a");
          // a.href = downloadUrl;
          // // a.download = "feheroes.png";
          // document.body.appendChild(a);
          // a.click();
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
    // The file's text will be printed here
    let self = this;
    window.crypto.subtle.generateKey({
      name: "AES-CBC",
      length: 128 
    },
    true, //whether the key is extractable (i.e. can be used in exportKey)
    ["encrypt", "decrypt"])
    .then(function(key){
      //returns a key object
      var arrayBuffer = self.result;
      var array = new Uint8Array(arrayBuffer);
      // binaryString = String.fromCharCode.apply(null, array);

      // console.log(binaryString);
      // console.log(file);

      var random_iv = window.crypto.getRandomValues(new Uint8Array(16));

      window.crypto.subtle.encrypt({
        name: "AES-CBC",
        //Don't re-use initialization vectors!
        //Always generate a new iv every time your encrypt!
        iv: random_iv},
        key, //from generateKey or importKey above
        array //ArrayBuffer of data you want to encrypt
        )
        .then(function(encrypted){
          console.log('Send this salt to a friend: [' + random_iv.toString() + ']');
          // console.log(arrayBuffer);
        //returns an ArrayBuffer containing the encrypted data
          var dataView = new DataView(encrypted);
          var blob = new Blob([dataView], { type: file.type });
          // window.data = encrypted;
          var fd = new FormData();
          fd.append('fname', file.name);
          fd.append('data', blob, file.name);
          // console.log(blob);
          var xhr = new XMLHttpRequest();
          var hex = ivToStr(random_iv);
          xhr.open('post', '/upload/' + hex, true);
          xhr.onreadystatechange = function() { 
            if (xhr.readyState == XMLHttpRequest.DONE) {
              window.crypto.subtle.exportKey("jwk", key).then(function(keydata){
                //returns the exported key data
                console.log('Go to this URL: http://localhost:3000/download/' + hex + '/#' + keydata.k);
                console.log(keydata.k);
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
    // console.log(str.charAt(i) + str.charAt(i+1));
    iv[i/2] = parseInt((str.charAt(i) + str.charAt(i + 1)), 16);
  }

  return iv;
}