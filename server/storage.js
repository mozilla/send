const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const conf = require('./config.js');
const fs = require('fs');
const path = require('path');

const mozlog = require('./log.js');

const log = mozlog('send.storage');

const redis = require('redis');
const redis_client = redis.createClient({
  host: conf.redis_host,
  connect_timeout: 10000
});

redis_client.on('error', err => {
  log.info('Redis:', err);
});

if (conf.s3_bucket) {
  module.exports = {
    filename: filename,
    exists: exists,
    length: awsLength,
    get: awsGet,
    set: awsSet,
    aad: aad,
    setField: setField,
    delete: awsDelete,
    forceDelete: awsForceDelete,
    ping: awsPing,
    flushall: flushall,
    quit: quit,
    metadata
  };
} else {
  module.exports = {
    filename: filename,
    exists: exists,
    length: localLength,
    get: localGet,
    set: localSet,
    aad: aad,
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
      if (!err) {
        resolve(reply);
      } else {
        reject(err);
      }
    });
  });
}

function filename(id) {
  return new Promise((resolve, reject) => {
    redis_client.hget(id, 'filename', (err, reply) => {
      if (!err) {
        resolve(reply);
      } else {
        reject(err);
      }
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

function aad(id) {
  return new Promise((resolve, reject) => {
    redis_client.hget(id, 'aad', (err, reply) => {
      if (!err) {
        resolve(reply);
      } else {
        reject();
      }
    });
  });
}

function localLength(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(fs.statSync(path.join(__dirname, '../static', id)).size);
    } catch (err) {
      reject();
    }
  });
}

function localGet(id) {
  return fs.createReadStream(path.join(__dirname, '../static', id));
}

function localSet(newId, file, filename, meta) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(__dirname, '../static', newId);
    const fstream = fs.createWriteStream(filepath);
    file.pipe(fstream);
    file.on('limit', () => {
      file.unpipe(fstream);
      fstream.destroy(new Error('limit'));
    });
    fstream.on('finish', () => {
      redis_client.hmset(newId, meta);
      redis_client.expire(newId, 86400000);
      log.info('localSet:', 'Upload Finished of ' + newId);
      resolve(meta.delete);
    });

    fstream.on('error', err => {
      log.error('localSet:', 'Failed upload of ' + newId);
      fs.unlinkSync(filepath);
      reject(err);
    });
  });
}

function localDelete(id, delete_token) {
  return new Promise((resolve, reject) => {
    redis_client.hget(id, 'delete', (err, reply) => {
      if (!reply || delete_token !== reply) {
        reject();
      } else {
        redis_client.del(id);
        resolve(fs.unlinkSync(path.join(__dirname, '../static', id)));
      }
    });
  });
}

function localForceDelete(id) {
  return new Promise((resolve, reject) => {
    redis_client.del(id);
    resolve(fs.unlinkSync(path.join(__dirname, '../static', id)));
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
    Bucket: conf.s3_bucket,
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
    Bucket: conf.s3_bucket,
    Key: id
  };

  try {
    return s3.getObject(params).createReadStream();
  } catch (err) {
    log.info('GetFailed', 'Get Object from s3 failed.');
    return null;
  }
}

function awsSet(newId, file, filename, meta) {
  const params = {
    Bucket: conf.s3_bucket,
    Key: newId,
    Body: file
  };
  let hitLimit = false;
  const upload = s3.upload(params);
  file.on('limit', () => {
    hitLimit = true;
    upload.abort();
  });
  return upload.promise()
    .then(() => {
      redis_client.hmset(newId, meta);
      redis_client.expire(newId, 86400000);
      log.info('awsUploadFinish', 'Upload Finished of ' + filename);
    },
    err => {
      if (hitLimit) {
        throw new Error('limit');
      } else {
        throw err;
      }
    });
}

function awsDelete(id, delete_token) {
  return new Promise((resolve, reject) => {
    redis_client.hget(id, 'delete', (err, reply) => {
      if (!reply || delete_token !== reply) {
        reject();
      } else {
        const params = {
          Bucket: conf.s3_bucket,
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
      Bucket: conf.s3_bucket,
      Key: id
    };

    s3.deleteObject(params, function(err, _data) {
      redis_client.del(id);
      err ? reject(err) : resolve(err);
    });
  });
}

function awsPing() {
  return localPing().then(() =>
    s3.headBucket({ Bucket: conf.s3_bucket }).promise()
  );
}
