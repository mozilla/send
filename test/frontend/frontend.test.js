const FileSender = window.FileSender;
const FakeFile = window.FakeFile;
const stubXML = window.stubXML;
const assert = window.assert;

let file;
let encryptedIV;
let fileHash;
let secretKey;
let blobReplacement;

describe('File Sender', function() {
  let xhr;
  let server;

  before(function() {
      xhr = sinon.useFakeXMLHttpRequest();
      server = sinon.fakeServer.create();
      server.respondImmediately = true;
      server.respondWith(
              'POST',
              '/upload',
              function(request) {
                let reader = new FileReader();
                reader.readAsArrayBuffer(request.requestBody.get('data'));

                reader.onload = function(event) {
                  file = this.result;
                }

                const responseObj = JSON.parse(request.requestHeaders['X-File-Metadata']);

                request.respond(
                  200,
                  {'Content-Type': 'application/json'},
                  JSON.stringify({url: 'some url', 
                                  id: responseObj.id,
                                  delete: responseObj.delete})
                )
              }
            )
  })

  it('Should get a loading event emission', function() {
      let file = new FakeFile('hello_world.txt', ['This is some data.'])
      let fs = new FileSender(file);
      let testLoading = true;

      fs.on('loading', isStillLoading => {
          assert(!(!testLoading && isStillLoading))
          testLoading = isStillLoading
      })

      return fs.upload()
        .then(info => {
          assert(!testLoading)
        })
        .catch(err => {
          assert.fail();
        });
  })

  it('Should get a hashing event emission', function() {
    let file = new FakeFile('hello_world.txt', ['This is some data.'])
    blobReplacement = file;
    let fs = new FileSender(file);
    let testHashing = true;

    fs.on('hashing', isStillHashing => {
        assert(!(!testHashing && isStillHashing))
        testHashing = isStillHashing
    })

    return fs.upload()
        .then(info => {
          assert(!testHashing)
        })
        .catch(err => {
          assert.fail();
        });
  })

  it('Should get a encrypting event emission', function() {
    let file = new FakeFile('hello_world.txt', ['This is some data.'])
    let fs = new FileSender(file);
    let testEncrypting = true;

    fs.on('encrypting', isStillEncrypting => {
      assert(!(!testEncrypting && isStillEncrypting))
      testEncrypting = isStillEncrypting
    })

    return fs.upload()
      .then(info => {
        assert(!testEncrypting)
      })
      .catch(err => {
        assert.fail();
      });
  })

  it('Should encrypt a file properly', function(done) {
    let newFile = new FakeFile('hello_world.txt', ['This is some data.'])
    let fs = new FileSender(newFile);
    fs.upload().then(info => {
      let key = info.secretKey;
      secretKey = info.secretKey;
      let IV = info.fileId;
      encryptedIV = info.fileId;
      
      let readRaw = new FileReader;
      readRaw.onload = function(event) {
        let rawArray = new Uint8Array(this.result);

        window.crypto.subtle.digest('SHA-256', rawArray).then(hash => {
          fileHash = hash;
          window.crypto.subtle.importKey(
            'jwk',
            {
              kty: 'oct',
              k: key,
              alg: 'A128GCM',
              ext: true,
            },
            {
              name: 'AES-GCM'
            },
            true,
            ['encrypt', 'decrypt']
          )
          .then(cryptoKey => {
            window.crypto.subtle.encrypt(
              {
                name: 'AES-GCM',
                iv: hexToArray(IV),
                additionalData: hash,
                tagLength: 128
              },
              cryptoKey,
              rawArray
            )
            .then(encrypted => {
              assert(new Uint8Array(encrypted).toString() ===
                     new Uint8Array(file).toString());
              done();
            })
          })
        })
        
      }

      readRaw.readAsArrayBuffer(newFile);
    })
  })

});

describe('File Receiver', function(done) {
  
  const cb = function(done) {
    if (file === undefined ||
        encryptedIV === undefined || 
        fileHash === undefined || 
        secretKey === undefined) {
      setTimeout(cb, 1000);
      return;
    }

    let xhr;
    let server;

    xhr = sinon.useFakeXMLHttpRequest();
    server = sinon.fakeServer.create();
    server.respondImmediately = true;
    // xhr.prototype.response = file;

    server.respondWith(
            'GET',
            '/assets' + location.pathname.slice(0, -1),
            function(request) {
              request.respond(
                200,
                {
                  'Content-Disposition': 'attachment; filename=hello_world.txt',
                  'Content-Type': 'application/octet-stream',
                  'Content-Length': file.byteLength,
                  'X-File-Metadata': JSON.stringify({
                    aad: arrayToHex(new Uint8Array(fileHash)),
                    filename: 'hello_world.txt',
                    id: encryptedIV
                  })
                },
                String.fromCharCode.apply(String, new Uint8Array(file))
              )
            }
          )
    done();
  }

  before(cb)

  it('Should decrypt properly', function() {
    let fr = new FileReceiver();
    location.hash = secretKey;
    return fr.download().then(([decrypted, name]) => {
      console.log('here')
    }).catch(err => {
      console.log(err, err.stack)
    })
  })
})
