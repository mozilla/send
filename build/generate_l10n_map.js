/*
  This code is included by both the server and frontend via
  common/locales.js

  When included from the server the export will be the function.

  When included from the frontend (via webpack) the export will
  be an object mapping ftl files to js files. Example:
  "public/locales/en-US/send.ftl":"public/locales/en-US/send.6b4f8354.js"
*/

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
    cacheable: true
  };
};
