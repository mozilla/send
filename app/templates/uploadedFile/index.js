const html = require('choo/html');
const assets = require('../../../common/assets');
const bytes = require('../../utils').bytes;
const fileIcon = require('../fileIcon');

module.exports = function(file, index, state, emit, hasPassword) {
  const cancelVisible =
    state.route === '/' && !state.uploading
      ? 'uploadedFile__cancel--visible'
      : '';

  function cancel(event) {
    event.preventDefault();
    if (state.route === '/') {
      emit('removeUpload', { index });
    }
  }

  return html`
    <li class="uploadedFile" id="${file.id}">

      ${fileIcon(file.name, hasPassword)}

      <div class="uploadedFile__cancel ${cancelVisible}"
      onclick=${cancel}>
        <img
        src="${assets.get('close-16.svg')}"
        alt="cancel"/>
      </div>

      <div class="uploadedFile__fileData">
        <p class="uploadedFile__fileName">${file.name}</p>
        <p class="uploadedFile__fileInfo">
          <span>${bytes(file.size)}</span>
        </p>
      </div>
    </li>
  `;
};
