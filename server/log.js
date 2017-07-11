const conf = require('./config.js');

const isProduction = conf.env === 'production';

const mozlog = require('mozlog')({
  app: 'FirefoxSend',
  level: isProduction ? 'INFO' : 'verbose',
  fmt: isProduction ? 'heka' : 'pretty',
  debug: !isProduction
});

module.exports = mozlog;
