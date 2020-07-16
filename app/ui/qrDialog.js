const html = require('choo/html');
const QRious = require('qrious');

module.exports = function(url) {
  const qr = new QRious({
    value: url,
    size: 300
  });

  const dialog = function(state, emit, close) {
    return html`
      <main class="main">
        <section class="flex flex-col p-4 max-w-xs m-auto">
          <div>
            <img class="max-w-100" src="${qr.toDataURL('image/jpeg')}" />
          </div>

          <h1 class="font-bold my-4">
            ${state.translate('copiedUrl')}
          </h1>

          <p>${state.translate('qrDialogMessage')}</p>

          <button
            class="btn rounded-lg w-full flex-no-shrink focus:outline mt-4"
            onclick="${close}"
            title="${state.translate('okButton')}"
          >
            ${state.translate('okButton')}
          </button>
        </section>
      </main>
    `;
  };

  return dialog;
};
