const html = require('choo/html');
const assets = require('../../common/assets');

module.exports = function intro(state) {
  return html`
    <send-intro
      class="flex flex-col items-center justify-center bg-white px-6 md:py-0 py-6 mb-0 h-full w-full"
    >
      <div class="flex flex-col h-full">
        <h1 class="font-bold">
          ${state.translate('introTitle')}
        </h1>
        <p class="max-w-sm mt-2 pr-16 leading-normal">
          ${state.translate('introDescription')}
        </p>
        <img class="intro" src="${assets.get('intro.svg')}" />
      </div>
    </send-intro>
  `;
};
