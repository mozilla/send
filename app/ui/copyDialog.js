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
          class="w-full my-4 border rounded-lg leading-loose h-12 px-2 py-1"
          value="${url}"
          readonly="true"
        />
        <button
          class="btn rounded-lg w-full flex-no-shrink focus:outline"
          onclick="${copy}"
          title="${state.translate('copyUrlFormButton')}"
        >
          ${state.translate('copyUrlFormButton')}
        </button>
        <button
          class="text-blue-dark hover:text-blue-darker focus:text-blue-darker my-4 font-medium cursor-pointer focus:outline"
          onclick="${close}"
          title="${state.translate('okButton')}"
        >
          ${state.translate('okButton')}
        </button>
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
