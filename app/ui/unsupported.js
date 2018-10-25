const html = require('choo/html');
const assets = require('../../common/assets');

module.exports = function(state) {
  let strings = {};
  let why = '';
  let url = '';
  let buttonAction = '';

  if (state.params.reason !== 'outdated') {
    strings = unsupportedStrings(state);
    why = html`
      <a
        class="text-blue" href="https://github.com/mozilla/send/blob/master/docs/faq.md#why-is-my-browser-not-supported">
          ${state.translate('notSupportedLink')}
      </a>`;
    url =
      'https://www.mozilla.org/firefox/new/?utm_campaign=send-acquisition&utm_medium=referral&utm_source=send.firefox.com';
    buttonAction = html`
      <p class="ml-3 font-bold">
        Firefox<br><span class="font-light">${strings.button}</span>
      </p>`;
  } else {
    strings = outdatedStrings(state);
    url = 'https://support.mozilla.org/kb/update-firefox-latest-version';
    buttonAction = html`
      <p class="ml-3">
        ${strings.button}
      </p>`;
  }

  return html`
    <main class="main">
      <div class="flex flex-col items-center bg-white m-6 p-4 border border-grey-light md:border-none md:px-12">
      <h1 class="text-center">${strings.header}</h1>
      <p class="my-16">
        ${strings.description}
      </p>
      ${why}
      <a href="${url}" class="border border-green-light rounded bg-green flex items-center justify-center text-2xl text-white my-16 p-2">
        <img
          src="${assets.get('firefox_logo-only.svg')}"
          class="w-16"
          alt="Firefox"/>
        ${buttonAction}
      </a>
      </div>
    </main>`;
};

function outdatedStrings(state) {
  return {
    header: state.translate('notSupportedHeader'),
    description: state.translate('notSupportedOutdatedDetail'),
    button: state.translate('updateFirefox')
  };
}

function unsupportedStrings(state) {
  return {
    header: state.translate('notSupportedHeader'),
    description: state.translate('notSupportedDetail'),
    button: state.translate('downloadFirefoxButtonSub')
  };
}
