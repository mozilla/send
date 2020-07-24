const html = require('choo/html');

module.exports = function() {
  return function(state, emit, close) {
    const archive = state.fileInfo;
    return html`
      <send-download-dialog
        class="flex flex-col w-full max-w-sm h-full mx-auto items-center justify-center"
      >
        <h1 class="text-3xl font-bold mb-4">
          ${state.translate('downloadConfirmTitle')}
        </h1>
        <p
          class="w-full text-grey-80 text-center leading-normal dark:text-grey-40 mb-8"
        >
          ${state.translate('downloadConfirmDescription')}
        </p>
        <div class="checkbox inline-block mr-3 mb-8">
          <input
            id="trust-download"
            type="checkbox"
            autocomplete="off"
            onchange="${toggleDownloadEnabled}"
          />
          <label for="trust-download">
            ${state.translate('downloadTrustCheckbox')}
          </label>
        </div>
        <button
          id="download-btn"
          disabled
          class="btn rounded-lg w-full flex-shrink-0"
          onclick="${download}"
          title="${state.translate('downloadButtonLabel')}"
        >
          ${state.translate('downloadButtonLabel')}
        </button>
        <a href="/report" class="link-blue mt-8"
          >${state.translate('reportFile')}</a
        >
      </send-download-dialog>
    `;

    function toggleDownloadEnabled(event) {
      event.stopPropagation();
      const checked = event.target.checked;
      const btn = document.getElementById('download-btn');
      btn.disabled = !checked;
    }

    function download(event) {
      event.preventDefault();
      close();
      event.target.disabled = true;
      emit('download', archive);
    }
  };
};
