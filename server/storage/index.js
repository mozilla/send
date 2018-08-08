const config = require('../config');
const Metadata = require('../metadata');
const mozlog = require('../log');
const createRedisClient = require('./redis');

class DB {
  constructor(config) {
    const Storage =
      config.s3_buckets.length > 0 ? require('./s3') : require('./fs');
    this.log = mozlog('send.storage');

    this.storage = [];

    for (let i = 0; i < config.num_of_buckets; i++) {
      this.storage.push(new Storage(config, i, this.log));
    }

    this.redis = createRedisClient(config);
    this.redis.on('error', err => {
      this.log.error('Redis:', err);
    });
  }

  async ttl(id) {
    const result = await this.redis.ttlAsync(id);
    return Math.ceil(result) * 1000;
  }

  async getBucket(id) {
    return this.redis.hgetAsync(id, 'bucket');
  }

  async length(id) {
    const bucket = await this.redis.hgetAsync(id, 'bucket');
    return this.storage[bucket].length(id);
  }

  async get(id) {
    const bucket = await this.redis.hgetAsync(id, 'bucket');
    return this.storage[bucket].getStream(id);
  }

  async set(id, file, meta, expireSeconds = config.default_expire_seconds) {
    const bucketTimes = config.expire_times_seconds;
    let bucket = 0;
    while (bucket < config.num_of_buckets - 1) {
      if (expireSeconds <= bucketTimes[bucket]) {
        break;
      }
      bucket++;
    }

    await this.storage[bucket].set(id, file);
    this.redis.hset(id, 'bucket', bucket);
    this.redis.hmset(id, meta);
    this.redis.expire(id, expireSeconds);
  }

  setField(id, key, value) {
    this.redis.hset(id, key, value);
  }

  async del(id) {
    const bucket = await this.redis.hgetAsync(id, 'bucket');
    this.redis.del(id);
    this.storage[bucket].del(id);
  }

  async ping() {
    await this.redis.pingAsync();
    for (const bucket of this.storage) {
      bucket.ping();
    }
  }

  async metadata(id) {
    const result = await this.redis.hgetallAsync(id);
    return result && new Metadata(result);
  }
}

module.exports = new DB(config);
