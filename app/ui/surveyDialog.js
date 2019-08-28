const html = require('choo/html');
const version = require('../../package.json').version;
const { browserName } = require('../utils');

module.exports = function() {
  return function(state, emit, close) {
    const surveyUrl = `${
      state.PREFS.surveyUrl
    }?ver=${version}&browser=${browserName()}&anon=${
      state.user.loggedIn
    }&active_count=${state.storage.files.length}`;
    return html`
      <send-survey-dialog
        class="flex flex-col items-center text-center p-4 max-w-sm m-auto"
      >
        <h1 class="text-3xl font-bold my-4">
          Tell us what you think.
        </h1>
        <p class="font-normal leading-normal text-grey-darkest px-4">
          Love Firefox Send? Take a quick survey to let us know how we can make
          it better.
        </p>
        <a
          class="btn rounded-lg w-full flex-shrink-0 focus:outline my-5"
          onclick="${() => emit('closeModal')}"
          title="Give feedback"
          href="${surveyUrl}"
          target="_blank"
        >
          Give feedback
        </a>
        <button
          class="text-blue-dark hover:text-blue-darker focus:text-blue-darker font-medium cursor-pointer focus:outline"
          onclick="${close}"
          title="Skip"
        >
          Skip
        </button>
      </send-survey-dialog>
    `;
  };
};
