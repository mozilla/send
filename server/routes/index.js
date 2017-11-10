const busboy = require('connect-busboy');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const languages = require('../languages');
const storage = require('../storage');
const config = require('../config');
const pages = require('./pages');
const { negotiateLanguages } = require('fluent-langneg');
const IS_DEV = config.env === 'development';
const acceptLanguages = /(([a-zA-Z]+(-[a-zA-Z0-9]+){0,2})|\*)(;q=[0-1](\.[0-9]+)?)?/g;
const langData = require('cldr-core/supplemental/likelySubtags.json');

module.exports = function(app) {
  app.use(function(req, res, next) {
    const header = req.headers['accept-language'] || 'en-US';
    if (header.length > 255) {
      req.language = 'en-US';
      return next();
    }
    const langs = header.replace(/\s/g, '').match(acceptLanguages);
    const preferred = langs
      .map(l => {
        const parts = l.split(';');
        return {
          locale: parts[0],
          q: parts[1] ? parseFloat(parts[1].split('=')[1]) : 1
        };
      })
      .sort((a, b) => b.q - a.q)
      .map(x => x.locale);
    req.language = negotiateLanguages(preferred, languages, {
      strategy: 'lookup',
      likelySubtags: langData.supplemental.likelySubtags,
      defaultLocale: 'en-US'
    })[0];
    next();
  });
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
  app.use(
    busboy({
      limits: {
        fileSize: config.max_file_size
      }
    })
  );
  app.use(function(req, res, next) {
    res.set('Pragma', 'no-cache');
    res.set('Cache-Control', 'no-cache');
    next();
  });
  app.use(bodyParser.json());
  app.get('/', pages.index);
  app.get('/legal', pages.legal);
  app.get('/jsconfig.js', require('./jsconfig'));
  app.get('/share/:id', pages.blank);
  app.get('/download/:id', pages.download);
  app.get('/completed', pages.blank);
  app.get('/unsupported/:reason', pages.unsupported);
  app.get('/api/download/:id', require('./download'));
  app.get('/api/exists/:id', require('./exists'));
  app.get('/api/metadata/:id', require('./metadata'));
  app.post('/api/upload', require('./upload'));
  app.post('/api/delete/:id', require('./delete'));
  app.post('/api/password/:id', require('./password'));

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
