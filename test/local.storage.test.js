const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const conf = require('../server/config.js');
conf.notLocalHost = false;

const redisStub = {};
const exists = sinon.stub();
const hget = sinon.stub();
const hmset = sinon.stub();
const expire = sinon.stub();
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

const storage = proxyquire('../server/storage', {
  redis: redisStub,
  fs: fsStub,
  './log.js': function() {
    return logStub;
  }
});

describe('Testing Exists from local filesystem', function() {
  it('Exists returns true when file exists', function() {
    exists.callsArgWith(1, null, 1);
    return storage.exists('test')
                  .then(() => assert(1))
                  .catch(err => assert.fail())
  });

  it('Exists returns false when file does not exist', function() {
    exists.callsArgWith(1, null, 0);
    return storage.exists('test')
                  .then(() => assert.fail())
                  .catch(err => assert(1))
  });
});

describe('Testing Filename from local filesystem', function() {
  it('Filename returns properly if id exists', function() {
    hget.callsArgWith(2, null, 'Filename.moz');
    return storage
      .filename('test')
      .then(_reply => assert(1))
      .catch(err => assert.fail());
  });

  it('Filename fails if id does not exist', function() {
    hget.callsArgWith(2, null, 'Filename.moz');
    return storage
      .filename('test')
      .then(_reply => assert.fail())
      .catch(err => assert(1));
  });
});

describe('Testing Length from local filesystem', function() {
  it('Filesize returns properly if id exists', function() {
    fsStub.statSync.returns({ size: 10 });
    return storage
      .length('Filename.moz')
      .then(_reply => assert(1))
      .catch(err => assert.fail());
  });

  it('Filesize fails if the id does not exist', function() {
    fsStub.statSync.returns(null);
    return storage
      .length('Filename.moz')
      .then(_reply => assert.fail())
      .catch(err => assert(1));
  });
});

describe('Testing Get from local filesystem', function() {
  it('Get returns properly if id exists', function() {
    fsStub.createReadStream.returns(1);
    if (storage.get('Filename.moz')) {
      assert(1);
    } else {
      assert.fail();
    }
  });

  it('Get fails if the id does not exist', function() {
    fsStub.createReadStream.returns(null);
    if (storage.get('Filename.moz')) {
      assert.fail();
    } else {
      assert(1);
    }
  });
});

describe('Testing Set to local filesystem', function() {
  it('Successfully writes the file to the local filesystem', function() {
    const stub = sinon.stub();
    stub.withArgs('close', sinon.match.any).callsArgWithAsync(1);
    stub.withArgs('error', sinon.match.any).returns(1);
    fsStub.createWriteStream.returns({ on: stub });

    return storage
      .set('test', { pipe: sinon.stub() }, 'Filename.moz', 'moz.la')
      .then(reply => {
        assert(reply.uuid);
        assert.equal(reply.url, 'moz.la');
      })
      .catch(err => assert.fail());
  });

  it('Fails when the file is not properly written to the local filesystem', function() {
    const stub = sinon.stub();
    stub.withArgs('error', sinon.match.any).callsArgWithAsync(1);
    stub.withArgs('close', sinon.match.any).returns(1);
    fsStub.createWriteStream.returns({ on: stub });

    return storage
      .set('test', { pipe: sinon.stub() }, 'Filename.moz', 'moz.la')
      .then(_reply => assert.fail())
      .catch(err => assert(1));
  });
});

describe('Testing Delete from local filesystem', function() {
  it('Deletes properly if id exists', function() {
    hget.callsArgWith(2, null, '123');
    fsStub.unlinkSync.returns(1);
    return storage
      .delete('Filename.moz', '123')
      .then(reply => assert(reply))
      .catch(err => assert.fail());
  });

  it('Delete fails if id does not exist', function() {
    hget.callsArgWith(2, null, null);
    return storage
      .delete('Filename.moz', '123')
      .then(_reply => assert.fail())
      .catch(err => assert(1));
  });

  it('Delete fails if the delete token does not match', function() {
    hget.callsArgWith(2, null, null);
    return storage
      .delete('Filename.moz', '123')
      .then(_reply => assert.fail())
      .catch(err => assert(1));
  });
});

describe('Testing Forced Delete from local filesystem', function() {
  it('Deletes properly if id exists', function() {
    fsStub.unlinkSync.returns(1);
    return storage.forceDelete('Filename.moz').then(reply => assert(reply));
  });

  it('Deletes fails if id does not exist, but no reject is called', function() {
    fsStub.unlinkSync.returns(0);
    return storage.forceDelete('Filename.moz').then(reply => assert(!reply));
  });
});
