const html = require('choo/html');
const assets = require('../../common/assets');
/*
  The current weback config uses package.json to generate
  version.json for /__version__ meaning `require` returns the
  string 'version.json' in the frontend context but the json
  on the server.

  We want `version` to be constant at build time so this file
  has a custom loader (/build/version_loader.js) just to replace
  string with the value from package.json. 🤢
*/
const version = require('../../package.json').version || 'VERSION';

module.exports = function(state) {
  return html`<header class="header">
  <div class="send-logo">
    <a href="/">
      <img src="${assets.get(
        'send_logo.svg'
      )}" alt="Send"/><h1 class="site-title">Send</h1>
    </a>
    <div class="site-subtitle">
      <a href="https://testpilot.firefox.com">Firefox Test Pilot</a>
      <div>${state.translate('siteSubtitle')}</div>
    </div>
  </div>
  <a href="https://qsurvey.mozilla.com/s3/txp-firefox-send?ver=${version}"
    rel="noreferrer noopener"
    class="feedback"
    target="_blank">${state.translate('siteFeedback')}</a>
</header>`;
};
