const convict = require('convict');

const conf = convict({
  s3_bucket: {
    format: String,
    default: 'localhost',
    env: 'P2P_S3_BUCKET'
  },
  redis_host: {
    format: String,
    default: 'localhost',
    env: 'P2P_REDIS_HOST'
  },
  listen_port: {
    format: 'port',
    default: 1443,
    arg: 'port',
    env: 'PORT'
  },
  analytics_id: {
    format: String,
    default: 'UA-101393094-1',
    env: 'GOOGLE_ANALYTICS_ID'
  },
  sentry_id: {
    format: String,
    default: 'https://cdf9a4f43a584f759586af8ceb2194f2@sentry.prod.mozaws.net/238',
    env: 'P2P_SENTRY_CLIENT'
  },
  sentry_dsn: {
    format: String,
    default: 'localhost',
    env: 'P2P_SENTRY_DSN'
  },
  env: {
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  }
});

// Perform validation
conf.validate({ allowed: 'strict' });

const props = conf.getProperties();
module.exports = props;

module.exports.notLocalHost =
  props.env === 'production' &&
  props.s3_bucket !== 'localhost' &&
  props.sentry_dsn !== 'localhost';
