const fileManager = require('../../templates/fileManager');
const split = require('../split');

module.exports = function(state, emit) {
  return split(state, fileManager(state, emit));
};
