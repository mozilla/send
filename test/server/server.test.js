const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const request = require('supertest');
const fs = require('fs');

const logStub = {};
logStub.info = sinon.stub();
logStub.error = sinon.stub();

const storage = proxyquire('../../server/storage', {
  './log.js': function() {
    return logStub;
  }
});

storage.flushall();

describe('Server integration tests', function() {
  let server;
  let storage;
  let uuid;
  let fileId;

  before(function() {
    const app = proxyquire('../../server/server', {
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
  });

  function upload() {
    return request(server)
      .post('/upload')
      .field('fname', 'test_upload.txt')
      .set(
        'X-File-Metadata',
        JSON.stringify({
          id: '111111111111111111111111',
          filename: 'test_upload.txt'
        })
      )
      .attach('file', './test/test_upload.txt');
  }

  it('Responds with a 200 when the service is up', function() {
    return request(server)
      .get('/')
      .expect(200);
  });

  it('Rejects with a 404 when a file id is not valid', function() {
    return request(server)
      .post('/upload/123')
      .field('fname', 'test_upload.txt')
      .set(
        'X-File-Metadata',
        JSON.stringify({
          silly: 'text'
        })
      )
      .attach('file', './test/test_upload.txt')
      .expect(404);
  });

  it('Accepts a file and stores it when properly uploaded', function(done) {
    upload().then(res => {
      assert(res.body.hasOwnProperty('delete'));
      uuid = res.body.delete;
      assert(res.body.hasOwnProperty('url'));
      assert(res.body.hasOwnProperty('id'));
      fileId = res.body.id;
      fs.access('./static/' + fileId, fs.constants.F_OK, err => {
        if (err) {
          done(new Error('The file does not exist'));
        } else {
          done();
        }
      });
    });
  });

  it('Responds with a 200 if a file exists', function() {
    return request(server)
      .get('/exists/' + fileId)
      .expect(200);
  });

  it('Exists in the redis server', function() {
    return storage
      .exists(fileId)
      .then(() => assert(1))
      .catch(err => assert.fail());
  });

  it('Fails delete if the delete token does not match', function() {
    return request(server)
      .post('/delete/' + fileId)
      .send({ delete_token: 11 })
      .expect(404);
  });

  it('Fails delete if the id is invalid', function() {
    return request(server)
      .post('/delete/1')
      .expect(404);
  });

  it('Successfully deletes if the id is valid and the delete token matches', function(done) {
    request(server)
      .post('/delete/' + fileId)
      .send({ delete_token: uuid })
      .expect(200)
      .then(() => {
        fs.access('./static/' + fileId, fs.constants.F_OK, err => {
          if (err) {
            done();
          } else {
            done(new Error('The file does not exist'));
          }
        });
      });
  });

  it('Responds with a 404 if a file does not exist', function() {
    return request(server)
      .get('/exists/notfound')
      .expect(404);
  });

  it('Uploads properly after a delete', function(done) {
    upload().then(res => {
      assert(res.body.hasOwnProperty('delete'));
      uuid = res.body.delete;
      assert(res.body.hasOwnProperty('url'));
      assert(res.body.hasOwnProperty('id'));
      fileId = res.body.id;
      fs.access('./static/' + fileId, fs.constants.F_OK, err => {
        if (err) {
          done(new Error('The file does not exist'));
        } else {
          done();
        }
      });
    });
  });

  it('Responds with a 200 for the download page', function() {
    return request(server)
      .get('/download/' + fileId)
      .expect(200);
  });

  it('Downloads a file properly', function() {
    return request(server)
      .get('/assets/download/' + fileId)
      .then(res => {
        assert(res.header.hasOwnProperty('content-disposition'));
        assert(res.header.hasOwnProperty('content-type'));
        assert(res.header.hasOwnProperty('content-length'));
        assert(res.header.hasOwnProperty('x-file-metadata'));
        assert.equal(
          res.header['content-disposition'],
          'attachment; filename=test_upload.txt'
        );
        assert.equal(res.header['content-type'], 'application/octet-stream');
      });
  });

  it('The file is deleted after one download', function() {
    assert(!fs.existsSync('./static/' + fileId));
  });

  it('No longer exists in the redis server', function() {
    return storage
      .exists(fileId)
      .then(() => assert.fail())
      .catch(err => assert(1));
  });
});
