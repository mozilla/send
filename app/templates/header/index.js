const html = require('choo/html');
const assets = require('../../../common/assets');
/*
  The current weback config uses package.json to generate
  version.json for /__version__ meaning `require` returns the
  string 'version.json' in the frontend context but the json
  on the server.

  We want `version` to be constant at build time so this file
  has a custom loader (/build/version_loader.js) just to replace
  string with the value from package.json. 🤢
*/
const version = require('../../../package.json').version || 'VERSION';
const browser = browserName();

module.exports = function(state) {
  const feedbackUrl = `https://qsurvey.mozilla.com/s3/txp-firefox-send?ver=${version}&browser=${browser}`;
  const header = html`
  <header class="header">
    <div class="logo">
      <a class="logo__link" href="/">
        <img
          src="${assets.get('send_logo.svg')}"
          alt="Send"/>
        <h1 class="logo__title">Send</h1>
      </a>
      <div class="logo__subtitle">
        <a class="logo__subtitle-link" href="https://testpilot.firefox.com">Firefox Test Pilot</a>
        <div>${state.translate('siteSubtitle')}</div>
      </div>
    </div>
    <a href="${feedbackUrl}"
      rel="noreferrer noopener"
      class="feedback"
      target="_blank">${state.translate('siteFeedback')}</a>
  </header>`;
  // HACK
  // We only want to render this once because we
  // toggle the targets of the links with utils/openLinksInNewTab
  header.isSameNode = function(target) {
    return target && target.nodeName && target.nodeName === 'HEADER';
  };
  return header;
};

function browserName() {
  try {
    if (/firefox/i.test(navigator.userAgent)) {
      return 'firefox';
    }
    if (/edge/i.test(navigator.userAgent)) {
      return 'edge';
    }
    if (/trident/i.test(navigator.userAgent)) {
      return 'ie';
    }
    if (/chrome/i.test(navigator.userAgent)) {
      return 'chrome';
    }
    if (/safari/i.test(navigator.userAgent)) {
      return 'safari';
    }
    return 'other';
  } catch (e) {
    return 'unknown';
  }
}
