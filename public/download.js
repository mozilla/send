function download() {

  var xhr = new XMLHttpRequest();
  xhr.open("get", "/assets" + location.pathname.slice(0, -1), true);
  xhr.responseType = "blob";

  xhr.addEventListener("progress", updateProgress);

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
          ["encrypt", "decrypt"])
        .then(function(key){  
            window.crypto.subtle.decrypt(
                {
                    name: "AES-CBC",
                    iv: salt,
                },
                key,
                array)
            .then(function(decrypted){
                var dataView = new DataView(decrypted);
                var blob = new Blob([dataView]);
                var downloadUrl = URL.createObjectURL(blob);
                var a = document.createElement("a");
                a.href = downloadUrl;
                a.download = xhr.getResponseHeader("Content-Disposition").match(/filename="(.+)"/)[1];
                console.log(xhr.getResponseHeader("Content-Disposition"));
                document.body.appendChild(a);
                a.click();
            })
            .catch(function(err){
                alert("This link is either invalid or has expired.");
                console.error(err);
            });
        })
        .catch(function(err){
            console.error(err);
        });
      };
      fileReader.readAsArrayBuffer(blob);
    } else {
      alert("Unable to download excel.")
    }
  };
  xhr.send();
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