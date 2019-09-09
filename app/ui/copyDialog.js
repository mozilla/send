const html = require('choo/html');
const { copyToClipboard } = require('../utils');

module.exports = function(name, url) {
  const dialog = function(state, emit, close) {
    return html`
      <send-copy-dialog
        class="flex flex-col items-center text-center p-4 max-w-sm m-auto"
      >
        <h1 class="text-3xl font-bold my-4">
          ${state.translate('notifyUploadEncryptDone')}
        </h1>
        <p
          class="font-normal leading-normal text-grey-80 word-break-all dark:text-grey-40"
        >
          ${state.translate('copyLinkDescription')} <br />
          ${name}
        </p>
        <input
          type="text"
          id="share-url"
          class="w-full my-4 border rounded-lg leading-loose h-12 px-2 py-1 dark:bg-grey-80"
          value="${url}"
          readonly="true"
        />
        <button
          class="btn rounded-lg w-full flex-shrink-0 focus:outline"
          onclick="${copy}"
          title="${state.translate('copyLinkButton')}"
        >
          ${state.translate('copyLinkButton')}
        </button>
        <button
          class="link-blue my-4 font-medium cursor-pointer focus:outline"
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
  dialog.type = 'copy';
  return dialog;
};
