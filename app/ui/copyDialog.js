const html = require('choo/html');
const { copyToClipboard } = require('../utils');

module.exports = function(name, url) {
  return function(state, emit, close) {
    return html`
    <div class="flex flex-col items-center text-center p-4 max-w-md">
      <h1 class="font-normal my-4">${state.translate('notifyUploadDone')}</h1>
      <p class="font-light text-grey-darker">${state.translate(
        'copyUrlFormLabelWithName',
        { filename: name }
      )}</p>
      <input type="text" id="share-url" class="w-full my-4 border rounded leading-loose" value=${url} readonly="true"/>
      <button class="border rounded bg-blue text-white leading-loose w-full" onclick=${copy}>
        ${state.translate('copyUrlFormButton')}
      </button>
      <a class="text-blue my-2 cursor-pointer" onclick=${close}>${state.translate(
      'okButton'
    )}</a>
    </div>`;

    function copy(event) {
      event.stopPropagation();
      copyToClipboard(url);
      event.target.textContent = state.translate('copiedUrl');
      setTimeout(close, 1000);
    }
  };
};
