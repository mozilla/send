const config = require('../config');
const { getFxaConfig } = require('../fxa');

let sentry = '';
if (config.sentry_id) {
  //eslint-disable-next-line node/no-missing-require
  const version = require('../../dist/version.json');
  sentry = `
var RAVEN_CONFIG = {
  release: '${version.version}',
  tags: {
    commit: '${version.commit}'
  },
  dataCallback: function (data) {
    var hash = window.location.hash;
    if (hash) {
      return JSON.parse(JSON.stringify(data).replace(new RegExp(hash.slice(1), 'g'), ''));
    }
    return data;
  }
}
var SENTRY_ID = '${config.sentry_id}';
`;
}

let ga = '';
if (config.analytics_id) {
  ga = `var GOOGLE_ANALYTICS_ID = '${config.analytics_id}';`;
}

module.exports = async function(req, res) {
  let authConfig = '';
  if (config.fxa_client_id) {
    const fxaConfig = await getFxaConfig();
    fxaConfig.client_id = config.fxa_client_id;
    authConfig = `var AUTH_CONFIG = ${JSON.stringify(fxaConfig)};`;
  }
  /* eslint-disable no-useless-escape */
  const jsconfig = `
  var isIE = /trident\\\/7\.|msie/i.test(navigator.userAgent);
  var isUnsupportedPage = /\\\/unsupported/.test(location.pathname);
  if (isIE && !isUnsupportedPage) {
    window.location.replace('/unsupported/ie');
  }
  var LIMITS = {
    ANON: {
      MAX_FILE_SIZE: ${config.anon_max_file_size},
      MAX_DOWNLOADS: ${config.anon_max_downloads},
      MAX_EXPIRE_SECONDS: ${config.anon_max_expire_seconds},
    },
    MAX_FILE_SIZE: ${config.max_file_size},
    MAX_DOWNLOADS: ${config.max_downloads},
    MAX_EXPIRE_SECONDS: ${config.max_expire_seconds},
    MAX_FILES_PER_ARCHIVE: ${config.max_files_per_archive},
    MAX_ARCHIVES_PER_USER: ${config.max_archives_per_user}
  };
  var DEFAULTS = {
    DOWNLOAD_COUNTS: ${JSON.stringify(config.download_counts)},
    EXPIRE_TIMES_SECONDS: ${JSON.stringify(config.expire_times_seconds)},
    EXPIRE_SECONDS: ${config.default_expire_seconds}
  };
  ${authConfig};
  ${ga}
  ${sentry}
  `;
  res.set('Content-Type', 'application/javascript');
  res.send(jsconfig);
};
