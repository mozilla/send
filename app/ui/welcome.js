const html = require('choo/html');
const archiveList = require('./archiveList');
const modal = require('./modal');

module.exports = function(state, emit) {
  return html`<main class="main relative">
  ${state.modal && modal(state, emit)}
  ${archiveList(state, emit)}
  </main>`;
};
