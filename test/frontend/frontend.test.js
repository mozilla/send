const FileSender = window.FileSender;
const FileReceiver = window.FileReceiver;
const FakeFile = window.FakeFile;
const assert = window.assert;
const server = window.server;
const hexToArray = window.hexToArray;
const sinon = window.sinon;

let file;
let encryptedIV;
let secretKey;
let originalBlob;

describe('File Sender', function() {
  before(function() {
    server.respondImmediately = true;
    server.respondWith('POST', '/upload', function(request) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(request.requestBody.get('data'));

      reader.onload = function(event) {
        file = this.result;
      };

      const responseObj = JSON.parse(request.requestHeaders['X-File-Metadata']);
      request.respond(
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify({
          url: 'some url',
          id: responseObj.id,
          delete: responseObj.delete
        })
      );
    });
  });

  it('Should get a loading event emission', function() {
    const file = new FakeFile('hello_world.txt', ['This is some data.']);
    const fs = new FileSender(file);
    let testLoading = true;

    fs.on('loading', isStillLoading => {
      assert(!(!testLoading && isStillLoading));
      testLoading = isStillLoading;
    });

    return fs
      .upload()
      .then(info => {
        assert(info);
        assert(!testLoading);
      })
      .catch(err => {
        console.log(err, err.stack);
        assert.fail();
      });
  });

  it('Should get a encrypting event emission', function() {
    const file = new FakeFile('hello_world.txt', ['This is some data.']);
    const fs = new FileSender(file);
    let testEncrypting = true;

    fs.on('encrypting', isStillEncrypting => {
      assert(!(!testEncrypting && isStillEncrypting));
      testEncrypting = isStillEncrypting;
    });

    return fs
      .upload()
      .then(info => {
        assert(info);
        assert(!testEncrypting);
      })
      .catch(err => {
        console.log(err, err.stack);
        assert.fail();
      });
  });

  it('Should encrypt a file properly', function(done) {
    const newFile = new FakeFile('hello_world.txt', ['This is some data.']);
    const fs = new FileSender(newFile);
    fs.upload().then(info => {
      const key = info.secretKey;
      secretKey = info.secretKey;
      const IV = info.fileId;
      encryptedIV = info.fileId;

      const readRaw = new FileReader();
      readRaw.onload = function(event) {
        const rawArray = new Uint8Array(this.result);
        originalBlob = rawArray;
        window.crypto.subtle
          .importKey(
            'jwk',
            {
              kty: 'oct',
              k: key,
              alg: 'A128GCM',
              ext: true
            },
            {
              name: 'AES-GCM'
            },
            true,
            ['encrypt', 'decrypt']
          )
          .then(cryptoKey => {
            window.crypto.subtle
              .encrypt(
                {
                  name: 'AES-GCM',
                  iv: hexToArray(IV),
                  tagLength: 128
                },
                cryptoKey,
                rawArray
              )
              .then(encrypted => {
                assert(
                  new Uint8Array(encrypted).toString() ===
                    new Uint8Array(file).toString()
                );
                done();
              });
          });
      };

      readRaw.readAsArrayBuffer(newFile);
    });
  });
});

describe('File Receiver', function() {
  class FakeXHR {
    constructor() {
      this.response = file;
      this.status = 200;
    }

    static setup() {
      FakeXHR.prototype.open = sinon.spy();
      FakeXHR.prototype.send = function() {
        this.onload();
      };

      FakeXHR.prototype.originalXHR = window.XMLHttpRequest;

      FakeXHR.prototype.getResponseHeader = function() {
        return JSON.stringify({
          filename: 'hello_world.txt',
          id: encryptedIV
        });
      };
      window.XMLHttpRequest = FakeXHR;
    }

    static restore() {
      // originalXHR is a sinon FakeXMLHttpRequest, since
      // fakeServer.create() is called in frontend.bundle.js
      window.XMLHttpRequest.prototype.originalXHR.restore();
    }
  }

  const cb = function(done) {
    if (
      file === undefined ||
      encryptedIV === undefined ||
      secretKey === undefined
    ) {
      assert.fail(
        'Please run file sending tests before trying to receive the files.'
      );
      done();
    }

    FakeXHR.setup();
    done();
  };

  before(cb);

  after(function() {
    FakeXHR.restore();
  });

  it('Should decrypt properly', function() {
    const fr = new FileReceiver();
    location.hash = secretKey;
    return fr
      .download()
      .then(([decrypted, name]) => {
        assert(name);
        assert(
          new Uint8Array(decrypted).toString() ===
            new Uint8Array(originalBlob).toString()
        );
      })
      .catch(err => {
        console.log(err, err.stack);
        assert.fail();
      });
  });

  it('Should emit decrypting events', function() {
    const fr = new FileReceiver();
    location.hash = secretKey;

    let testDecrypting = true;

    fr.on('decrypting', isStillDecrypting => {
      assert(!(!testDecrypting && isStillDecrypting));
      testDecrypting = isStillDecrypting;
    });

    return fr
      .download()
      .then(([decrypted, name]) => {
        assert(decrypted);
        assert(name);
        assert(!testDecrypting);
      })
      .catch(err => {
        console.log(err, err.stack);
        assert.fail();
      });
  });
});
