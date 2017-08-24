const fs = require('fs');
const path = require('path');

function kv(d) {
  return `"${d}": require('../public/locales/${d}/send.ftl')`;
}

module.exports = function() {
  const dirs = fs.readdirSync(path.join(__dirname, '..', 'public', 'locales'));
  const code = `
  module.exports = {
    translate: function (id, data) { return window.translate(id, data) },
    ${dirs.map(kv).join(',\n')}
  };`;
  return {
    code,
    dependencies: dirs.map(d =>
      require.resolve(`../public/locales/${d}/send.ftl`)
    ),
    cacheable: false
  };
};
