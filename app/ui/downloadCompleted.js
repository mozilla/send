const html = require('choo/html');
const assets = require('../../common/assets');

module.exports = function(state) {
  return html`
    <div
      id="download-complete"
      class="flex flex-col items-center justify-center h-full w-full bg-white p-2"
    >
      <h1 class="text-center font-bold my-4 text-2xl">
        ${state.translate('downloadFinish')}
      </h1>
      <p class="pb-2 text-grey-darkest leading-normal">
        ${state.translate('downloadFinishText')}
      </p>
      <img src="${assets.get('completed.svg')}" class="max-w-sm" />
      <p class="mb-4">
        <a href="/" class="btn rounded-lg flex items-center mt-4" role="button"
          >${state.translate('sendYourFilesLink')}</a
        >
      </p>
    </div>
  `;
};
