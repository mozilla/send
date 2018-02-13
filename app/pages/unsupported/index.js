const html = require('choo/html');
const assets = require('../../../common/assets');

function outdatedStrings(state) {
  return {
    title: state.translate('notSupportedHeader'),
    description: state.translate('notSupportedOutdatedDetail'),
    button: state.translate('updateFirefox'),
    explainer: state.translate('uploadPageExplainer')
  };
}

function unsupportedStrings(state) {
  return {
    title: state.translate('notSupportedHeader'),
    description: state.translate('notSupportedDetail'),
    button: state.translate('downloadFirefoxButtonSub'),
    explainer: state.translate('uploadPageExplainer')
  };
}

module.exports = function(state) {
  let strings = {};
  let why = '';
  let url = '';
  let buttonAction = '';
  if (state.params.reason !== 'outdated') {
    strings = unsupportedStrings(state);
    why = html`
      <div class="description">
        <a href="https://github.com/mozilla/send/blob/master/docs/faq.md#why-is-my-browser-not-supported">
          ${state.translate('notSupportedLink')}
        </a>
      </div>`;
    url =
      'https://www.mozilla.org/firefox/new/?utm_campaign=send-acquisition&utm_medium=referral&utm_source=send.firefox.com';
    buttonAction = html`
      <div class="firefoxDownload__action">
        Firefox<br><span class="firefoxDownload__text">${strings.button}</span>
      </div>`;
  } else {
    strings = outdatedStrings(state);
    url = 'https://support.mozilla.org/kb/update-firefox-latest-version';
    buttonAction = html`
      <div class="firefoxDownload__action">
        ${strings.button}
      </div>`;
  }
  const div = html`
    <div class="unsupportedPage">
      <div class="title">${strings.title}</div>
      <div class="description">
        ${strings.description}
      </div>
      ${why}
      <a href="${url}" class="firefoxDownload">
        <img
          src="${assets.get('firefox_logo-only.svg')}"
          class="firefoxDownload__logo"
          alt="Firefox"/>
        ${buttonAction}
      </a>
      <div class="unsupportedPage__info">
        ${strings.explainer}
      </div>
    </div>`;
  return div;
};
