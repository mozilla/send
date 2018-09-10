const fs = require('fs');
const path = require('path');
const assets = require('../../common/assets');
const locales = require('../../common/locales');
const routes = require('../routes');
const pages = require('../routes/pages');
const tests = require('../../test/frontend/routes');
const express = require('express');
const expressWs = require('express-ws');
const morgan = require('morgan');
const config = require('../config');

const ID_REGEX = '([0-9a-fA-F]{10})';

const androidIndex = fs.readFileSync(
  path.resolve(__dirname, '../../android/app/src/main/assets/index.html'),
  'utf8'
);

function android(req, res) {
  res.set('Content-Type', 'text/html');
  res.send(
    androidIndex
      .replace('index.css', '/android_asset/index.css')
      .replace('vendor.js', assets.get('vendor.js'))
      .replace('android.js', assets.get('android.js'))
  );
}

module.exports = function(app, devServer) {
  const wsapp = express();
  expressWs(wsapp, null, { perMessageDeflate: false });
  wsapp.ws('/api/ws', require('../routes/ws'));
  wsapp.listen(8081, config.listen_address);

  assets.setMiddleware(devServer.middleware);
  locales.setMiddleware(devServer.middleware);
  app.use(morgan('dev', { stream: process.stderr }));
  if (process.env.ANDROID) {
    // map all html routes to the android index.html
    app.get('/', android);
    app.get('/legal', android);
    app.get(`/share/:id${ID_REGEX}`, android);
    app.get(`/download/:id${ID_REGEX}`, android);
    app.get('/completed', android);
    app.get('/preferences', android);
    app.get('/api/fxa/oauth', android);
  }
  routes(app);
  tests(app);
  // webpack-dev-server routes haven't been added yet
  // so wait for next tick to add 404 handler
  process.nextTick(() => app.use(pages.notfound));
};
