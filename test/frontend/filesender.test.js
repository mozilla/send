const FileSender = window.FileSender;
const FakeFile = window.FakeFile;
const stubXML = window.stubXML;
const assert = window.assert;

describe('File Sender', function() {
  let xhr;
  let request;
  let server;

  before(function() {
      xhr = sinon.useFakeXMLHttpRequest();
      server = sinon.fakeServer.create();
      server.respondImmediately = true;
      server.respondWith(
              'POST',
              '/upload',
              function(request) {
                request.respond(
                  200,
                  {'Content-Type': 'application/json'},
                    JSON.stringify({url: '1', id: '1', uuid: 'del'})
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

});