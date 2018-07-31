const html = require('choo/html');
const file = require('../uploadedFile');

module.exports = function(files, state, emit) {
  //const progressRatio = state.transfer ? state.transfer.progressRatio : 0;

  return html`
	<ul class="uploadedFiles">
    ${files.map(f => file(f, state, emit))}
  </ul>
	`;
};
