const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const crypto = require('crypto');

const redisStub = {};
const exists = sinon.stub();
const hget = sinon.stub();
const hmset = sinon.stub();
const expire = sinon.spy();
const del = sinon.stub();

redisStub.createClient = function() {
  return {
    on: sinon.spy(),
    exists: exists,
    hget: hget,
    hmset: hmset,
    expire: expire,
    del: del
  };
};

const fsStub = {};
fsStub.statSync = sinon.stub();
fsStub.createReadStream = sinon.stub();
fsStub.createWriteStream = sinon.stub();
fsStub.unlinkSync = sinon.stub();

const logStub = {};
logStub.info = sinon.stub();
logStub.error = sinon.stub();

const s3Stub = {};
s3Stub.headObject = sinon.stub();
s3Stub.getObject = sinon.stub();
s3Stub.upload = sinon.stub();
s3Stub.deleteObject = sinon.stub();

const awsStub = {
  S3: function() {
    return s3Stub;
  }
};

const storage = proxyquire('../../server/storage', {
  redis: redisStub,
  fs: fsStub,
  './log': function() {
    return logStub;
  },
  'aws-sdk': awsStub,
  './config': {
    s3_bucket: 'test'
  }
});

describe('Testing Length using aws', function() {
  it('Filesize returns properly if id exists', function() {
    s3Stub.headObject.callsArgWith(1, null, { ContentLength: 1 });
    return storage
      .length('123')
      .then(reply => assert.equal(reply, 1))
      .catch(err => assert.fail());
  });

  it('Filesize fails if the id does not exist', function() {
    s3Stub.headObject.callsArgWith(1, new Error(), null);
    return storage
      .length('123')
      .then(_reply => assert.fail())
      .catch(err => assert(1));
  });
});

describe('Testing Get using aws', function() {
  it('Should not error out when the file exists', function() {
    const spy = sinon.spy();
    s3Stub.getObject.returns({
      createReadStream: spy
    });

    storage.get('123');
    assert(spy.calledOnce);
  });

  it('Should error when the file does not exist', function() {
    const err = function() {
      throw new Error();
    };
    const spy = sinon.spy(err);
    s3Stub.getObject.returns({
      createReadStream: spy
    });

    assert.equal(storage.get('123'), null);
    assert(spy.threw());
  });
});

describe('Testing Set using aws', function() {
  beforeEach(function() {
    expire.reset();
  });

  after(function() {
    crypto.randomBytes.restore();
  });

  it('Should pass when the file is successfully uploaded', function() {
    const buf = Buffer.alloc(10);
    sinon.stub(crypto, 'randomBytes').returns(buf);
    s3Stub.upload.returns({ promise: () => Promise.resolve() });
    return storage
      .set('123', { on: sinon.stub() }, 'Filename.moz', {})
      .then(() => {
        assert(expire.calledOnce);
        assert(expire.calledWith('123', 86400));
      })
      .catch(err => assert.fail());
  });

  it('Should fail if there was an error during uploading', function() {
    s3Stub.upload.returns({ promise: () => Promise.reject() });
    return storage
      .set('123', { on: sinon.stub() }, 'Filename.moz', 'url.com')
      .then(_reply => assert.fail())
      .catch(err => assert(1));
  });
});

describe('Testing Delete from aws', function() {
  it('Returns successfully if the id is deleted off aws', function() {
    hget.callsArgWith(2, null, 'delete_token');
    s3Stub.deleteObject.callsArgWith(1, null, {});
    return storage
      .delete('file_id', 'delete_token')
      .then(_reply => assert(1), err => assert.fail());
  });

  it('Delete fails if id exists locally but does not in aws', function() {
    hget.callsArgWith(2, null, 'delete_token');
    s3Stub.deleteObject.callsArgWith(1, new Error(), {});
    return storage
      .delete('file_id', 'delete_token')
      .then(_reply => assert.fail(), err => assert(1));
  });

  it('Delete fails if the delete token does not match', function() {
    hget.callsArgWith(2, null, {});
    return storage
      .delete('Filename.moz', 'delete_token')
      .then(_reply => assert.fail())
      .catch(err => assert(1));
  });
});

describe('Testing Forced Delete from aws', function() {
  it('Deletes properly if id exists', function() {
    s3Stub.deleteObject.callsArgWith(1, null, {});
    return storage
      .forceDelete('file_id', 'delete_token')
      .then(_reply => assert(1), err => assert.fail());
  });

  it('Deletes fails if id does not exist', function() {
    s3Stub.deleteObject.callsArgWith(1, new Error(), {});
    return storage
      .forceDelete('file_id')
      .then(_reply => assert.fail(), err => assert(1));
  });
});
