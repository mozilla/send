const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const conf = require('./config.js');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const notLocalHost = conf.notLocalHost;

const mozlog = require('./log.js');

const log = mozlog('portal.storage');

const redis = require('redis');
const redis_client = redis.createClient({
  host: conf.redis_host
});

redis_client.on('error', err => {
  log.info('Redis:', err);
});

if (notLocalHost) {
  module.exports = {
    filename: filename,
    exists: exists,
    length: awsLength,
    get: awsGet,
    set: awsSet,
    delete: awsDelete,
    forceDelete: awsForceDelete
  };
} else {
  module.exports = {
    filename: filename,
    exists: exists,
    length: localLength,
    get: localGet,
    set: localSet,
    delete: localDelete,
    forceDelete: localForceDelete
  };
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

function localSet(id, file, filename, url) {
  return new Promise((resolve, reject) => {
    const fstream = fs.createWriteStream(path.join(__dirname, '../static', id));
    file.pipe(fstream);
    fstream.on('close', () => {
      const uuid = crypto.randomBytes(10).toString('hex');

      redis_client.hmset([id, 'filename', filename, 'delete', uuid]);
      redis_client.expire(id, 86400000);
      log.info('localSet:', 'Upload Finished of ' + id);
      resolve({
        uuid: uuid,
        url: url
      });
    });

    fstream.on('error', () => {
      log.error('localSet:', 'Failed upload of ' + id);
      reject();
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

function awsSet(id, file, filename, url) {
  const params = {
    Bucket: conf.s3_bucket,
    Key: id,
    Body: file
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, function(err, _data) {
      if (err) {
        log.info('awsUploadError:', err.stack); // an error occurred
        reject();
      } else {
        const uuid = crypto.randomBytes(10).toString('hex');

        redis_client.hmset([id, 'filename', filename, 'delete', uuid]);

        redis_client.expire(id, 86400000);
        log.info('awsUploadFinish', 'Upload Finished of ' + filename);
        resolve({
          uuid: uuid,
          url: url
        });
      }
    });
  });
}

function awsDelete(id, delete_token) {
  return new Promise((resolve, reject) => {
    redis_client.hget(id, 'delete', (err, reply) => {
      if (!reply || delete_token !== reply) {
        reject();
      } else {
        redis_client.del(id);
        const params = {
          Bucket: conf.s3_bucket,
          Key: id
        };

        s3.deleteObject(params, function(err, _data) {
          err ? reject(err) : resolve(err);
        });
      }
    });
  });
}

function awsForceDelete(id) {
  return new Promise((resolve, reject) => {
    redis_client.del(id);
    const params = {
      Bucket: conf.s3_bucket,
      Key: id
    };

    s3.deleteObject(params, function(err, _data) {
      err ? reject(err) : resolve(err);
    });
  });
}
