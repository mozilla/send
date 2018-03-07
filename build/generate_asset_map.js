/*
  This code is included by both the server and frontend via
  common/assets.js

  When included from the server the export will be the function.

  When included from the frontend (via webpack) the export will
  be an object mapping file names to hashed file names. Example:
  "send_logo.svg": "send_logo.5fcfdf0e.svg"
*/

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
