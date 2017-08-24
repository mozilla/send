const preview = require('../templates/preview');
const download = require('../templates/download');

module.exports = function(state, emit) {
  if (state.transfer) {
    return download(state, emit);
  }
  return preview(state, emit);
};
