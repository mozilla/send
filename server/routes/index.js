const express = require('express');
const busboy = require('connect-busboy');
const helmet = require('helmet');
const storage = require('../storage');
const config = require('../config');
const auth = require('../middleware/auth');
const owner = require('../middleware/owner');
const language = require('../middleware/language');
const pages = require('./pages');

const IS_DEV = config.env === 'development';
const ID_REGEX = '([0-9a-fA-F]{10})';
const uploader = busboy({
  limits: {
    fileSize: config.max_file_size
  }
});

module.exports = function(app) {
  app.use(helmet());
  app.use(
    helmet.hsts({
      maxAge: 31536000,
      force: !IS_DEV
    })
  );
  if (!IS_DEV) {
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
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            'https://code.cdn.mozilla.net'
          ],
          fontSrc: ["'self'", 'https://code.cdn.mozilla.net'],
          formAction: ["'none'"],
          frameAncestors: ["'none'"],
          objectSrc: ["'none'"],
          reportUri: '/__cspreport__'
        }
      })
    );
  }
  app.use(function(req, res, next) {
    res.set('Pragma', 'no-cache');
    res.set('Cache-Control', 'no-cache');
    next();
  });
  app.use(express.json());
  app.get('/', language, pages.index);
  app.get('/legal', language, pages.legal);
  app.get('/jsconfig.js', require('./jsconfig'));
  app.get(`/share/:id${ID_REGEX}`, language, pages.blank);
  app.get(`/download/:id${ID_REGEX}`, language, pages.download);
  app.get('/completed', language, pages.blank);
  app.get('/unsupported/:reason', language, pages.unsupported);
  app.get(`/api/download/:id${ID_REGEX}`, auth, require('./download'));
  app.get(`/api/exists/:id${ID_REGEX}`, require('./exists'));
  app.get(`/api/metadata/:id${ID_REGEX}`, auth, require('./metadata'));
  app.post('/api/upload', uploader, require('./upload'));
  app.post(`/api/delete/:id${ID_REGEX}`, owner, require('./delete'));
  app.post(`/api/password/:id${ID_REGEX}`, owner, require('./password'));
  app.post(`/api/params/:id${ID_REGEX}`, owner, require('./params'));
  app.post(`/api/info/:id${ID_REGEX}`, owner, require('./info'));

  app.get('/__version__', function(req, res) {
    res.sendFile(require.resolve('../../dist/version.json'));
  });

  app.get('/__lbheartbeat__', function(req, res) {
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
};
