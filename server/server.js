const express = require('express');
const exphbs = require('express-handlebars');
const busboy = require('connect-busboy');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const conf = require('./config.js');
const storage = require('./storage.js');
const Raven = require('raven');
const crypto = require('crypto');
const fs = require('fs');
const version = require('../public/version.json');

if (conf.sentry_dsn) {
  Raven.config(conf.sentry_dsn).install();
}

const mozlog = require('./log.js');

const log = mozlog('send.server');

const STATIC_PATH = path.join(__dirname, '../public');

const app = express();

function allLangs() {
  return fs
    .readdirSync(path.join(STATIC_PATH, 'locales'))
    .map(function(f) {
      return f.split('.')[0];
    })
    .join(',');
}

function prodLangs() {
  return require('../package.json').availableLanguages.join(',');
}

const availableLanguages = conf.l10n_dev ? allLangs() : prodLangs();

if (conf.env === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const config = require('../webpack.config.js');
  config.devtool = 'inline-source-map';
  const compiler = webpack(config);
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath
    })
  );
}

app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    partialsDir: 'views/partials/',
    helpers: {
      availableLanguages,
      l10nDev: conf.l10n_dev,
      baseUrl: conf.base_url,
      title: 'Firefox Send',
      description: 'Encrypt and send files with a link that automatically expires to ensure your important documents don’t stay online forever.'
    }
  })
);
app.set('view engine', 'handlebars');

app.use(helmet());
app.use(
  helmet.hsts({
    maxAge: 31536000,
    force: conf.env === 'production'
  })
);
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: [
        "'self'",
        'https://sentry.prod.mozaws.net',
        'https://www.google-analytics.com'
      ],
      imgSrc: ["'self'", 'https://www.google-analytics.com'],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", 'https://code.cdn.mozilla.net'],
      fontSrc: ["'self'", 'https://code.cdn.mozilla.net'],
      formAction: ["'none'"],
      frameAncestors: ["'none'"],
      objectSrc: ["'none'"],
      reportUri: '/__cspreport__'
    }
  })
);
app.use(
  busboy({
    limits: {
      fileSize: conf.max_file_size
    }
  })
);
app.use(bodyParser.json());
app.use(express.static(STATIC_PATH));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/unsupported/:reason', (req, res) => {
  const outdated = req.params.reason === 'outdated';
  res.render('unsupported', {
    outdated,
    fira: true
  });
});

app.get('/legal', (req, res) => {
  res.render('legal');
});

app.get('/jsconfig.js', (req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.render('jsconfig', {
    googleAnalyticsId: conf.analytics_id,
    sentryId: conf.sentry_id,
    version: version.version,
    commit: version.commit,
    maxFileSize: conf.max_file_size,
    expireSeconds: conf.expire_seconds,
    layout: false
  });
});

app.get('/exists/:id', async (req, res) => {
  const id = req.params.id;
  if (!validateID(id)) {
    res.sendStatus(404);
    return;
  }

  try {
    await storage.exists(id);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(404);
  }
});

app.get('/download/:id', async (req, res) => {
  const id = req.params.id;
  if (!validateID(id)) {
    res.status(404).render('notfound');
    return;
  }

  try {
    const efilename = await storage.filename(id);
    const filename = decodeURIComponent(efilename);
    const filenameJson = JSON.stringify({ filename });
    const sizeInBytes = await storage.length(id);
    const ttl = await storage.ttl(id);
    res.render('download', {
      filename,
      filenameJson,
      sizeInBytes,
      ttl
    });
  } catch (e) {
    res.status(404).render('notfound');
  }
});

app.get('/assets/download/:id', async (req, res) => {
  const id = req.params.id;
  if (!validateID(id)) {
    res.sendStatus(404);
    return;
  }

  try {
    const meta = await storage.metadata(id);
    const contentLength = await storage.length(id);
    res.writeHead(200, {
      'Content-Disposition': `attachment; filename=${meta.filename}`,
      'Content-Type': meta.mimeType,
      'Content-Length': contentLength,
      'X-File-Metadata': JSON.stringify(meta)
    });
    const file_stream = storage.get(id);

    file_stream.on('end', async () => {
      try {
        await storage.forceDelete(id);
      } catch (e) {
        log.info('DeleteError:', id);
      }
    });

    file_stream.pipe(res);
  } catch (e) {
    res.sendStatus(404);
  }
});

app.post('/delete/:id', async (req, res) => {
  const id = req.params.id;

  if (!validateID(id)) {
    res.sendStatus(404);
    return;
  }

  const delete_token = req.body.delete_token;

  if (!delete_token) {
    res.sendStatus(404);
    return;
  }

  try {
    const err = await storage.delete(id, delete_token);
    if (!err) {
      res.sendStatus(200);
    }
  } catch (e) {
    res.sendStatus(404);
  }
});

app.post('/upload', (req, res, next) => {
  const newId = crypto.randomBytes(5).toString('hex');
  let meta;

  try {
    meta = JSON.parse(req.header('X-File-Metadata'));
  } catch (e) {
    res.sendStatus(400);
    return;
  }

  if (
    !meta.hasOwnProperty('id') ||
    !meta.hasOwnProperty('filename') ||
    !validateIV(meta.id)
  ) {
    res.sendStatus(404);
    return;
  }

  meta.delete = crypto.randomBytes(10).toString('hex');
  req.pipe(req.busboy);

  req.busboy.on(
    'file',
    async (fieldname, file, filename, encoding, mimeType) => {
      try {
        meta.mimeType = mimeType || 'application/octet-stream';
        await storage.set(newId, file, filename, meta);
        const protocol = conf.env === 'production' ? 'https' : req.protocol;
        const url = `${protocol}://${req.get('host')}/download/${newId}/`;
        res.json({
          url,
          delete: meta.delete,
          id: newId
        });
      } catch (e) {
        if (e.message === 'limit') {
          return res.sendStatus(413);
        }
        res.sendStatus(500);
      }
    }
  );

  req.on('close', async err => {
    try {
      await storage.forceDelete(newId);
    } catch (e) {
      log.info('DeleteError:', newId);
    }
  });
});

app.get('/__lbheartbeat__', (req, res) => {
  res.sendStatus(200);
});

app.get('/__heartbeat__', async (req, res) => {
  try {
    await storage.ping();
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

app.get('/__version__', (req, res) => {
  res.sendFile(path.join(STATIC_PATH, 'version.json'));
});

const server = app.listen(conf.listen_port, () => {
  log.info('startServer:', `Send app listening on port ${conf.listen_port}!`);
});

const validateID = route_id => {
  return route_id.match(/^[0-9a-fA-F]{10}$/) !== null;
};

const validateIV = route_id => {
  return route_id.match(/^[0-9a-fA-F]{24}$/) !== null;
};

module.exports = {
  server: server,
  storage: storage
};
