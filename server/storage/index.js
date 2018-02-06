const config = require('../config');
const Metadata = require('../metadata');
const mozlog = require('../log');
const createRedisClient = require('./redis');

class DB {
  constructor(config) {
    const Storage = config.s3_bucket ? require('./s3') : require('./fs');
    this.log = mozlog('send.storage');
    this.expireSeconds = config.expire_seconds;
    this.storage = new Storage(config, this.log);
    this.redis = createRedisClient(config);
    this.redis.on('error', err => {
      this.log.error('Redis:', err);
    });
  }

  async ttl(id) {
    const result = await this.redis.ttlAsync(id);
    return Math.ceil(result) * 1000;
  }

  length(id) {
    return this.storage.length(id);
  }

  get(id) {
    return this.storage.getStream(id);
  }

  async set(id, file, meta) {
    await this.storage.set(id, file);
    this.redis.hmset(id, meta);
    this.redis.expire(id, this.expireSeconds);
  }

  setField(id, key, value) {
    this.redis.hset(id, key, value);
  }

  del(id) {
    this.redis.del(id);
    return this.storage.del(id);
  }

  async ping() {
    await this.redis.pingAsync();
    await this.storage.ping();
  }

  async metadata(id) {
    const result = await this.redis.hgetallAsync(id);
    return result && new Metadata(result);
  }
}

module.exports = new DB(config);
