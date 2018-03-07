const assert = require('assert');
const proxyquire = require('proxyquire').noCallThru();

const stream = {};
class MockStorage {
  length() {
    return Promise.resolve(12);
  }
  getStream() {
    return stream;
  }
  set() {
    return Promise.resolve();
  }
  del() {
    return Promise.resolve();
  }
  ping() {
    return Promise.resolve();
  }
}

const expire_seconds = 10;
const storage = proxyquire('../../server/storage', {
  '../config': {
    expire_seconds,
    s3_bucket: 'foo',
    env: 'development',
    redis_host: 'localhost'
  },
  '../log': () => {},
  './s3': MockStorage
});

describe('Storage', function() {
  describe('ttl', function() {
    it('returns milliseconds remaining', async function() {
      await storage.set('x', null, { foo: 'bar' });
      const ms = await storage.ttl('x');
      await storage.del('x');
      assert.equal(ms, expire_seconds * 1000);
    });
  });

  describe('length', function() {
    it('returns the file size', async function() {
      const len = await storage.length('x');
      assert.equal(len, 12);
    });
  });

  describe('get', function() {
    it('returns a stream', function() {
      const s = storage.get('x');
      assert.equal(s, stream);
    });
  });

  describe('set', function() {
    it('sets expiration to config.expire_seconds', async function() {
      await storage.set('x', null, { foo: 'bar' });
      const s = await storage.redis.ttlAsync('x');
      await storage.del('x');
      assert.equal(Math.ceil(s), expire_seconds);
    });

    it('sets metadata', async function() {
      const m = { foo: 'bar' };
      await storage.set('x', null, m);
      const meta = await storage.redis.hgetallAsync('x');
      await storage.del('x');
      assert.deepEqual(meta, m);
    });

    //it('throws when storage fails');
  });

  describe('setField', function() {
    it('works', async function() {
      storage.setField('x', 'y', 'z');
      const z = await storage.redis.hgetAsync('x', 'y');
      assert.equal(z, 'z');
      await storage.del('x');
    });
  });

  describe('del', function() {
    it('works', async function() {
      await storage.set('x', null, { foo: 'bar' });
      await storage.del('x');
      const meta = await storage.metadata('x');
      assert.equal(meta, null);
    });
  });

  describe('ping', function() {
    it('works', async function() {
      await storage.ping();
    });
  });

  describe('metadata', function() {
    it('returns all metadata fields', async function() {
      const m = {
        pwd: true,
        dl: 1,
        dlimit: 1,
        auth: 'foo',
        metadata: 'bar',
        nonce: 'baz',
        owner: 'bmo'
      };
      await storage.set('x', null, m);
      const meta = await storage.metadata('x');
      assert.deepEqual(meta, m);
    });
  });
});
