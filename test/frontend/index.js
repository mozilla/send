const fs = require('fs');
const path = require('path');

function kv(f) {
  return `require('./tests/${f}')`;
}

module.exports = function() {
  const files = fs.readdirSync(path.join(__dirname, 'tests'));
  const code = files.map(kv).join(';\n');
  return {
    code,
    dependencies: files.map(f => require.resolve('./tests/' + f)),
    cacheable: false
  };
};
