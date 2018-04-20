const ip = require('ip');
const common = require('./wdio.common.conf');

/*/

Config for running selenium in a new docker container against localhost

/*/

exports.config = Object.assign({}, common.config, {
  baseUrl: `http://${ip.address()}:8081`,
  maxInstances: 1,
  services: ['docker', require('./testServer')],
  dockerOptions: {
    image: 'selenium/standalone-firefox',
    healthCheck: 'http://localhost:4444',
    options: {
      p: ['4444:4444'],
      shmSize: '2g'
    }
  }
});
