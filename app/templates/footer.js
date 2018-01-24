const html = require('choo/html');
const assets = require('../../common/assets');

module.exports = function(state) {
  return html`<div class="footer">
    <div class="legal-links">
      <a href="https://www.mozilla.org" role="presentation">
        <img
          class="mozilla-logo"
          src="${assets.get('mozilla-logo.svg')}"
          alt="mozilla"/>
      </a>
      <a href="https://www.mozilla.org/about/legal">
        ${state.translate('footerLinkLegal')}
      </a>
      <a href="https://testpilot.firefox.com/about">
        ${state.translate('footerLinkAbout')}
      </a>
      <a href="/legal">${state.translate('footerLinkPrivacy')}</a>
      <a href="/legal">${state.translate('footerLinkTerms')}</a>
      <a href="https://www.mozilla.org/privacy/websites/#cookies">
        ${state.translate('footerLinkCookies')}
      </a>
      <a href="https://www.mozilla.org/about/legal/report-infringement/">
        ${state.translate('reportIPInfringement')}
      </a>
    </div>
    <div class="social-links">
      <a href="https://github.com/mozilla/send" role="presentation">
        <img
          class="github"
          src="${assets.get('github-icon.svg')}"
          alt="github"/>
      </a>
      <a href="https://twitter.com/FxTestPilot" role="presentation">
        <img
          class="twitter"
          src="${assets.get('twitter-icon.svg')}"
          alt="twitter"/>
      </a>
    </div>
  </div>`;
};
