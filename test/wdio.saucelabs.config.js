const common = require('./wdio.common.conf');
const path = require('path');

/*/

Config for running saucelabs against localhost

/*/

exports.config = Object.assign({}, common.config, {
  maxInstances: 2,
  exclude: [path.join(__dirname, './integration/download-tests.js')],
  capabilities: [
    { browserName: 'firefox' },
    { browserName: 'chrome' },
    { browserName: 'MicrosoftEdge' },
    {
      browserName: 'safari'
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
