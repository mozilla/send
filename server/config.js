const convict = require('convict');
let api_key = 'INSERT API KEY HERE';

let conf = convict({
  aws_credentials: {
    region: 'us-west-2',
    bucketName: 'testpilot-p2p'
  },
  bitly_credentials: {
    api_key: api_key
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
