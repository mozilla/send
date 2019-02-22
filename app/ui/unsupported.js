const html = require('choo/html');
const modal = require('./modal');

module.exports = function(state, emit) {
  let strings = {};
  let why = '';
  let url = '';

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
  } else {
    strings = outdatedStrings(state);
    url = 'https://support.mozilla.org/kb/update-firefox-latest-version';
  }

  return html`
    <main class="main">
      ${state.modal && modal(state, emit)}
      <div
        class="flex flex-col items-center justify-center text-center bg-white m-6 px-6 py-8 border border-grey-light md:border-none md:px-12 md:py-16 shadow w-full md:h-full"
      >
        <h1 class="">${strings.header}</h1>
        <p class=" mt-4 mb-8 max-w-md leading-normal">${strings.description}</p>
        ${why}
        <a href="${url}" class="btn rounded-lg mt-8 px-8">
          ${strings.button}
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
    button: state.translate('downloadFirefox')
  };
}
