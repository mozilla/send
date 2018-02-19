const html = require('choo/html');
const assets = require('../../../common/assets');

module.exports = function(state) {
  return html`<div class="footer">
    <div class="legalSection">
      <a
        href="https://www.mozilla.org"
        class="legalSection__link"
        role="presentation">
        <img
          class="legalSection__mozLogo"
          src="${assets.get('mozilla-logo.svg')}"
          alt="mozilla"/>
      </a>
      <a
        href="https://www.mozilla.org/about/legal"
        class="legalSection__link">
        ${state.translate('footerLinkLegal')}
      </a>
      <a
        href="https://testpilot.firefox.com/about"
        class="legalSection__link">
        ${state.translate('footerLinkAbout')}
      </a>
      <a
        href="/legal"
        class="legalSection__link">${state.translate('footerLinkPrivacy')}</a>
      <a
        href="/legal"
        class="legalSection__link">${state.translate('footerLinkTerms')}</a>
      <a
        href="https://www.mozilla.org/privacy/websites/#cookies"
        class="legalSection__link">
        ${state.translate('footerLinkCookies')}
      </a>
      <a
        href="https://www.mozilla.org/about/legal/report-infringement/"
        class="legalSection__link">
        ${state.translate('reportIPInfringement')}
      </a>
    </div>
    <div class="socialSection">
      <a
        href="https://github.com/mozilla/send"
        class="socialSection__link"
        role="presentation">
        <img
          class="socialSection__icon"
          src="${assets.get('github-icon.svg')}"
          alt="github"/>
      </a>
      <a
        href="https://twitter.com/FxTestPilot"
        class="socialSection__link"
        role="presentation">
        <img
          class="socialSection__icon"
          src="${assets.get('twitter-icon.svg')}"
          alt="twitter"/>
      </a>
    </div>
  </div>`;
};
