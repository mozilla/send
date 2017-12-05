const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const mkdirp = require('mkdirp');

const config = require('./config');
const fs = require('fs');
const path = require('path');

const mozlog = require('./log');

const log = mozlog('send.storage');

const redis_lib =
  config.env === 'development' && config.redis_host === 'localhost'
    ? 'redis-mock'
    : 'redis';

const redis = require(redis_lib);
const redis_client = redis.createClient({
  host: config.redis_host,
  connect_timeout: 10000
});

redis_client.on('error', err => {
  log.error('Redis:', err);
});

const fileDir = config.file_dir;

if (config.s3_bucket) {
  module.exports = {
    exists: exists,
    ttl: ttl,
    length: awsLength,
    get: awsGet,
    set: awsSet,
    setField: setField,
    delete: awsDelete,
    forceDelete: awsForceDelete,
    ping: awsPing,
    flushall: flushall,
    quit: quit,
    metadata
  };
} else {
  mkdirp.sync(config.file_dir);
  log.info('fileDir', fileDir);
  module.exports = {
    exists: exists,
    ttl: ttl,
    length: localLength,
    get: localGet,
    set: localSet,
    setField: setField,
    delete: localDelete,
    forceDelete: localForceDelete,
    ping: localPing,
    flushall: flushall,
    quit: quit,
    metadata
  };
}

function flushall() {
  redis_client.flushdb();
}

function quit() {
  redis_client.quit();
}

function metadata(id) {
  return new Promise((resolve, reject) => {
    redis_client.hgetall(id, (err, reply) => {
      if (err || !reply) {
        return reject(err);
      }
      resolve(reply);
    });
  });
}

function ttl(id) {
  return new Promise((resolve, reject) => {
    redis_client.ttl(id, (err, reply) => {
      if (err || !reply) {
        return reject(err);
      }
      resolve(reply * 1000);
    });
  });
}

function exists(id) {
  return new Promise((resolve, reject) => {
    redis_client.exists(id, (rediserr, reply) => {
      if (reply === 1 && !rediserr) {
        resolve();
      } else {
        reject(rediserr);
      }
    });
  });
}

function setField(id, key, value) {
  redis_client.hset(id, key, value);
}

function localLength(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(fs.statSync(path.join(fileDir, id)).size);
    } catch (err) {
      reject();
    }
  });
}

function localGet(id) {
  return fs.createReadStream(path.join(fileDir, id));
}

function localSet(newId, file, meta) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(fileDir, newId);
    const fstream = fs.createWriteStream(filepath);
    file.pipe(fstream);
    file.on('limit', () => {
      file.unpipe(fstream);
      fstream.destroy(new Error('limit'));
    });
    fstream.on('finish', () => {
      redis_client.hmset(newId, meta);
      redis_client.expire(newId, config.expire_seconds);
      log.info('localSet:', 'Upload Finished of ' + newId);
      resolve(meta.owner);
    });

    fstream.on('error', err => {
      log.error('localSet:', 'Failed upload of ' + newId);
      fs.unlinkSync(filepath);
      reject(err);
    });
  });
}

function localDelete(id, ownerToken) {
  return new Promise((resolve, reject) => {
    redis_client.hget(id, 'delete', (err, reply) => {
      if (!reply || ownerToken !== reply) {
        reject();
      } else {
        redis_client.del(id);
        log.info('Deleted:', id);
        resolve(fs.unlinkSync(path.join(fileDir, id)));
      }
    });
  });
}

function localForceDelete(id) {
  return new Promise((resolve, reject) => {
    redis_client.del(id);
    resolve(fs.unlinkSync(path.join(fileDir, id)));
  });
}

function localPing() {
  return new Promise((resolve, reject) => {
    redis_client.ping(err => {
      return err ? reject() : resolve();
    });
  });
}

function awsLength(id) {
  const params = {
    Bucket: config.s3_bucket,
    Key: id
  };
  return new Promise((resolve, reject) => {
    s3.headObject(params, function(err, data) {
      if (!err) {
        resolve(data.ContentLength);
      } else {
        reject();
      }
    });
  });
}

function awsGet(id) {
  const params = {
    Bucket: config.s3_bucket,
    Key: id
  };

  try {
    return s3.getObject(params).createReadStream();
  } catch (err) {
    return null;
  }
}

function awsSet(newId, file, meta) {
  const params = {
    Bucket: config.s3_bucket,
    Key: newId,
    Body: file
  };
  let hitLimit = false;
  const upload = s3.upload(params);
  file.on('limit', () => {
    hitLimit = true;
    upload.abort();
  });
  return upload.promise().then(
    () => {
      redis_client.hmset(newId, meta);
      redis_client.expire(newId, config.expire_seconds);
    },
    err => {
      if (hitLimit) {
        throw new Error('limit');
      } else {
        throw err;
      }
    }
  );
}

function awsDelete(id, ownerToken) {
  return new Promise((resolve, reject) => {
    redis_client.hget(id, 'delete', (err, reply) => {
      if (!reply || ownerToken !== reply) {
        reject();
      } else {
        const params = {
          Bucket: config.s3_bucket,
          Key: id
        };

        s3.deleteObject(params, function(err, _data) {
          redis_client.del(id);
          err ? reject(err) : resolve(err);
        });
      }
    });
  });
}

function awsForceDelete(id) {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: config.s3_bucket,
      Key: id
    };

    s3.deleteObject(params, function(err, _data) {
      redis_client.del(id);
      err ? reject(err) : resolve();
    });
  });
}

function awsPing() {
  return localPing().then(() =>
    s3.headBucket({ Bucket: config.s3_bucket }).promise()
  );
}
