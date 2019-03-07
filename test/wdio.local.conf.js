// eslint-disable-next-line node/no-extraneous-require
const ip = require('ip');
const common = require('./wdio.common.conf');

/*/

Config for running selenium against localhost

/*/

exports.config = Object.assign({}, common.config, {
  baseUrl: `http://${ip.address()}:8000`,
  maxInstances: 1,
  bail: 1,
  services: [require('./testServer')]
});
