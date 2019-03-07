const common = require('./wdio.common.conf');
const path = require('path');

/*/

Config for running saucelabs against a hosted server

/*/

exports.config = Object.assign({}, common.config, {
  baseUrl: process.env.TEST_SERVER || 'https://send.dev.mozaws.net',
  exclude: [
    // the /test endpoint only exists on localhost
    path.join(__dirname, './integration/unit-tests.js'),
    // we don't have access to the fs in this context
    path.join(__dirname, './integration/download-tests.js')
  ],
  capabilities: [
    { browserName: 'firefox' },
    { browserName: 'chrome' },
    { browserName: 'MicrosoftEdge' },
    {
      browserName: 'safari'
    }
  ],
  services: ['sauce'],
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY
});
