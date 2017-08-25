const express = require('express');
const path = require('path');
const Raven = require('raven');
const config = require('./config');
const routes = require('./routes');
const pages = require('./routes/pages');

if (config.sentry_dsn) {
  Raven.config(config.sentry_dsn).install();
}

const app = express();

app.use(
  express.static(path.resolve(__dirname, '../dist/'), {
    setHeaders: function(res) {
      res.set('Cache-Control', 'public, max-age=31536000, immutable');
    }
  })
);

routes(app);

app.use(pages.notfound);

app.listen(1443);
