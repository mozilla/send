const { availableLanguages } = require('../package.json');
const config = require('./config');
const fs = require('fs');
const path = require('path');

function allLangs() {
  const langs = fs.readdirSync(path.join(__dirname, '..', 'public', 'locales'));
  langs.unshift('en-US'); // default first, TODO change for fluent-langneg
  return langs;
}

if (config.l10n_dev) {
  module.exports = allLangs();
} else {
  module.exports = availableLanguages;
}
