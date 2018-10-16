const html = require('choo/html');
const downloadButton = require('../../templates/downloadButton');
const downloadedFiles = require('../../templates/uploadedFileList');
const split = require('../split');

module.exports = function(state, emit) {
  const fileInfo = state.fileInfo;

  const trySendLink = html`
    <a class="link link--action" href="/">
      ${state.translate('sendYourFilesLink')}
    </a>`;
  const cancelButton = html`
    <button class="btn--cancel"
      onclick=${cancel}
    >
      ${state.translate('downloadCancel')}
    </button>
  `;

  const bottomLink =
    state.transfer.state === 'downloading' ? cancelButton : trySendLink;

  return split(
    state,
    emit,
    downloadedFiles(fileInfo, state, emit),
    html`
    <div class="copySection">
      <div class="description">${state.translate('downloadMessage2')}</div>
      ${downloadButton(state, emit)}
      ${bottomLink}
    </div>`
  );

  function cancel() {
    if (state.transfer.state === 'downloading') {
      emit('cancel');
    }
  }
};
