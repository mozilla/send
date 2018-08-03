const html = require('choo/html');
const file = require('../uploadedFile');

module.exports = function(archive, state, emit) {
  let files = [];
  if (archive) {
    files = Array.from(archive.manifest.files);
  }

  return html`
	<ul class="uploadedFiles">
    ${files.map((f, i) => file(f, i, state, emit, archive._hasPassword))}
  </ul>
	`;
};
