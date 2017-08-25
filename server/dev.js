const assets = require('../common/assets');
const locales = require('../common/locales');
const routes = require('./routes');
const pages = require('./routes/pages');

module.exports = function(app, devServer) {
  assets.setMiddleware(devServer.middleware);
  locales.setMiddleware(devServer.middleware);
  routes(app);
  // webpack-dev-server routes haven't been added yet
  // so wait for next tick to add 404 handler
  process.nextTick(() => app.use(pages.notfound));
};
