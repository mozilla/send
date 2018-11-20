const html = require('choo/html');
const assets = require('../../common/assets');
const initScript = require('../../server/initScript');

module.exports = function(app) {
  app.get('/mocha.css', function(req, res) {
    res.sendFile(require.resolve('mocha/mocha.css'));
  });
  app.get('/mocha.js', function(req, res) {
    res.sendFile(require.resolve('mocha/mocha.js'));
  });
  app.get('/test', function(req, res) {
    res.send(
      html`
        <!DOCTYPE html>
        <html>
          <head>
            <link rel="stylesheet" type="text/css" href="/mocha.css" />
            <script src="/mocha.js"></script>
            <script>
              const reporters = mocha.constructor.reporters;
              function Combo(runner) {
                reporters.HTML.call(this, runner);
                reporters.JSON.call(this, runner);
              }
              Object.setPrototypeOf(Combo.prototype, reporters.HTML.prototype);
              mocha.setup({
                ui: 'bdd',
                reporter: Combo,
                timeout: 5000
              });
            </script>
            ${
              initScript({
                cspNonce: 'test',
                locale: 'en-US'
              })
            }
            <script src="${assets.get('cryptofill.js')}"></script>
            <script src="${assets.get('tests.js')}"></script>
          </head>
          <body>
            <div id="mocha"></div>
            <script>
              window.runner = mocha.run();
            </script>
          </body>
        </html>
      `.toString()
    );
  });
};
