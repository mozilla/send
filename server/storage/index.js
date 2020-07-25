const config = require('../config');
const Metadata = require('../metadata');
const mozlog = require('../log');
const createRedisClient = require('./redis');

function getPrefix(seconds) {
  return Math.max(Math.floor(seconds / 86400), 1);
}

class DB {
  constructor(config) {
    let Storage = null;
    if (config.s3_bucket) {
      Storage = require('./s3');
    } else if (config.gcs_bucket) {
      Storage = require('./gcs');
    } else {
      Storage = require('./fs');
    }
    this.log = mozlog('send.storage');

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

  async getPrefixedInfo(id) {
    const [prefix, dead, flagged] = await this.redis.hmgetAsync(
      id,
      'prefix',
      'dead',
      'flagged'
    );
    return {
      filePath: `${prefix}-${id}`,
      flagged,
      dead
    };
  }

  async length(id) {
    const { filePath } = await this.getPrefixedInfo(id);
    return this.storage.length(filePath);
  }

  async get(id) {
    const info = await this.getPrefixedInfo(id);
    if (info.dead || info.flagged) {
      throw new Error(info.flagged ? 'flagged' : 'dead');
    }
    return this.storage.getStream(info.filePath);
  }

  async set(id, file, meta, expireSeconds = config.default_expire_seconds) {
    const prefix = getPrefix(expireSeconds);
    const filePath = `${prefix}-${id}`;
    await this.storage.set(filePath, file);
    if (meta) {
      this.redis.hmset(id, { prefix, ...meta });
    } else {
      this.redis.hset(id, 'prefix', prefix);
    }
    this.redis.expire(id, expireSeconds);
  }

  setField(id, key, value) {
    this.redis.hset(id, key, value);
  }

  incrementField(id, key, increment = 1) {
    this.redis.hincrby(id, key, increment);
  }

  async kill(id) {
    const { filePath } = await this.getPrefixedInfo(id);
    this.storage.del(filePath);
    this.redis.hset(id, 'dead', 1);
  }

  async flag(id, key) {
    await this.kill(id);
    this.redis.hmset(id, { flagged: 1, key });
  }

  async del(id) {
    const { filePath } = await this.getPrefixedInfo(id);
    this.storage.del(filePath);
    this.redis.del(id);
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
