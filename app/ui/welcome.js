const html = require('choo/html');
const archiveList = require('./archiveList');

module.exports = function(state, emit) {
  return html`<main class="main container">${archiveList(state, emit)}</main>`;
};
