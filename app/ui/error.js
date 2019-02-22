const html = require('choo/html');
const assets = require('../../common/assets');
const modal = require('./modal');

module.exports = function(state, emit) {
  return html`
    <main class="main">
      ${state.modal && modal(state, emit)}
      <div
        class="flex flex-col items-center bg-white m-6 px-6 py-8 border border-grey-light md:border-none md:px-12 md:py-16 shadow w-full md:h-full"
      >
        <h1 class="text-2xl text-center">
          ${state.translate('errorPageHeader')}
        </h1>
        <img class="my-16" src="${assets.get('illustration_error.svg')}" />
        <p class="max-w-md leading-normal">
          ${state.translate('uploadPageExplainer')}
        </p>
        <a class="text-blue mt-10 font-medium" href="/">
          ${state.translate('sendYourFilesLink')}
        </a>
      </div>
    </main>
  `;
};
