const html = require('choo/html');
const assets = require('../../common/assets');

module.exports = function intro(state) {
  return html`
  <article class="flex flex-col items-center justify-center bg-white border border-grey-light p-2">
    <p class="text-center">
      <div class="font-semibold">${state.translate('uploadPageHeader')}</div>
      <div class="italic">${state.translate('pageHeaderCredits')}</div>
    </p>
    <img src="${assets.get('illustration_download.svg')}"/>
    <p class="m-4 max-w-sm text-sm font-light">${state.translate(
      'uploadPageExplainer'
    )}</p>
  </article>`;
};
