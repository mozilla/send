const html = require('choo/html');
const assets = require('../../common/assets');
const modal = require('./modal');

module.exports = function(state, emit) {
  return html`
    <main class="main container">
      ${state.modal && modal(state, emit)}
      <div
        class="flex flex-col items-center bg-white m-6 px-6 py-8 border border-grey-light md:border-none md:px-12 md:py-16 shadow w-full"
      >
        <h1 class="text-pink-dark text-2xl text-center">
          ${state.translate('expiredPageHeaderUpdate')}
        </h1>
        <img
          class="my-16"
          src="${assets.get('illustration_expired.svg')}"
          id="expired-img"
        />
        <p class="pb-2">${state.translate('downloadFinishText')}</p>
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
