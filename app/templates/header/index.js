const html = require('choo/html');
const version = require('../../../package.json').version;
const { browserName } = require('../../utils');

module.exports = function(state) {
  const browser = browserName();
  const feedbackUrl = `https://qsurvey.mozilla.com/s3/txp-firefox-send?ver=${version}&browser=${browser}`;

  const header = html`
  <header class="header">
    <h1>Firefox Send</h1>
    <a href="${feedbackUrl}"
      rel="noreferrer noopener"
      class="feedback"
      alt="Feedback"
      target="_blank">${state.translate('siteFeedback')}
    </a>
  </header>`;
  // HACK
  // We only want to render this once because we
  // toggle the targets of the links with utils/openLinksInNewTab
  header.isSameNode = function(target) {
    return target && target.nodeName && target.nodeName === 'HEADER';
  };
  return header;
};
