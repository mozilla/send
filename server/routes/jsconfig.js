const config = require('../config');

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

/* eslint-disable no-useless-escape */
const jsconfig = `
var isIE = /trident\\\/7\.|msie/i.test(navigator.userAgent);
var isUnsupportedPage = /\\\/unsupported/.test(location.pathname);
if (isIE && !isUnsupportedPage) {
  window.location.replace('/unsupported/ie');
}
var MAXFILESIZE = ${config.max_file_size};
var EXPIRE_SECONDS = ${config.expire_seconds};
var EXPIRE_LIMIT = [${config.expire_limit}];
${ga}
${sentry}
`;

module.exports = function(req, res) {
  res.set('Content-Type', 'application/javascript');
  res.send(jsconfig);
};
