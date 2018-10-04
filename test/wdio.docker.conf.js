// eslint-disable-next-line node/no-extraneous-require
const ip = require('ip');
const common = require('./wdio.common.conf');
const dir =
  common.config.capabilities[0]['moz:firefoxOptions'].prefs[
    'browser.download.dir'
  ];

/*/

Config for running selenium in a new docker container against localhost

/*/

exports.config = Object.assign({}, common.config, {
  baseUrl: `http://${ip.address()}:8000`,
  maxInstances: 1,
  services: ['docker', require('./testServer')],
  dockerOptions: {
    image: 'selenium/standalone-firefox',
    healthCheck: 'http://localhost:4444',
    options: {
      p: ['4444:4444'],
      mount: `type=bind,source=${dir},destination=${dir},consistency=delegated`,
      shmSize: '2g'
    }
  }
});
