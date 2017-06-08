const conf = require('./config.js');

let notLocalHost =
  conf.env === 'production' &&
  conf.s3_bucket !== 'localhost' &&
  conf.bitly_key !== 'localhost';

const mozlog = require('mozlog') ({
  app: 'FirefoxFileshare',
  level: notLocalHost ? 'INFO' : 'verbose',
  fmt: notLocalHost ? 'heka' : 'pretty',
  debug: !notLocalHost
})

module.exports = mozlog;