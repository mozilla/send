const crypto = require('crypto');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const uaparser = require('ua-parser-js');
const storage = require('../storage');
const config = require('../config');
const auth = require('../middleware/auth');
const language = require('../middleware/language');
const pages = require('./pages');
const filelist = require('./filelist');

const IS_DEV = config.env === 'development';
const ID_REGEX = '([0-9a-fA-F]{10})';

module.exports = function(app) {
  app.set('trust proxy', true);
  app.use(helmet());
  app.use(
    helmet.hsts({
      maxAge: 31536000,
      force: !IS_DEV
    })
  );
  app.use(function(req, res, next) {
    req.ua = uaparser(req.header('user-agent'));
    next();
  });
  app.use(function(req, res, next) {
    req.cspNonce = crypto.randomBytes(16).toString('hex');
    next();
  });
  if (!IS_DEV) {
    app.use(
      helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: ["'self'"],
          connectSrc: [
            "'self'",
            'wss://*.dev.lcip.org',
            'wss://*.mozaws.net',
            'wss://send.firefox.com',
            'https://*.dev.lcip.org',
            'https://*.accounts.firefox.com',
            'https://sentry.prod.mozaws.net'
          ],
          imgSrc: [
            "'self'",
            'https://*.dev.lcip.org',
            'https://firefoxusercontent.com'
          ],
          scriptSrc: [
            "'self'",
            function(req) {
              return `'nonce-${req.cspNonce}'`;
            }
          ],
          styleSrc: ["'self'", 'https://code.cdn.mozilla.net'],
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
  app.use(bodyParser.json());
  app.use(bodyParser.text());
  app.get('/', language, pages.index);
  app.get('/oauth', language, pages.blank);
  app.get('/legal', language, pages.legal);
  app.get('/app.webmanifest', language, require('./webmanifest'));
  app.get(`/download/:id${ID_REGEX}`, language, pages.download);
  app.get('/unsupported/:reason', language, pages.unsupported);
  app.get(`/api/download/:id${ID_REGEX}`, auth.hmac, require('./download'));
  app.get(
    `/api/download/blob/:id${ID_REGEX}`,
    auth.hmac,
    require('./download')
  );
  app.get(`/api/exists/:id${ID_REGEX}`, require('./exists'));
  app.get(`/api/metadata/:id${ID_REGEX}`, auth.hmac, require('./metadata'));
  app.get('/api/filelist', auth.fxa, filelist.get);
  app.post('/api/filelist', auth.fxa, filelist.post);
  app.post('/api/upload', auth.fxa, require('./upload'));
  app.post(`/api/delete/:id${ID_REGEX}`, auth.owner, require('./delete'));
  app.post(`/api/password/:id${ID_REGEX}`, auth.owner, require('./password'));
  app.post(
    `/api/params/:id${ID_REGEX}`,
    auth.owner,
    auth.fxa,
    require('./params')
  );
  app.post(`/api/info/:id${ID_REGEX}`, auth.owner, require('./info'));
  app.post('/api/metrics', require('./metrics'));
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
