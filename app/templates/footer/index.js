const html = require('choo/html');
const assets = require('../../../common/assets');

module.exports = function(state) {
  const footer = html`<footer class="footer">
    <div class="legalSection">
      <a
        href="https://www.mozilla.org"
        class="legalSection__link">
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
      <a
        href="https://github.com/mozilla/send"
        class="socialSection__link">
        <img
          class="socialSection__icon"
          src="${assets.get('github-icon.svg')}"
          alt="github"/>
      </a>
      <a
        href="https://twitter.com/FxTestPilot"
        class="socialSection__link">
        <img
          class="legalSection__mozLogo"
          src="${assets.get('mozilla-logo.svg')}"
          alt="mozilla"/>
      </a>
    </div>
  </footer>`;
  // HACK
  // We only want to render this once because we
  // toggle the targets of the links with utils/openLinksInNewTab
  footer.isSameNode = function(target) {
    return target && target.nodeName && target.nodeName === 'FOOTER';
  };
  return footer;
};
