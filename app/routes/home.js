const welcome = require('../pages/welcome');
const upload = require('../pages/upload');

module.exports = function(state, emit) {
  if (state.transfer) {
    return upload(state, emit);
  }
  return welcome(state, emit);
};
