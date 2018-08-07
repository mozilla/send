const html = require('choo/html');
const assets = require('../../../common/assets');
const title = require('../../templates/title');

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

  return html`
    <div class="page unsupportedPage">
      ${title(state)}
      <div class="error unsupportedPage__error">${strings.header}</div>
      <div class="description flexible">
        ${strings.description}
        ${why}
      </div>

      <div class="flexible firefoxDownload">
        <a href="${url}" class="firefoxDownload__button">
          <img
            src="${assets.get('firefox_logo-only.svg')}"
            class="firefoxDownload__logo"
            alt="Firefox"/>
          ${buttonAction}
        </a>
      </div>

      <div class="unsupportedPage__info">
        ${strings.explainer}
      </div>
    </div>`;
};

function outdatedStrings(state) {
  return {
    header: state.translate('notSupportedHeader'),
    description: state.translate('notSupportedOutdatedDetail'),
    button: state.translate('updateFirefox'),
    explainer: state.translate('uploadPageExplainer')
  };
}

function unsupportedStrings(state) {
  return {
    header: state.translate('notSupportedHeader'),
    description: state.translate('notSupportedDetail'),
    button: state.translate('downloadFirefoxButtonSub'),
    explainer: state.translate('uploadPageExplainer')
  };
}
