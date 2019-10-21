const html = require('choo/html');
const assets = require('../../common/assets');

module.exports = function(state) {
  return html`
    <div
      id="download-complete"
      class="flex flex-col items-center justify-center h-full w-full bg-white p-2 dark:bg-grey-90"
    >
      <h1 class="text-center text-3xl font-bold my-2">
        ${state.translate('downloadFinish')}
      </h1>
      <img src="${assets.get('completed.svg')}" class="my-12 h-48" />
      <p class="text-grey-80 leading-normal dark:text-grey-40">
        ${state.translate('trySendDescription')}
      </p>
      <p class="my-5">
        <a href="/" class="btn rounded-lg flex items-center mt-4" role="button"
          >${state.translate('sendYourFilesLink')}</a
        >
      </p>
    </div>
  `;
};
