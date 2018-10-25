const html = require('choo/html');
const archiveList = require('./archiveList');

module.exports = function(state, emit) {
  return html`<main class="main">${archiveList(state, emit)}</main>`;
};
