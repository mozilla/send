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

  let params = {
    Bucket: aws_credentials.bucketName,
    Key: req.params.id
  }

  s3.getObject(params, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    }
    else {
      res.writeHead(200, {"Content-Disposition": "attachment; filename=response", //+ reply,
                          "Content-Type": "application/octet-stream"});
      // res.setHeader("Content-Type", "application/octet-stream");
      res.end(new Buffer(data.Body))
    }
  })

  // redis_client.hget(id, "filename", (err, reply) => { // maybe some expiration logic too
  //   if (!reply) {
  //     res.sendStatus(404);
  //   } else {

      // res.download(__dirname + "/../static/" + id, reply, (err) => {
      //   if (!err) {
      //     redis_client.del(id);
      //     fs.unlinkSync(__dirname + "/../static/" + id);
      //   }
      // });
  //   }
  // })
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

<<<<<<< HEAD
  client.hget(id, 'delete', (err, reply) => {
    if (!reply) {
      res.sendStatus(404);
    } else {
      client.del(id);
      fs.unlinkSync(__dirname + '/../static/' + id);
=======
  redis_client.hget(id, "delete", (err, reply) => {
    if (!reply) {
      res.sendStatus(404);
    } else {
      redis_client.del(id);
      fs.unlinkSync(__dirname + "/../static/" + id);
>>>>>>> currently not working, decryption seems to fail
      res.sendStatus(200);
    }
  });
});

app.post("/upload/:id", (req, res, next) => {

    if (!validateID(req.params.id)){
      res.send(404);
      return;
    }

    let fstream;
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
            console.log(data);
          }
        })

        return;

        fstream = fs.createWriteStream(__dirname + "/../static/" + req.params.id);
        file.pipe(fstream);
        fstream.on("close", () => {
            let id = req.params.id;
            let uuid = crypto.randomBytes(10).toString('hex');

            redis_client.hmset([id, "filename", filename, "delete", uuid]);

            // delete the file off the server in 24 hours
            // setTimeout(() => {
            //   fs.unlinkSync(__dirname + "/static/" + id);
            // }, 86400000);

            redis_client.expire(id, 86400000);
            console.log("Upload Finished of " + filename);
            res.send(uuid);
        });
    });
  });
});

app.listen(3000, () => {
  console.log('Portal app listening on port 3000!');
});

let validateID = route_id => {
  return route_id.match(/^[0-9a-fA-F]{32}$/) !== null;
};
