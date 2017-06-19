const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const conf = require('../server/config.js');
conf.notLocalHost = true;

let redisStub = {};
let exists = sinon.stub();
let hget = sinon.stub();
let hmset = sinon.stub();
let expire = sinon.stub();
let del = sinon.stub();

redisStub.createClient = function() {
  return {
    on: sinon.spy(),
    exists: exists,
    hget: hget,
    hmset: hmset,
    expire: expire,
    del: del
  }
}

let fsStub = {};
fsStub.statSync = sinon.stub();
fsStub.createReadStream = sinon.stub();
fsStub.createWriteStream = sinon.stub();
fsStub.unlinkSync = sinon.stub();

let logStub = {};
logStub.info = sinon.stub();
logStub.error = sinon.stub();

let s3Stub = {};
s3Stub.headObject = sinon.stub();
s3Stub.getObject = sinon.stub();
s3Stub.upload = sinon.stub();
s3Stub.deleteObject = sinon.stub();

let awsStub = {
    S3: function() {
        return s3Stub;
    }
}

const storage = proxyquire('../server/storage', {
  'redis': redisStub,
  'fs': fsStub,
  './log.js': function() { return logStub },
  'aws-sdk': awsStub
});

describe('Testing Length using aws', function() {
  it('Filesize returns properly if id exists', function() {
    s3Stub.headObject.callsArgWith(1, null, {ContentLength: 1});
    return storage.length('123')
                  .then(reply => assert(reply === 1))
                  .catch(err => assert.fail())
  })

  it('Filesize fails if the id does not exist', function() {
    s3Stub.headObject.callsArgWith(1, new Error(), null);
    return storage.length('123')
                  .then(reply => assert.fail())
                  .catch(err => assert(1))
  })
});

describe('Testing Get using aws', function() {
  it('Should not error out when the file exists', function() {
    s3Stub.getObject.returns({
      createReadStream: function() { return 1; }
    });
    assert(storage.get('123') === 1);
  })

  it('Should error when the file does not exist', function() {
    s3Stub.getObject.returns({
      createReadStream: function() { return null; }
    });
    assert(storage.get('123') === null);
  })
});

describe('Testing Set using aws', function() {
  it('Should pass when the file is successfully uploaded and no bitly key', function() {
    conf.bitly_key = null;
    s3Stub.upload.callsArgWith(1, null, {});
    return storage.set('123', {}, 'Filename.moz', 'url.com')
           .then(reply => assert(reply.url === 'url.com' && reply.uuid !== null))
           .catch(err => assert.fail());
  })

  it('Should fail if there was an error during uploading', function() {
    s3Stub.upload.callsArgWith(1, new Error(), null);
    return storage.set('123', {}, 'Filename.moz', 'url.com')
           .then(reply => assert.fail())
           .catch(err => assert(1));
  })
});

describe('Testing Delete from aws', function() {
  it('Returns successfully if the id is deleted off aws', function() {
    hget.callsArgWith(2, null, 'delete_token');
    s3Stub.deleteObject.callsArgWith(1, null, {});
    return storage.delete('file_id', 'delete_token')
                  .then(reply => assert(1), err => assert.fail())
  })

  it('Delete fails if id exists locally but does not in aws', function() {
    hget.callsArgWith(2, null, 'delete_token');
    s3Stub.deleteObject.callsArgWith(1, new Error(), {});
    return storage.delete('file_id', 'delete_token')
                  .then(reply => assert.fail(), err => assert(1))
  })

  it('Delete fails if the delete token does not match', function() {
    hget.callsArgWith(2, null, {});
    return storage.delete('Filename.moz', 'delete_token')
                  .then(reply => assert.fail())
                  .catch(reply => assert(1))
  })
});

describe('Testing Forced Delete from aws', function() {
  it('Deletes properly if id exists', function() {
    s3Stub.deleteObject.callsArgWith(1, null, {});
    return storage.forceDelete('file_id', 'delete_token')
                  .then(reply => assert(1), err => assert.fail());
  })

  it('Deletes fails if id does not exist', function() {
    s3Stub.deleteObject.callsArgWith(1, new Error(), {});
    return storage.forceDelete('file_id')
                  .then(reply => assert.fail(), err => assert(1))
  })

})