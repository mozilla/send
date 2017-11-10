const { availableLanguages } = require('../package.json');
const config = require('./config');
const fs = require('fs');
const path = require('path');

function allLangs() {
  return fs.readdirSync(
    path.join(__dirname, '..', 'dist', 'public', 'locales')
  );
}

if (config.l10n_dev) {
  module.exports = allLangs();
} else {
  module.exports = availableLanguages;
}
