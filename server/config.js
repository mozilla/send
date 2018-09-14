const convict = require('convict');
const { tmpdir } = require('os');
const path = require('path');
const { randomBytes } = require('crypto');

const conf = convict({
  s3_bucket: {
    format: String,
    default: '',
    env: 'S3_BUCKET'
  },
  num_of_prefixes: {
    format: Number,
    default: 5,
    env: 'NUM_OF_PREFIXES'
  },
  expire_prefixes: {
    format: Array,
    default: ['5minutes', '1hour', '1day', '1week', '2weeks'],
    env: 'EXPIRE_PREFIXES'
  },
  expire_times_seconds: {
    format: Array,
    default: [300, 3600, 86400, 604800],
    env: 'EXPIRE_TIMES_SECONDS'
  },
  default_expire_seconds: {
    format: Number,
    default: 86400,
    env: 'DEFAULT_EXPIRE_SECONDS'
  },
  max_expire_seconds: {
    format: Number,
    default: 86400 * 7,
    env: 'MAX_EXPIRE_SECONDS'
  },
  anon_max_expire_seconds: {
    format: Number,
    default: 86400,
    env: 'ANON_MAX_EXPIRE_SECONDS'
  },
  max_downloads: {
    format: Number,
    default: 200,
    env: 'MAX_DOWNLOADS'
  },
  anon_max_downloads: {
    format: Number,
    default: 20,
    env: 'ANON_MAX_DOWNLOADS'
  },
  max_files_per_archive: {
    format: Number,
    default: 64,
    env: 'MAX_FILES_PER_ARCHIVE'
  },
  max_archives_per_user: {
    format: Number,
    default: 16,
    env: 'MAX_ARCHIVES_PER_USER'
  },
  redis_host: {
    format: String,
    default: 'localhost',
    env: 'REDIS_HOST'
  },
  redis_event_expire: {
    format: Boolean,
    default: false,
    env: 'REDIS_EVENT_EXPIRE'
  },
  listen_address: {
    format: 'ipaddress',
    default: '0.0.0.0',
    env: 'IP_ADDRESS'
  },
  listen_port: {
    format: 'port',
    default: 1443,
    arg: 'port',
    env: 'PORT'
  },
  analytics_id: {
    format: String,
    default: '',
    env: 'GOOGLE_ANALYTICS_ID'
  },
  sentry_id: {
    format: String,
    default: '',
    env: 'SENTRY_CLIENT'
  },
  sentry_dsn: {
    format: String,
    default: '',
    env: 'SENTRY_DSN'
  },
  env: {
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  max_file_size: {
    format: Number,
    default: 1024 * 1024 * 1024 * 4,
    env: 'MAX_FILE_SIZE'
  },
  anon_max_file_size: {
    format: Number,
    default: 1024 * 1024 * 500,
    env: 'ANON_MAX_FILE_SIZE'
  },
  l10n_dev: {
    format: Boolean,
    default: false,
    env: 'L10N_DEV'
  },
  base_url: {
    format: 'url',
    default: 'https://send.firefox.com',
    env: 'BASE_URL'
  },
  file_dir: {
    format: 'String',
    default: `${tmpdir()}${path.sep}send-${randomBytes(4).toString('hex')}`,
    env: 'FILE_DIR'
  },
  fxa_url: {
    format: 'url',
    default: 'https://stable.dev.lcip.org',
    env: 'FXA_URL'
  },
  fxa_client_id: {
    format: String,
    default: 'b50ec33d3c9beb6d', // localhost
    env: 'FXA_CLIENT_ID'
  }
});

// Perform validation
conf.validate({ allowed: 'strict' });

const props = conf.getProperties();
module.exports = props;
