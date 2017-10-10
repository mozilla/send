const preview = require('../templates/preview');
const download = require('../templates/download');

module.exports = function(state, emit) {
  if (state.transfer) {
    const s = state.transfer.state;
    if (s === 'downloading' || s === 'complete') {
      return download(state, emit);
    }
  }
  return preview(state, emit);
};
