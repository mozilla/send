function download() {

  var xhr = new XMLHttpRequest();
  xhr.open("get", "/assets" + location.pathname.slice(0, -1), true);
  xhr.responseType = "blob";

  var li = document.createElement("li");
  var progress = document.createElement("p");
  li.appendChild(progress);
  document.getElementById("downloaded_files").appendChild(li);
  
  xhr.addEventListener("progress", returnBindedLI(li, progress));
  
              
  
  xhr.onload = function(e) {

    // maybe send a separate request before this one to get the filename?

    // maybe render the html itself with the filename, since it's generated server side
    // after a get request with the unique id
    var name = document.createElement("p");
    name.innerHTML = xhr.getResponseHeader("Content-Disposition").match(/filename="(.+)"/)[1];
    li.insertBefore(name, li.firstChild);

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
              document.body.appendChild(a);
              a.click();
            })
            .catch(function(err){
              alert("This link is either invalid or has expired, or the uploader has deleted the file.");
              console.error(err);
            });
        })
        .catch(function(err){
            console.error(err);
        });
      };
      fileReader.readAsArrayBuffer(blob);
    } else {
      alert("This link is either invalid or has expired, or the uploader has deleted the file.")
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

function returnBindedLI(li, progress) {
  return function updateProgress(e) {
            if (e.lengthComputable) { 
              var percentComplete = Math.floor((e.loaded / e.total) * 100);
              progress.innerHTML = "Progress: " + percentComplete + "%";
            } 

            if (percentComplete === 100) {
              var finished = document.createElement("p");
              finished.innerHTML = "Your download has finished.";
              li.appendChild(finished);

              var close = document.createElement("button");
              close.innerHTML = "Ok";
              close.addEventListener("click", function() {
                document.getElementById("downloaded_files").removeChild(li);
              });

              li.appendChild(close);
            }

         }
}