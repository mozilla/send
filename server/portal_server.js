const express = require("express")
const busboy = require("connect-busboy");
const path = require("path");
const fs = require("fs-extra");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const conf = require('./config.js');
const stream = require('stream');

let aws_credentials = conf.get('aws_credentials');

const AWS = require('aws-sdk');
AWS.config.loadFromPath('../../.aws/credentials');
const s3 = new AWS.S3();


const app = express()
const redis = require("redis"),
    redis_client = redis.createClient();

redis_client.on("error", (err) => {
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
    res.send(404);
    return;
  }

  redis_client.hget(id, "filename", (err, reply) => { // maybe some expiration logic too
    if (!reply) {
      res.sendStatus(404);
    } else {

      let params = {
        Bucket: aws_credentials.bucketName,
        Key: id
      }

      s3.headObject(params, function(err, data) {
        res.writeHead(200, {"Content-Disposition": "attachment; filename=" + reply,
                            "Content-Type": "application/octet-stream",
                            "Content-Length": data.ContentLength});
        let file_stream = s3.getObject(params).createReadStream();

        file_stream.on('finish', () => {
          redis_client.del(id);
          s3.deleteObject(params, function(err, data) {
            if (!err) {
              console.log('Deleted off s3.');
            }
          })
        });

        file_stream.pipe(res);
      });

      // s3.getObject(params, function(err, data) {
      //   if (err) {
      //     console.log(err, err.stack); // an error occurred
      //     res.sendStatus(404);
      //   }
      //   else {



      //   }
      // })

    }
  })
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

  redis_client.hget(id, "delete", (err, reply) => {
    if (!reply || (delete_token !== reply)) {
      res.sendStatus(404);
    } else {
      redis_client.del(id);
      let params = {
        Bucket: aws_credentials.bucketName,
        Key: id
      }

      s3.deleteObject(params, function(err, data) {
        if (!err) {
          console.log('Deleted off s3.');
        }
      })

      res.sendStatus(200);
    }
  });
});

app.post("/upload/:id", (req, res, next) => {

    if (!validateID(req.params.id)){
      res.send(404);
      return;
    }

    req.pipe(req.busboy);
    req.busboy.on("file", (fieldname, file, filename) => {
        console.log("Uploading: " + filename);

        let params = {
          Bucket: aws_credentials.bucketName,
          Key: req.params.id,
          Body: file
        }

        s3.upload(params, function(err, data) {
          if (err) {
            console.log(err, err.stack); // an error occurred
          } else {
            let id = req.params.id;
            let uuid = crypto.randomBytes(10).toString('hex');

            redis_client.hmset([id, "filename", filename, "delete", uuid]);

            redis_client.expire(id, 86400000);
            console.log("Upload Finished of " + filename);
            res.send(uuid);
          }
        })
    });
  });
});

app.listen(3000, () => {
  console.log('Portal app listening on port 3000!');
});

let validateID = route_id => {
  return route_id.match(/^[0-9a-fA-F]{32}$/) !== null;
};
