const html = require('choo/html');
const version = require('../../../package.json').version;
const browser = browserName();

module.exports = function(state) {
  const feedbackUrl = `https://qsurvey.mozilla.com/s3/txp-firefox-send?ver=${version}&browser=${browser}`;
  const header = html`
  <header class="header">
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
