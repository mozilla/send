const html = require('choo/html');
const raw = require('choo/html/raw');
const config = require('./config');
const clientConstants = require('./clientConstants');

let sentry = '';
if (config.sentry_id) {
  //eslint-disable-next-line node/no-missing-require
  const version = require('../dist/version.json');
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

module.exports = function(state) {
  const authConfig = state.authConfig
    ? `var AUTH_CONFIG = ${JSON.stringify(state.authConfig)};`
    : '';

  /* eslint-disable no-useless-escape */
  const jsconfig = `
  var isIE = /trident\\\/7\.|msie/i.test(navigator.userAgent);
  var isUnsupportedPage = /\\\/unsupported/.test(location.pathname);
  if (isIE && !isUnsupportedPage) {
    window.location.assign('/unsupported/ie');
  }
  if (
    // Firefox < 50
    /firefox/i.test(navigator.userAgent) &&
    parseInt(navigator.userAgent.match(/firefox\\/*([^\\n\\r]*)\./i)[1], 10) < 50
  ) {
    window.location.assign('/unsupported/outdated');
  }

  var LIMITS = ${JSON.stringify(clientConstants.LIMITS)};
  var DEFAULTS = ${JSON.stringify(clientConstants.DEFAULTS)};
  const LOCALE = '${state.locale}';
  const downloadMetadata = ${
    state.downloadMetadata ? raw(JSON.stringify(state.downloadMetadata)) : '{}'
  };
  ${authConfig};
  ${sentry}
  `;
  return state.cspNonce
    ? html`
        <script nonce="${state.cspNonce}">
          ${raw(jsconfig)};
        </script>
      `
    : '';
};
