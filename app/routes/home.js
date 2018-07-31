const welcome = require('../pages/welcome');

module.exports = function(state, emit) {
  return welcome(state, emit);
};
