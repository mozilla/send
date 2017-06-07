const convict = require('convict');

let conf = convict({
  bitly_key: {
    format: String,
    default: 'localhost',
    env: 'P2P_BITLY_KEY'
  },
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
    env: 'P2P_LISTEN_PORT'
  },
  env: {
    format: ['production', 'development'],
    default: 'development',
    env: 'NODE_ENV'
  }
});

// Perform validation
conf.validate({ allowed: 'strict' });

module.exports = conf.getProperties();
