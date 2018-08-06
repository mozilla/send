const html = require('choo/html');
const assets = require('../../../common/assets');
const bytes = require('../../utils').bytes;
const fileIcon = require('../fileIcon');

module.exports = function(file, index, state, emit, hasPassword) {
  const transfer = state.transfer;
  const transferState = transfer ? transfer.state : null;
  const share = state.route.includes('share/');
  const complete = share ? 'uploadedFile--completed' : '';

  const cancelVisible =
    state.route === '/' && !state.uploading
      ? 'uploadedFile__cancel--visible'
      : '';

  const stampClass =
    share || transferState === 'complete' ? 'uploadedFile__stamp--visible' : '';

  function cancel(event) {
    event.preventDefault();
    if (state.route === '/') {
      emit('removeUpload', { index });
    }
  }

  return html`
    <li class="uploadedFile ${complete}" id="${file.id}" 
    >

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

      <img src="${assets.get('sent-done.svg')}"
           class="uploadedFile__stamp ${stampClass}"/> 
    </li>
  `;
};
