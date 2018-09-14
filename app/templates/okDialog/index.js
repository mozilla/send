const html = require('choo/html');

module.exports = function(message) {
  return function(state, close) {
    return html`
    <div class="okDialog">
      <div class="okDialog__message">${message}</div>
      <button class="btn" onclick=${close}>${state.translate(
      'okButton'
    )}</button>
    </div>`;
  };
};
