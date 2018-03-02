const fs = require('fs');
const path = require('path');

function kv(f) {
  return `"${f}": require('../assets/${f}')`;
}

module.exports = function() {
  const files = fs.readdirSync(path.join(__dirname, '..', 'assets'));
  const code = `module.exports = {
    "package.json": require('../package.json'),
    ${files.map(kv).join(',\n')}
  };`;
  return {
    code,
    dependencies: files.map(f => require.resolve('../assets/' + f)),
    cacheable: true
  };
};
