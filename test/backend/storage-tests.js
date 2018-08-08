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

const config = {
  default_expire_seconds: 10,
  num_of_buckets: 3,
  expire_times_seconds: [86400, 604800, 1209600],
  s3_buckets: ['foo', 'bar', 'baz'],
  env: 'development',
  redis_host: 'localhost'
};

const storage = proxyquire('../../server/storage', {
  '../config': config,
  '../log': () => {},
  './s3': MockStorage
});

describe('Storage', function() {
  describe('ttl', function() {
    it('returns milliseconds remaining', async function() {
      const time = 40;
      await storage.set('x', null, { foo: 'bar' }, time);
      const ms = await storage.ttl('x');
      await storage.del('x');
      assert.equal(ms, time * 1000);
    });
  });

  describe('length', function() {
    it('returns the file size', async function() {
      await storage.set('x', null);
      const len = await storage.length('x');
      assert.equal(len, 12);
    });
  });

  describe('get', function() {
    it('returns a stream', async function() {
      await storage.set('x', null);
      const s = await storage.get('x');
      assert.equal(s, stream);
    });
  });

  describe('set', function() {
    it('sets expiration to expire time', async function() {
      const seconds = 100;
      await storage.set('x', null, { foo: 'bar' }, seconds);
      const s = await storage.redis.ttlAsync('x');
      await storage.del('x');
      assert.equal(Math.ceil(s), seconds);
    });

    it('puts into right bucket based on expire time', async function() {
      for (let i = 0; i < config.num_of_buckets; i++) {
        await storage.set(
          'x',
          null,
          { foo: 'bar' },
          config.expire_times_seconds[i]
        );
        const bucket = await storage.getBucket('x');
        assert.equal(bucket, i);
        await storage.del('x');
      }
    });

    it('sets metadata', async function() {
      const m = { foo: 'bar' };
      await storage.set('x', null, m);
      const meta = await storage.redis.hgetallAsync('x');
      delete meta.bucket;
      await storage.del('x');
      assert.deepEqual(meta, m);
    });

    //it('throws when storage fails');
  });

  describe('setField', function() {
    it('works', async function() {
      await storage.set('x', null);
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
