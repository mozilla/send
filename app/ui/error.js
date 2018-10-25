const html = require('choo/html');
const assets = require('../../common/assets');

module.exports = function(state) {
  return html`
  <main class="main">
    <div class="flex flex-col items-center text-center bg-white m-6 p-4 border border-grey-light md:border-none md:px-12">
    <h1 class="">${state.translate('errorPageHeader')}</h1>
    <img class="my-8" src="${assets.get('illustration_error.svg')}"/>
    <p class="">
      ${state.translate('uploadPageExplainer')}
    </p>
    <a class="text-blue mt-4" href="/">
      ${state.translate('sendYourFilesLink')}
    </a>
    </div>
  </main>`;
};
