const conf = require('./config.js');

let notLocalHost = conf.notLocalHost;

const mozlog = require('mozlog') ({
  app: 'FirefoxFileshare',
  level: notLocalHost ? 'INFO' : 'verbose',
  fmt: notLocalHost ? 'heka' : 'pretty',
  debug: !notLocalHost
})

module.exports = mozlog;