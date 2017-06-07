const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const conf = require('./config.js');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const crypto = require('crypto');

let isProduction =
  conf.env === 'production' &&
  conf.s3_bucket !== 'localhost' &&
  conf.bitly_key !== 'localhost';

if (isProduction) {
  module.exports = {
    length: AWSLength,
    get: AWSGet,
    set: AWSSet,
    delete: AWSDelete,
    forceDelete: AWSForceDelete
  };
} else {
  module.exports = {
    length: LocalLength,
    get: LocalGet,
    set: LocalSet,
    delete: LocalDelete,
    forceDelete: LocalForceDelete
  };
}

function LocalLength(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(fs.statSync(__dirname + '/../static/' + id).size);
    } catch (err) {
      reject();
    }
  });
}

function LocalGet(id) {
  return fs.createReadStream(__dirname + '/../static/' + id);
}

function LocalSet(id, file, filename, client, url) {
  return new Promise((resolve, reject) => {
    fstream = fs.createWriteStream(__dirname + '/../static/' + id);
    file.pipe(fstream);
    fstream.on('close', () => {
      let uuid = crypto.randomBytes(10).toString('hex');

      client.hmset([id, 'filename', filename, 'delete', uuid]);
      client.expire(id, 86400000);
      console.log('Upload Finished of ' + filename);
      resolve({
        uuid: uuid,
        url: url
      });
    });
  });
}

function LocalDelete(id, client, delete_token) {
  return new Promise((resolve, reject) => {
    client.hget(id, 'delete', (err, reply) => {
      if (!reply || delete_token !== reply) {
        resolve(
          new Promise((resolve, reject) => {
            reject();
          })
        );
      } else {
        resolve(
          new Promise((resolve, reject) => {
            client.del(id);
            resolve(fs.unlinkSync(__dirname + '/../static/' + id));
          })
        );
      }
    });
  });
}

function LocalForceDelete(id, client) {
  return new Promise((resolve, reject) => {
    client.del(id);
    resolve(fs.unlinkSync(__dirname + '/../static/' + id));
  });
}

function AWSLength(id) {
  let params = {
    Bucket: conf.s3_bucket,
    Key: id
  };
  return new Promise((resolve, reject) => {
    s3.headObject(params, function(err, data) {
      resolve(data.ContentLength);
    });
  });
}

function AWSGet(id) {
  let params = {
    Bucket: conf.s3_bucket,
    Key: id
  };

  return s3.getObject(params).createReadStream();
}

function AWSSet(id, file, filename, client, url) {
  let params = {
    Bucket: conf.s3_bucket,
    Key: id,
    Body: file
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      } else {
        let uuid = crypto.randomBytes(10).toString('hex');

        client.hmset([id, 'filename', filename, 'delete', uuid]);

        client.expire(id, 86400000);
        console.log('Upload Finished of ' + filename);
        resolve(
          new Promise((resolve, reject) => {
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
          })
        );
      }
    });
  });
}

function AWSDelete(id, client, delete_token) {
  return new Promise((resolve, reject) => {
    client.hget(id, 'delete', (err, reply) => {
      if (!reply || delete_token !== reply) {
        resolve(
          new Promise((resolve, reject) => {
            reject();
          })
        );
      } else {
        client.del(id);
        let params = {
          Bucket: conf.s3_bucket,
          Key: id
        };

        resolve(
          new Promise((resolve, reject) => {
            s3.deleteObject(params, function(err, data) {
              resolve(err);
            });
          })
        );
      }
    });
  });
}

function AWSForceDelete(id, client) {
  return new Promise((resolve, reject) => {
    client.del(id);
    let params = {
      Bucket: conf.s3_bucket,
      Key: id
    };

    resolve(
      new Promise((resolve, reject) => {
        s3.deleteObject(params, function(err, data) {
          resolve(err);
        });
      })
    );
  });
}
