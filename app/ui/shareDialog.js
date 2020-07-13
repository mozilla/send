const html = require('choo/html');

module.exports = function(name, url) {
  const dialog = function(state, emit, close) {
    return html`
      <send-share-dialog
        class="flex flex-col items-center text-center p-4 max-w-sm m-auto"
      >
        <h1 class="text-3xl font-bold my-4">
          ${state.translate('notifyUploadEncryptDone')}
        </h1>
        <p class="font-normal leading-normal text-grey-80 dark:text-grey-40">
          ${state.translate('shareLinkDescription')}<br />
          <span class="word-break-all">${name}</span>
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
          onclick="${share}"
          title="${state.translate('shareLinkButton')}"
        >
          ${state.translate('shareLinkButton')}
        </button>
        <button
          class="link-blue my-4 font-medium cursor-pointer focus:outline"
          onclick="${close}"
          title="${state.translate('okButton')}"
        >
          ${state.translate('okButton')}
        </button>
      </send-share-dialog>
    `;

    async function share(event) {
      event.stopPropagation();
      try {
        await navigator.share({
          title: state.translate('-send-brand'),
          text: state.translate('shareMessage', { name }),
          url
        });
      } catch (e) {
        if (e.code === e.ABORT_ERR) {
          return;
        }
        console.error(e);
      }
      close();
    }
  };
  dialog.type = 'share';
  return dialog;
};
