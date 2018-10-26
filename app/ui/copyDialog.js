const html = require('choo/html');
const assets = require('../../common/assets');
const { copyToClipboard } = require('../utils');

module.exports = function(url) {
  return function(state, emit, close) {
    return html`
    <div class="flex flex-col p-4">
    <input
      type="image"
      class="self-end text-white"
      alt="Close"
      src="${assets.get('close-16.svg')}"
      onclick=${close}/>
      <h1 class="font-normal mt-2">${state.translate('notifyUploadDone')}</h1>
      <input type="text" class="w-full my-4 border rounded leading-loose" value=${url} readonly="true"/>
      <button class="border rounded bg-blue text-white leading-loose w-full" onclick=${copy}>
        ${state.translate('copyUrlFormButton')}
      </button>
    </div>`;

    function copy(event) {
      event.stopPropagation();
      copyToClipboard(url);
      event.target.textContent = state.translate('copiedUrl');
      setTimeout(close, 1000);
    }
  };
};
