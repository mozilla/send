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
      const ID_REGEX = '([0-9a-fA-F]{10})';

      app.use(wpm);

      function android(req, res) {
        const index = wpm.fileSystem
          .readFileSync(wpm.getFilenameFromUrl('/android.html'))
          .toString()
          .replace(
            '<base href="file:///android_asset/" />',
            '<base href="http://localhost:8000/" />'
          );
        res.set('Content-Type', 'text/html');
        res.send(index);
      }
      if (process.env.ANDROID) {
        // map all html routes to the android index.html
        app.get('/', android);
        app.get('/legal', android);
        app.get(`/share/:id${ID_REGEX}`, android);
        app.get('/completed', android);
        app.get('/preferences', android);
        app.get('/options', android);
        app.get('/oauth', android);
      }

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
