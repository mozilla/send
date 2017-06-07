const express = require('express');
const exphbs = require('express-handlebars');
const busboy = require('connect-busboy');
const path = require('path');
const fs = require('fs-extra');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const stream = require('stream');
const fetch = require('node-fetch');
const bytes = require('bytes');
const conf = require('./config.js');
const storage = require('./storage.js');

let notLocalHost =
  conf.env === 'production' &&
  conf.s3_bucket !== 'localhost' &&
  conf.bitly_key !== 'localhost';

const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(busboy());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/download/:id', (req, res) => {
  let id = req.params.id;
  storage.filename(id).then(filename => {
    storage
      .length(id)
      .then(contentLength => {
        res.render('download', {
          filename: filename,
          filesize: bytes(contentLength)
        });
      })
      .catch(() => {
        res.render('download');
      });
  });
});

app.get('/assets/download/:id', (req, res) => {
  let id = req.params.id;
  if (!validateID(id)) {
    res.sendStatus(404);
    return;
  }

  storage
    .filename(id)
    .then(reply => {
      storage.length(id).then(contentLength => {
        res.writeHead(200, {
          'Content-Disposition': 'attachment; filename=' + reply,
          'Content-Type': 'application/octet-stream',
          'Content-Length': contentLength
        });
      });

      let file_stream = storage.get(id);

      file_stream.on(notLocalHost ? 'finish' : 'close', () => {
        storage.forceDelete(id).then(err => {
          if (!err) {
            console.log('Deleted.');
          }
        });
      });

      file_stream.pipe(res);
    })
    .catch(err => {
      res.sendStatus(404);
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
    .delete(id, delete_token)
    .then(err => {
      if (!err) {
        console.log('Deleted.');
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

    storage.set(req.params.id, file, filename, url).then(linkAndID => {
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
