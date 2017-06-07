const express = require('express');
const busboy = require('connect-busboy');
const path = require('path');
const fs = require('fs-extra');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const conf = require('./config.js');
const stream = require('stream');
const fetch = require('node-fetch');
const storage = require('./storage.js');

let isProduction =
  conf.env === 'production' &&
  conf.s3_bucket !== 'localhost' &&
  conf.bitly_key !== 'localhost';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const app = express();
const redis = require('redis');
const redis_client = redis.createClient();

redis_client.on('error', err => {
  console.log(err);
});

app.use(busboy());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/download/:id', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/download.html'));
});

app.get('/assets/download/:id', (req, res) => {
  let id = req.params.id;
  if (!validateID(id)) {
    res.sendStatus(404);
    return;
  }

  redis_client.hget(id, 'filename', (err, reply) => {
    if (!reply) {
      res.sendStatus(404);
    } else {
      storage.length(id).then(contentLength => {
        res.writeHead(200, {
          'Content-Disposition': 'attachment; filename=' + reply,
          'Content-Type': 'application/octet-stream',
          'Content-Length': contentLength
        });
      });

      let file_stream = storage.get(id);

      file_stream.on('close', () => {
        storage.forceDelete(id, redis_client).then(err => {
          if (!err) {
            console.log('Deleted.');
          }
        });
      });

      file_stream.pipe(res);
    }
  });
});

app.post('/delete/:id', (req, res) => {
  let id = req.params.id;

  if (!validateID(id)) {
    res.send(404);
    return;
  }

  let delete_token = req.body.delete_token;

  if (!delete_token) {
    res.sendStatus(404);
  }

  storage
    .delete(id, redis_client, delete_token)
    .then(err => {
      if (!err) {
        console.log('Deleted off s3.');
      }
    })
    .catch(err => res.sendStatus(404));
});

app.post('/upload/:id', (req, res, next) => {
  if (!validateID(req.params.id)) {
    res.send(404);
    return;
  }

  req.pipe(req.busboy);
  req.busboy.on('file', (fieldname, file, filename) => {
    console.log('Uploading: ' + filename);
    let url = `${req.protocol}://${req.get('host')}/download/${req.params.id}/`;

    storage
      .set(req.params.id, file, filename, redis_client, url)
      .then(linkAndID => {
        res.json(linkAndID);
      });
  });
});

let server = app.listen(conf.listen_port, () => {
  console.log(`Portal app listening on port ${conf.listen_port}!`);
});

let validateID = route_id => {
  return route_id.match(/^[0-9a-fA-F]{32}$/) !== null;
};
