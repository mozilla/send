// eslint-disable-next-line node/no-extraneous-require
const ip = require('ip');
const path = require('path');
const common = require('./wdio.common.conf');

/*/

Config for running selenium from a circleci docker container against localhost

/*/

exports.config = Object.assign({}, common.config, {
  baseUrl: `http://${ip.address()}:8000`,
  exclude: [path.join(__dirname, './integration/download-tests.js')],
  maxInstances: 1,
  bail: 1,
  services: [require('./testServer')]
});
