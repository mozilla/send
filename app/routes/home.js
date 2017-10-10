const welcome = require('../templates/welcome');
const upload = require('../templates/upload');

module.exports = function(state, emit) {
  if (state.transfer && state.transfer.iv) {
    //TODO relying on 'iv' is gross
    return upload(state, emit);
  }
  return welcome(state, emit);
};
