const html = require('choo/html');
const assets = require('../../common/assets');

module.exports = function(state) {
  const msg =
    state.params.reason === 'outdated'
      ? html`
    <div id="unsupported-browser">
      <div class="title">${state.translate('notSupportedHeader')}</div>
      <div class="description">${state.translate(
        'notSupportedOutdatedDetail'
      )}</div>
      <a id="update-firefox" href="https://support.mozilla.org/kb/update-firefox-latest-version">
        <img src="${assets.get(
          'firefox_logo-only.svg'
        )}" class="firefox-logo" alt="Firefox"/>
        <div class="unsupported-button-text">${state.translate(
          'updateFirefox'
        )}</div>
      </a>
      <div class="unsupported-description">${state.translate(
        'uploadPageExplainer'
      )}</div>
    </div>`
      : html`
    <div id="unsupported-browser">
      <div class="title">${state.translate('notSupportedHeader')}</div>
      <div class="description">${state.translate('notSupportedDetail')}</div>
      <div class="description"><a href="https://github.com/mozilla/send/blob/master/docs/faq.md#why-is-my-browser-not-supported">${state.translate(
        'notSupportedLink'
      )}</a></div>
      <a id="dl-firefox" href="https://www.mozilla.org/firefox/new/?utm_campaign=send-acquisition&utm_medium=referral&utm_source=send.firefox.com">
        <img src="${assets.get(
          'firefox_logo-only.svg'
        )}" class="firefox-logo" alt="Firefox"/>
        <div class="unsupported-button-text">Firefox<br>
          <span>${state.translate('downloadFirefoxButtonSub')}</span>
        </div>
      </a>
      <div class="unsupported-description">${state.translate(
        'uploadPageExplainer'
      )}</div>
    </div>`;
  const div = html`<div id="page-one">${msg}</div>`;
  return div;
};
