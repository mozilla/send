let server = null;

module.exports = {
  onPrepare: function() {
    return new Promise(function(resolve) {
      const webpack = require('webpack');
      const middleware = require('webpack-dev-middleware');
      const express = require('express');
      const devRoutes = require('../server/dev');
      const app = express();
      const config = require('../webpack.config');
      const wpm = middleware(webpack(config), { logLevel: 'silent' });
      app.use(wpm);
      devRoutes(app, { middleware: wpm });
      wpm.waitUntilValid(() => {
        server = app.listen(8081, resolve);
      });
    });
  },
  onComplete: function() {
    server.close();
  }
};
