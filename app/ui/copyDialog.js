const html = require('choo/html');
const { copyToClipboard } = require('../utils');

module.exports = function(name, url) {
  return function(state, emit, close) {
    return html`
      <send-copy-dialog
        class="flex flex-col items-center text-center p-4 max-w-sm"
      >
        <h1 class="font-bold my-4">${state.translate('notifyUploadDone')}</h1>
        <p class="font-normal leading-normal text-grey-darker word-break-all">
          ${state.translate('copyUrlFormLabelWithName', { filename: name })}
        </p>
        <input
          type="text"
          id="share-url"
          class="w-full my-4 border rounded leading-loose h-12 px-2 py-1"
          value="${url}"
          readonly="true"
        />
        <button class="btn rounded-lg w-full flex-no-shrink" onclick="${copy}">
          ${state.translate('copyUrlFormButton')}
        </button>
        <a
          class="text-blue hover:text-blue-dark focus:text-blue-darker my-4 font-medium cursor-pointer"
          onclick="${close}"
          >${state.translate('okButton')}</a
        >
      </send-copy-dialog>
    `;

    function copy(event) {
      event.stopPropagation();
      copyToClipboard(url);
      event.target.textContent = state.translate('copiedUrl');
      setTimeout(close, 1000);
    }
  };
};
