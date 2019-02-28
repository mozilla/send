const html = require('choo/html');
const assets = require('../../common/assets');
const modal = require('./modal');

module.exports = function(state, emit) {
  return html`
    <main class="main">
      ${state.modal && modal(state, emit)}
      <div
        class="flex flex-col items-center h-full w-full p-6 z-10 overflow-hidden md:rounded-lg md:shadow-big"
      >
        <h1 class="text-center font-bold my-4 text-2xl">
          ${state.translate('errorPageHeader')}
        </h1>
        <p class="pb-2 max-w-md text-center text-grey-darkest leading-normal">
          ${state.translate('uploadPageExplainer')}
        </p>
        <img class="max-w-sm" src="${assets.get('error.svg')}" />
        <p class="mb-4">
          <a
            href="/"
            class="btn rounded-lg flex items-center mt-4"
            role="button"
            >${state.translate('sendYourFilesLink')}</a
          >
        </p>
      </div>
    </main>
  `;
};
