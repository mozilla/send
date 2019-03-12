const html = require('choo/html');

/* Possible strings for l10n
shareLinkDescription = Share the link to your file:
shareLinkButton = Share link
shareMessage = Download "{ $name }" with { -send-brand }: simple, safe file sharing
 */

module.exports = function(name, url) {
  return function(state, emit, close) {
    return html`
      <send-share-dialog
        class="flex flex-col items-center text-center p-4 max-w-sm m-auto"
      >
        <h1 class="font-bold my-4">
          ${state.translate('notifyUploadEncryptDone')}
        </h1>
        <p class="font-normal leading-normal text-grey-darkest word-break-all">
          Share the link to your file:<br />
          ${name}
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
          onclick="${share}"
          title="Share link"
        >
          Share link
        </button>
        <button
          class="text-blue-dark hover:text-blue-darker focus:text-blue-darker my-4 font-medium cursor-pointer focus:outline"
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
          text: `Download "${name}" with Firefox Send: simple, safe file sharing`,
          //state.translate('shareMessage', { name }),
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
};
