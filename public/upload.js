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
          var dataView = new DataView(encrypted);
          var blob = new Blob([dataView], { type: file.type });
          
          var fd = new FormData();
          fd.append("fname", file.name);
          fd.append("data", blob, file.name);

          var xhr = new XMLHttpRequest();
          var hex = ivToStr(random_iv);
          xhr.open("post", "/upload/" + hex, true);
          xhr.addEventListener("progress", updateProgress);
          xhr.upload.addEventListener("progress", updateProgress);

          xhr.onreadystatechange = function() { 
            if (xhr.readyState == XMLHttpRequest.DONE) {
              window.crypto.subtle.exportKey("jwk", key).then(function(keydata) {
                console.log("Share this link with a friend: http://localhost:3000/download/" + hex + "/#" + keydata.k);
                alert("Share this link with a friend: http://localhost:3000/download/" + hex + "/#" + keydata.k);
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
  let hexStr = "";
  for (var i in iv) {
    if (iv[i] < 16) {
      hexStr += "0" + iv[i].toString(16);
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

function updateProgress(e) {
  if (e.lengthComputable) { 
    var percentComplete = Math.floor((e.loaded / e.total) * 100);
    document.getElementById("downloadProgress").innerHTML = "Progress: " + percentComplete + "%";
  } 
}