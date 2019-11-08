const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();

function resolvedPromise(val) {
  return {
    promise: () => Promise.resolve(val)
  };
}

function rejectedPromise(err) {
  return {
    promise: () => Promise.reject(err)
  };
}

const s3Stub = {
  headObject: sinon.stub(),
  getObject: sinon.stub(),
  upload: sinon.stub(),
  deleteObject: sinon.stub()
};

const awsStub = {
  config: {
    update: sinon.stub()
  },
  S3: function() {
    return s3Stub;
  }
};

const S3Storage = proxyquire('../../server/storage/s3', {
  'aws-sdk': awsStub
});

describe('S3Storage', function() {
  it('uses config.s3_bucket', function() {
    const s = new S3Storage({ s3_bucket: 'foo' });
    assert.equal(s.bucket, 'foo');
  });

  describe('length', function() {
    it('returns the ContentLength', async function() {
      s3Stub.headObject = sinon
        .stub()
        .returns(resolvedPromise({ ContentLength: 123 }));
      const s = new S3Storage({ s3_bucket: 'foo' });
      const len = await s.length('x');
      assert.equal(len, 123);
      sinon.assert.calledWithMatch(s3Stub.headObject, {
        Bucket: 'foo',
        Key: 'x'
      });
    });

    it('throws when id not found', async function() {
      const err = new Error();
      s3Stub.headObject = sinon.stub().returns(rejectedPromise(err));
      const s = new S3Storage({ s3_bucket: 'foo' });
      try {
        await s.length('x');
        assert.fail();
      } catch (e) {
        assert.equal(e, err);
      }
    });
  });

  describe('getStream', function() {
    it('returns a Stream object', function() {
      const stream = {};
      s3Stub.getObject = sinon
        .stub()
        .returns({ createReadStream: () => stream });
      const s = new S3Storage({ s3_bucket: 'foo' });
      const result = s.getStream('x');
      assert.equal(result, stream);
      sinon.assert.calledWithMatch(s3Stub.getObject, {
        Bucket: 'foo',
        Key: 'x'
      });
    });
  });

  describe('set', function() {
    it('calls s3.upload', async function() {
      const file = { on: sinon.stub() };
      s3Stub.upload = sinon.stub().returns(resolvedPromise());
      const s = new S3Storage({ s3_bucket: 'foo' });
      await s.set('x', file);
      sinon.assert.calledWithMatch(s3Stub.upload, {
        Bucket: 'foo',
        Key: 'x',
        Body: file
      });
    });

    it('aborts upload if limit is hit', async function() {
      const file = {
        on: (ev, fn) => fn()
      };
      const abort = sinon.stub();
      const err = new Error('limit');
      s3Stub.upload = sinon.stub().returns({
        promise: () => Promise.reject(err),
        abort
      });
      const s = new S3Storage({ s3_bucket: 'foo' });
      try {
        await s.set('x', file);
        assert.fail();
      } catch (e) {
        assert.equal(e.message, 'limit');
        sinon.assert.calledOnce(abort);
      }
    });

    it('throws when s3.upload fails', async function() {
      const file = {
        on: sinon.stub()
      };
      const err = new Error();
      s3Stub.upload = sinon.stub().returns(rejectedPromise(err));
      const s = new S3Storage({ s3_bucket: 'foo' });
      try {
        await s.set('x', file);
        assert.fail();
      } catch (e) {
        assert.equal(e, err);
      }
    });
  });

  describe('del', function() {
    it('calls s3.deleteObject', async function() {
      s3Stub.deleteObject = sinon.stub().returns(resolvedPromise(true));
      const s = new S3Storage({ s3_bucket: 'foo' });
      const result = await s.del('x');
      assert.equal(result, true);
      sinon.assert.calledWithMatch(s3Stub.deleteObject, {
        Bucket: 'foo',
        Key: 'x'
      });
    });
  });

  describe('ping', function() {
    it('calls s3.headBucket', async function() {
      s3Stub.headBucket = sinon.stub().returns(resolvedPromise(true));
      const s = new S3Storage({ s3_bucket: 'foo' });
      const result = await s.ping();
      assert.equal(result, true);
      sinon.assert.calledWithMatch(s3Stub.headBucket, { Bucket: 'foo' });
    });
  });
});
