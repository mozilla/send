const assets = require('../common/assets');
const locales = require('../common/locales');
const routes = require('./routes');
const pages = require('./routes/pages');
const tests = require('../test/frontend/routes');
const express = require('express');
const expressWs = require('express-ws');
const config = require('./config');

const wsapp = express();
expressWs(wsapp, null, { perMessageDeflate: false });
wsapp.ws('/api/ws', require('./routes/ws'));
wsapp.listen(8081, config.listen_address);

module.exports = function(app, devServer) {
  assets.setMiddleware(devServer.middleware);
  locales.setMiddleware(devServer.middleware);
  routes(app);
  tests(app);
  // webpack-dev-server routes haven't been added yet
  // so wait for next tick to add 404 handler
  process.nextTick(() => app.use(pages.notfound));
};
