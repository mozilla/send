const html = require('choo/html');
const assets = require('../../common/assets');

module.exports = function intro(state) {
  return html`
    <send-intro
      class="flex flex-col items-center justify-center bg-white border border-grey-light md:border-none px-6 md:py-0 py-6 mb-0 h-full w-full"
    >
      <div class="flex flex-col justify-end h-full py-8">
        <h1 class="font-bold leading-normal">
          ${state.translate('uploadPageHeader')}
        </h1>
        <p class="max-w-sm font-light leading-normal">
          ${state.translate('uploadPageExplainer')}
        </p>
        <img class="my-6" src="${assets.get('illustration_download.svg')}" />
      </div>
    </send-intro>
  `;
};
