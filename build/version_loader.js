const version = require('../package.json').version;

module.exports = function(source) {
  return source.replace('VERSION', version);
};
