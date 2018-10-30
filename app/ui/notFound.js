const html = require('choo/html');
const assets = require('../../common/assets');

module.exports = function(state) {
  return html`
  <main class="main container">
    <div class="flex flex-col items-center text-center bg-white m-6 p-4 border border-grey-light md:border-none md:px-12">
      <h1 class="text-pink-dark">${state.translate('expiredPageHeader')}</h1>
      <img src="${assets.get('illustration_expired.svg')}" id="expired-img">
      <p class="">
        ${state.translate('uploadPageExplainer')}
      </p>
      <a class="text-blue mt-4" href="/">
        ${state.translate('sendYourFilesLink')}
      </a>
    </div>
  </main>`;
};
