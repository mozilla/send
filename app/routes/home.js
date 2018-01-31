const welcome = require('../pages/welcome');
const upload = require('../pages/upload');

module.exports = function(state, emit) {
  if (state.uploading) {
    return upload(state, emit);
  }
  return welcome(state, emit);
};
