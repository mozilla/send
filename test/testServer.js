let server = null;

module.exports = {
  onPrepare: function() {
    return new Promise(function(resolve) {
      const webpack = require('webpack');
      const middleware = require('webpack-dev-middleware');
      const express = require('express');
      const expressWs = require('express-ws');
      const assets = require('../common/assets');
      const routes = require('../server/routes');
      const tests = require('./frontend/routes');
      const app = express();
      const config = require('../webpack.config');
      const wpm = middleware(webpack(config(null, { mode: 'development' })), {
        logLevel: 'silent'
      });
      app.use(wpm);
      assets.setMiddleware(wpm);
      expressWs(app, null, { perMessageDeflate: false });
      app.ws('/api/ws', require('../server/routes/ws'));
      routes(app);
      tests(app);
      wpm.waitUntilValid(() => {
        server = app.listen(8000, resolve);
      });
    });
  },
  onComplete: function() {
    server.close();
  }
};
