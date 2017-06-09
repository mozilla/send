const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const conf = require('./config.js');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const crypto = require('crypto');

let notLocalHost = conf.notLocalHost;

const mozlog = require('./log.js');

let log = mozlog('portal.storage');

const redis = require('redis');
const redis_client = redis.createClient({
  host: conf.redis_host
});

redis_client.on('error', err => {
  log.info('Redis: ', err);
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
        reject();
      }
    });
  });
}

function exists(id) {
  return new Promise((resolve, reject) => {
    redis_client.exists(id, (rediserr, reply) => {
      resolve(reply === 1);
    });
  });
}

function localLength(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(fs.statSync(__dirname + '/../static/' + id).size);
    } catch (err) {
      reject();
    }
  });
}

function localGet(id) {
  return fs.createReadStream(__dirname + '/../static/' + id);
}

function localSet(id, file, filename, url) {
  return new Promise((resolve, reject) => {
    fstream = fs.createWriteStream(__dirname + '/../static/' + id);
    file.pipe(fstream);
    fstream.on('close', () => {
      let uuid = crypto.randomBytes(10).toString('hex');

      redis_client.hmset([id, 'filename', filename, 'delete', uuid]);
      redis_client.expire(id, 86400000);
      log.info('localSet:', 'Upload Finished of ' + id);
      resolve({
        uuid: uuid,
        url: url
      });
    });

    fstream.on('error', () => reject());
  });
}

function localDelete(id, delete_token) {
  return new Promise((resolve, reject) => {
    redis_client.hget(id, 'delete', (err, reply) => {
      if (!reply || delete_token !== reply) {
        reject();
      } else {
        redis_client.del(id);
        resolve(fs.unlinkSync(__dirname + '/../static/' + id));
      }
    });
  });
}

function localForceDelete(id) {
  return new Promise((resolve, reject) => {
    redis_client.del(id);
    resolve(fs.unlinkSync(__dirname + '/../static/' + id));
  });
}

function awsLength(id) {
  let params = {
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
  let params = {
    Bucket: conf.s3_bucket,
    Key: id
  };

  return s3.getObject(params).createReadStream();
}

function awsSet(id, file, filename, url) {
  let params = {
    Bucket: conf.s3_bucket,
    Key: id,
    Body: file
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, function(err, data) {
      if (err) {
        log.info('awsUploadError:', err.stack); // an error occurred
        reject();
      } else {
        let uuid = crypto.randomBytes(10).toString('hex');

        redis_client.hmset([id, 'filename', filename, 'delete', uuid]);

        redis_client.expire(id, 86400000);
        log.info('awsUploadFinish', 'Upload Finished of ' + filename);
        if (conf.bitly_key) {
          fetch(
            'https://api-ssl.bitly.com/v3/shorten?access_token=' +
              conf.bitly_key +
              '&longUrl=' +
              encodeURIComponent(url) +
              '&format=txt'
          )
            .then(res => {
              return res.text();
            })
            .then(body => {
              resolve({
                uuid: uuid,
                url: body
              });
            });
        } else {
          resolve({
            uuid: uuid,
            url: url
          });
        }
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
        let params = {
          Bucket: conf.s3_bucket,
          Key: id
        };

        s3.deleteObject(params, function(err, data) {
          resolve(err);
        });
      }
    });
  });
}

function awsForceDelete(id) {
  return new Promise((resolve, reject) => {
    redis_client.del(id);
    let params = {
      Bucket: conf.s3_bucket,
      Key: id
    };

    s3.deleteObject(params, function(err, data) {
      resolve(err);
    });
  });
}
