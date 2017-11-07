const html = require('choo/html');
const assets = require('../../common/assets');

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
  <a href="https://qsurvey.mozilla.com/s3/txp-firefox-send" rel="noreferrer noopener" class="feedback" target="_blank">${state.translate(
    'siteFeedback'
  )}</a>
</header>`;
};
