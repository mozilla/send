const html = require('choo/html');
const titleSection = require('../../templates/title');
const downloadButton = require('../../templates/downloadButton');
const downloadedFiles = require('../../templates/uploadedFileList');

module.exports = function(state, emit) {
  const storageFile = state.storage.getFileById(state.params.id);
  const multifiles = Array.from(storageFile.manifest.files);

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

  return html`
    <div class="page">
      ${titleSection(state)}

      ${downloadedFiles(multifiles, state, emit)}
      <div class="description">${state.translate('downloadMessage2')}</div>
      ${downloadButton(state, emit)}

      ${bottomLink}

    </div>
  `;

  function cancel() {
    if (state.transfer.state === 'downloading') {
      emit('cancel');
    }
  }
};
