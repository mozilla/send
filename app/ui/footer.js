const html = require('choo/html');
const version = require('../../package.json').version;
const { browserName } = require('../utils');

module.exports = function(state) {
  const browser = browserName();
  const feedbackUrl = `https://qsurvey.mozilla.com/s3/txp-firefox-send?ver=${version}&browser=${browser}`;
  const footer = html`<footer class="flex flex-col md:flex-row items-start w-full flex-none self-start p-6 font-medium text-xs text-grey-dark md:items-center justify-between bg-grey-lightest">
    <a class="mozilla-logo pb-10 md:pb-0 m-2" 
      href="https://www.mozilla.org/">
      Mozilla
    </a>
    <ul class="list-reset flex flex-col md:flex-row items-start md:items-center md:justify-end">
      <li class="m-2"><a
        href="https://www.mozilla.org/about/legal">
        ${state.translate('footerLinkLegal')}
      </a></li>
      <li class="m-2"><a
        href="/legal">
        ${state.translate('footerLinkTerms')}
      </a></li>
      <li class="m-2"><a
        href="https://www.mozilla.org/privacy/websites/#cookies">
        ${state.translate('footerLinkCookies')}
      </a></li>
      <li class="m-2"><a
        href="https://www.mozilla.org/about/legal/report-infringement/">
        ${state.translate('reportIPInfringement')}
      </a></li>
      <li class="m-2"><a
        href="https://github.com/mozilla/send">GitHub
      </a></li>
      <li class="m-2"><a
        href="https://twitter.com/FxTestPilot">Twitter
      </a></li>
      <li class="m-2"><a href="${feedbackUrl}"
        rel="noreferrer noopener"
        class="feedback-link"
        alt="Feedback"
        target="_blank">
        ${state.translate('siteFeedback')}
      </a></li>
    </ul>
  </footer>`;
  // HACK
  // We only want to render this once because we
  // toggle the targets of the links with utils/openLinksInNewTab
  footer.isSameNode = function(target) {
    return target && target.nodeName && target.nodeName === 'FOOTER';
  };
  return footer;
};
