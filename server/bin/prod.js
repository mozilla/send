const express = require('express');
const path = require('path');
const Raven = require('raven');
const config = require('../config');
const routes = require('../routes');
const pages = require('../routes/pages');
const expressWs = require('express-ws');

if (config.sentry_dsn) {
  Raven.config(config.sentry_dsn).install();
}

const app = express();

expressWs(app, null, { perMessageDeflate: false });
app.ws('/api/ws', require('../routes/ws'));
routes(app);

app.use(
  express.static(path.resolve(__dirname, '../../dist/'), {
    setHeaders: function(res) {
      res.set('Cache-Control', 'public, max-age=31536000, immutable');
      res.removeHeader('Pragma');
    }
  })
);

app.use(pages.notfound);

app.listen(config.listen_port, config.listen_address);
