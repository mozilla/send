const html = require('choo/html');
const assets = require('../../common/assets');
const { platform } = require('../utils');

module.exports = function intro(state) {
  const isAndroid = platform() === 'android';
  return html`
    <send-intro
      class="flex flex-col items-center justify-center bg-white px-6 md:py-0 py-6 mb-0 h-full w-full ${isAndroid
        ? 'overflow-hidden'
        : ''}"
    >
      <div class="flex flex-col justify-end h-full">
        <h1
          class="font-bold ${isAndroid
            ? 'flex-1 flex flex-col justify-end'
            : ''}"
        >
          ${state.translate('introTitle')}
        </h1>
        <p
          class="max-w-sm ${isAndroid
            ? ' flex-1 mt-6'
            : 'pr-16 mt-2'} font-light leading-normal"
        >
          ${state.translate('introDescription')}
        </p>
        <img class="intro" src="${assets.get('intro.svg')}" />
      </div>
    </send-intro>
  `;
};
