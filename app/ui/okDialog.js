const html = require('choo/html');

module.exports = function(message) {
  return function(state, emit, close) {
    return html`
      <send-ok-dialog class="flex flex-col max-w-sm p-4 m-auto">
        <h2 class="text-center m-8 leading-normal">${message}</h2>
        <button
          class="btn rounded-lg w-full flex-no-shrink"
          onclick="${close}"
          title="${state.translate('okButton')}"
        >
          ${state.translate('okButton')}
        </button>
      </send-ok-dialog>
    `;
  };
};
