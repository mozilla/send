const common = require('./wdio.common.conf');
const path = require('path');

/*/

Config for running saucelabs against a hosted server

/*/

exports.config = Object.assign({}, common.config, {
  baseUrl: process.env.TEST_SERVER || 'https://send.dev.mozaws.net',
  exclude: [
    // the /test endpoint only exists on localhost
    path.join(__dirname, './ui/unit-tests.js')
  ],
  capabilities: [
    { browserName: 'firefox' },
    { browserName: 'chrome' },
    { browserName: 'MicrosoftEdge' },
    {
      browserName: 'safari',
      exclude: [path.join(__dirname, './ui/upload-tests.js')]
    }
  ],
  services: ['sauce'],
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY
});
