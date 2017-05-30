const express = require('express')
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation
const app = express()
var redis = require("redis"),
    client = redis.createClient();

client.on('error', function(err) {
  console.log(err);
})

app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/download/:id', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/download.html'));
});

app.get('/assets/download/:id', function(req, res) {
  
  let id = req.params.id;
  client.hget(id, "filename", function(err, reply) { // maybe some expiration logic too
  if (!reply) {
      res.send('error');
    } else {
      res.setHeader('Content-Disposition', 'attachment; filename=' + reply);
      res.setHeader('Content-Type', 'application/octet-stream');

      res.download(__dirname + '/static/' + reply);
    }
  })
  
});

app.route('/upload/:id')
    .post(function (req, res, next) {

        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname + '/static/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {  
                let id = req.params.id;
                client.hset(id, "filename", filename, redis.print);
                client.hset(id, "expiration", 0, redis.print);
                console.log("Upload Finished of " + filename);              
                res.send(id);
            });
        });
    });



app.listen(3000, function () {
  console.log('Portal app listening on port 3000!')
})

