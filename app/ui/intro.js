const html = require('choo/html');
const assets = require('../../common/assets');

module.exports = function intro(state) {
  return html`
  <send-intro class="flex flex-col items-center justify-center bg-white border border-grey-light md:border-none px-6 text-center md:py-0 py-6 md:mb-0 mb-6 h-full">
    <div class="flex flex-col items-center justify-between h-full py-8">
      <p class="text-center">
        <div class="font-semibold leading-normal">${state.translate(
          'uploadPageHeader'
        )}</div>
        <div class="italic text-sm opacity-75 leading-normal">${state.translate(
          'pageHeaderCredits'
        )}</div>
      </p>
      <img class="my-6" src="${assets.get('illustration_download.svg')}"/>
      <p class="md:mx-6 max-w-sm text-sm opacity-50 leading-normal">${state.translate(
        'uploadPageExplainer'
      )}</p>
    </div>
  </send-intro>`;
};
