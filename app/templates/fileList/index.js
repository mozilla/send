const html = require('choo/html');
const file = require('../file');

module.exports = function(state) {
  if (state.storage.files.length) {
    return html`
    <ul class="fileList">
        ${state.storage.files.map(f => file(f, state))}
    </ul>
    `;
  }
};
