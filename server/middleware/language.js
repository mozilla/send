const { availableLanguages } = require('../../package.json');
const config = require('../config');
const fs = require('fs');
const path = require('path');
const { negotiateLanguages } = require('fluent-langneg');
const langData = require('cldr-core/supplemental/likelySubtags.json');
const acceptLanguages = /(([a-zA-Z]+(-[a-zA-Z0-9]+){0,2})|\*)(;q=[0-1](\.[0-9]+)?)?/g;

function allLangs() {
  return fs.readdirSync(
    path.join(__dirname, '..', '..', 'dist', 'public', 'locales')
  );
}

const languages = config.l10n_dev ? allLangs() : availableLanguages;

module.exports = function(req, res, next) {
  const header = req.headers['accept-language'] || 'en-US';
  if (header.length > 255) {
    req.language = 'en-US';
    return next();
  }
  const langs = header.replace(/\s/g, '').match(acceptLanguages);
  const preferred = langs
    .map(l => {
      const parts = l.split(';');
      return {
        locale: parts[0],
        q: parts[1] ? parseFloat(parts[1].split('=')[1]) : 1
      };
    })
    .sort((a, b) => b.q - a.q)
    .map(x => x.locale);
  req.language = negotiateLanguages(preferred, languages, {
    strategy: 'lookup',
    likelySubtags: langData.supplemental.likelySubtags,
    defaultLocale: 'en-US'
  })[0];
  next();
};
