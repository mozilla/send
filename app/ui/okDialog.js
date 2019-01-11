const html = require('choo/html');

module.exports = function(message) {
  return function(state, emit, close) {
    return html`
      <send-ok-dialog class="flex flex-col max-w-xs p-4">
        <div class="text-center m-8 leading-normal">${message}</div>
        <button
          class="rounded bg-blue hover\:bg-blue-dark focus\:bg-blue-darker cursor-pointer text-center text-white py-2 px-6 h-12 w-full flex flex-no-shrink items-center justify-center font-semibold"
          onclick="${close}"
        >
          ${state.translate('okButton')}
        </button>
      </send-ok-dialog>
    `;
  };
};
