const fileManager = require('../../templates/fileManager');
const split = require('../split');

module.exports = function(state, emit) {
  return split(state, emit, fileManager(state, emit));
};
