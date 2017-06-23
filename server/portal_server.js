const express = require('express');
const exphbs = require('express-handlebars');
const busboy = require('connect-busboy');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const bytes = require('bytes');
const conf = require('./config.js');
const storage = require('./storage.js');
const Raven = require('raven');

const notLocalHost = conf.notLocalHost;

if (notLocalHost) {
  Raven.config(conf.sentry_dsn).install();
}

const mozlog = require('./log.js');

const log = mozlog('portal.server');

const app = express();

app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    partialsDir: 'views/partials/'
  })
);
app.set('view engine', 'handlebars');

app.use(helmet());
app.use(busboy());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.render('index', {
    shouldRenderAnalytics: notLocalHost,
    trackerId: conf.analytics_id,
    dsn: conf.sentry_id
  });
});

app.get('/exists/:id', (req, res) => {
  const id = req.params.id;
  storage.exists(id).then(() => {
    res.sendStatus(200);
  }).catch(err => res.sendStatus(404));
});

app.get('/download/:id', (req, res) => {
  const id = req.params.id;
  storage.filename(id).then(filename => {
    storage
      .length(id)
      .then(contentLength => {
        res.render('download', {
          filename: filename,
          filesize: bytes(contentLength),
          shouldRenderAnalytics: notLocalHost,
          trackerId: conf.analytics_id,
          dsn: conf.sentry_id
        });
      })
      .catch(() => {
        res.render('download');
      });
  });
});

app.get('/assets/download/:id', (req, res) => {
  const id = req.params.id;
  if (!validateID(id)) {
    res.sendStatus(404);
    return;
  }

  Promise.all([
    storage.filename(id),
    storage.getField(id, 'checksum')
    ])
    .then(([reply, checksum]) => {
      storage.length(id).then(contentLength => {
        res.writeHead(200, {
          'Content-Disposition': 'attachment; filename=' + reply,
          'Content-Type': 'application/octet-stream',
          'Content-Length': contentLength,
          'Checksum': checksum
        });
        const file_stream = storage.get(id);

        file_stream.on(notLocalHost ? 'finish' : 'close', () => {
          storage
            .forceDelete(id)
            .then(err => {
              if (!err) {
                log.info('Deleted:', id);
              }
            })
            .catch(err => {
              log.info('DeleteError:', id);
            });
        });

        file_stream.pipe(res);
      });
    })
    .catch(err => {
      res.sendStatus(404);
    });
});

app.post('/delete/:id', (req, res) => {
  const id = req.params.id;

  if (!validateID(id)) {
    res.sendStatus(404);
    return;
  }

  const delete_token = req.body.delete_token;

  if (!delete_token) {
    res.sendStatus(404);
  }

  storage
    .delete(id, delete_token)
    .then(err => {
      if (!err) {
        log.info('Deleted:', id);
        res.sendStatus(200);
      }
    })
    .catch(err => res.sendStatus(404));
});

app.post('/upload/:id', (req, res, next) => {
  if (!validateID(req.params.id)) {
    res.sendStatus(404);
    return;
  }

  req.pipe(req.busboy);
  
  req.busboy.on('field', (fieldname, value) => {
    storage.setField(req.params.id, fieldname, value);
  })

  req.busboy.on('file', (fieldname, file, filename) => {
    log.info('Uploading:', req.params.id);

    const protocol = notLocalHost ? 'https' : req.protocol;
    const url = `${protocol}://${req.get('host')}/download/${req.params.id}/`;

    storage.set(req.params.id, file, filename, url).then(linkAndID => {
      res.json(linkAndID);
    });
  });
});

app.get('/__lbheartbeat__', (req, res) => {
  res.sendStatus(200);
});

app.get('/__heartbeat__', (req, res) => {
  storage.ping().then(() => res.sendStatus(200), () => res.sendStatus(500));
});

app.listen(conf.listen_port, () => {
  log.info('startServer:', `Portal app listening on port ${conf.listen_port}!`);
});

const validateID = route_id => {
  return route_id.match(/^[0-9a-fA-F]{32}$/) !== null;
};
