const preview = require('../pages/preview');
const download = require('../pages/download');
const notFound = require('../pages/notFound');
const downloadPassword = require('../templates/downloadPassword');
const downloadButton = require('../templates/downloadButton');

function hasFileInfo() {
  return !!document.getElementById('dl-file');
}

function getFileInfoFromDOM() {
  const el = document.getElementById('dl-file');
  if (!el) {
    return null;
  }
  return {
    nonce: el.getAttribute('data-nonce'),
    requiresPassword: !!+el.getAttribute('data-requires-password')
  };
}

function createFileInfo(state) {
  const metadata = getFileInfoFromDOM();
  return {
    id: state.params.id,
    secretKey: state.params.key,
    nonce: metadata.nonce,
    requiresPassword: metadata.requiresPassword
  };
}

module.exports = function(state, emit) {
  if (!state.fileInfo) {
    // This is a fresh page load
    // We need to parse the file info from the server's html
    if (!hasFileInfo()) {
      return notFound(state, emit);
    }
    state.fileInfo = createFileInfo(state);

    if (!state.fileInfo.requiresPassword) {
      emit('getMetadata');
    }
  }

  let pageAction = null; //default state: we don't have file metadata
  if (state.transfer) {
    const s = state.transfer.state;
    if (['downloading', 'decrypting', 'complete'].indexOf(s) > -1) {
      // Downloading is in progress
      return download(state, emit);
    }
    // we have file metadata
    pageAction = downloadButton(state, emit);
  } else if (state.fileInfo.requiresPassword && !state.fileInfo.password) {
    // we're waiting on the user for a valid password
    pageAction = downloadPassword(state, emit);
  }
  return preview(state, pageAction);
};
