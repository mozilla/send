const common = require('./wdio.common.conf');
const path = require('path');

/*/

Config for running saucelabs against localhost

/*/

exports.config = Object.assign({}, common.config, {
  maxInstances: 2,
  capabilities: [
    { browserName: 'firefox' },
    { browserName: 'chrome' },
    { browserName: 'MicrosoftEdge' },
    {
      browserName: 'safari',
      exclude: [
        // The safari driver doesn't support file uploads
        // via input elements, but unit-tests.js covers
        // the lower level uploading
        path.join(__dirname, './ui/upload-tests.js')
      ]
    }
  ],
  services: ['sauce', require('./testServer')],
  sauceConnect: true,
  sauceConnectOpts: {
    // uncomment to debug
    // logfile: __dirname + '/sc.log',
    // verbose: true
  },
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY
});
