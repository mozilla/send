/* global downloadMetadata */
const preview = require('../pages/preview');
const password = require('../pages/password');

function createFileInfo(state) {
  return {
    id: state.params.id,
    secretKey: state.params.key,
    nonce: downloadMetadata.nonce,
    requiresPassword: downloadMetadata.pwd
  };
}

module.exports = function(state, emit) {
  if (!state.fileInfo) {
    state.fileInfo = createFileInfo(state);
  }

  if (!state.transfer && !state.fileInfo.requiresPassword) {
    emit('getMetadata');
  }

  if (state.transfer) {
    return preview(state, emit);
  }

  if (state.fileInfo.requiresPassword && !state.fileInfo.password) {
    return password(state, emit);
  }
};
