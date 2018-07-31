const preview = require('../pages/preview');
const password = require('../pages/password');

module.exports = function(state, emit) {
  if (!state.fileInfo) {
    emit('getPasswordExist', { id: state.params.id });
    return;
  }

  state.fileInfo.id = state.params.id;
  state.fileInfo.secretKey = state.params.key;

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
