const html = require('choo/html');
const assets = require('../../common/assets');
const modal = require('./modal');

module.exports = function(state, emit) {
  let strings = {};
  let why = '';
  let url = '';
  let buttonAction = '';

  if (state.params.reason !== 'outdated') {
    strings = unsupportedStrings(state);
    why = html`
      <a
        class="text-blue"
        href="https://github.com/mozilla/send/blob/master/docs/faq.md#why-is-my-browser-not-supported"
      >
        ${state.translate('notSupportedLink')}
      </a>
    `;
    url =
      'https://www.mozilla.org/firefox/new/?utm_campaign=send-acquisition&utm_medium=referral&utm_source=send.firefox.com';
    buttonAction = html`
      <p class="ml-4 font-bold">
        Firefox<br /><span class="font-light text-base">${strings.button}</span>
      </p>
    `;
  } else {
    strings = outdatedStrings(state);
    url = 'https://support.mozilla.org/kb/update-firefox-latest-version';
    buttonAction = html`
      <p class="ml-4">${strings.button}</p>
    `;
  }

  return html`
    <main class="main container">
      ${state.modal && modal(state, emit)}
      <div
        class="flex flex-col items-center bg-white m-6 px-6 py-8 border border-grey-light md:border-none md:px-12 md:py-16 shadow w-full md:h-full"
      >
        <h1 class="text-center text-2xl">${strings.header}</h1>
        <p class="my-10 max-w-md leading-normal">${strings.description}</p>
        ${why}
        <a
          href="${url}"
          class="border border-green-light rounded bg-green hover\:bg-green-dark focus\:bg-green-darker flex items-center justify-center text-2xl text-white mt-10 py-4 px-6"
        >
          <img
            src="${assets.get('firefox_logo-only.svg')}"
            class="w-10"
            alt="Firefox"
          />
          ${buttonAction}
        </a>
      </div>
    </main>
  `;
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
    description: state.translate('notSupportedDetailUpdate'),
    button: state.translate('downloadFirefoxButtonSub')
  };
}
