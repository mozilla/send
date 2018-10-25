const html = require('choo/html');

module.exports = function(message) {
  return function(state, emit, close) {
    return html`
    <div class="flex flex-col max-w-xs p-4">
      <div class="text-center m-8">${message}</div>
      <button class="border rounded bg-blue text-white leading-loose w-full" onclick=${close}>${state.translate(
      'okButton'
    )}</button>
    </div>`;
  };
};
