const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const request = require('supertest');
const FormData = require('form-data');
const fs = require('fs');


const logStub = {};
logStub.info = sinon.stub();
logStub.error = sinon.stub();

let storage = proxyquire('../../server/storage', {
  './log.js': function() {
    return logStub;
  }
});

describe('Server integration tests', function() {
  let server;
  let storage;
  let uuid;

  before(function() {
    let app = proxyquire('../../server/portal_server', {
      './log.js': function() {
        return logStub;
      }
    }); 

    server = app.server;
    storage = app.storage;
  });

  after(function() {
    storage.flushall();
    storage.quit();
    server.close();
  })

  function upload() {
    return request(server).post('/upload/11111111111111111111111111111111')
                   .field('fname', 'test_upload.txt')
                   .attach('file', './test/test_upload.txt')
  }

  it('Responds with a 200 when the service is up', function() {
    return request(server).get('/').expect(200);
  });

  it('Rejects with a 404 when a file id is not valid', function() {
    return request(server).post('/upload/123')
           .field('fname', 'test_upload.txt')
           .attach('file', './test/test_upload.txt')
           .expect(404)
  })

  it('Accepts a file and stores it when properly uploaded', function() {
    return upload().then(res => {
                     assert(res.body.hasOwnProperty('uuid'));
                     uuid = res.body.uuid;
                     assert(res.body.hasOwnProperty('url'));
                     fs.exists('./static/11111111111111111111111111111111', exists => {
                       exists ? assert(1) : assert.fail();
                     })
                   })
  })

  it('Responds with a 200 if a file exists', function() {
    return request(server).get('/exists/11111111111111111111111111111111')
                  .expect(200)
  })

  it('Exists in the redis server', function() {
    return storage.exists('11111111111111111111111111111111')
                  .then(() => assert(1))
                  .catch(err => assert.fail())
  })

  it('Fails delete if the delete token does not match', function() {
    return request(server).post('/delete/11111111111111111111111111111111')
                  .send({ delete_token: 11 })
                  .expect(404);
  })

  it('Fails delete if the id is invalid', function() {
    return request(server).post('/delete/1')
                  .expect(404);
  })

  it('Successfully deletes if the id is valid and the delete token matches', function() {
    return request(server).post('/delete/11111111111111111111111111111111')
                  .send({ delete_token: uuid })
                  .expect(200)
                  .then(res => {
                    fs.exists('./static/11111111111111111111111111111111', exists => {
                      exists ? assert.fail() : assert(1);
                    })
                  })
  })

  it('Responds with a 404 if a file does not exist', function() {
    return request(server).get('/exists/11111111111111111111111111111111')
                          .expect(404)
  })

  it('Uploads properly after a delete', function() {
    return upload().then(res => {
                      assert(res.body.hasOwnProperty('uuid'));
                      uuid = res.body.uuid;
                      assert(res.body.hasOwnProperty('url'));
                      fs.exists('./static/11111111111111111111111111111111', exists => {
                        exists ? assert(1) : assert.fail();
                      })
                    })
  })

  it('Responds with a 200 for the download page', function() {
    return request(server).get('/download/11111111111111111111111111111111')
                          .expect(200);
  })

  it('Downloads a file properly', function() {
    return request(server).get('/assets/download/11111111111111111111111111111111')
                          .then(res => {
                            assert(res.header.hasOwnProperty('content-disposition'));
                            assert(res.header.hasOwnProperty('content-type'))
                            assert(res.header.hasOwnProperty('content-length'))
                            assert.equal(res.header['content-disposition'], 'attachment; filename=test_upload.txt')
                            assert.equal(res.header['content-type'], 'application/octet-stream')
                            assert.equal(res.header['content-length'], fs.statSync('./static/11111111111111111111111111111111').size)
                          })
  })

  it('The file is deleted after one download', function() {
    assert(!fs.existsSync('./static/11111111111111111111111111111111'));
  })

  it('No longer exists in the redis server', function() {
    return storage.exists('11111111111111111111111111111111')
                  .then(() => assert.fail())
                  .catch(err => assert(1))
  })
});