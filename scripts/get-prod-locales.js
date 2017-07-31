/* eslint-disable no-console */

const { exec } = require('child_process');
const fs = require('fs');

const pkg = require('../package.json');
const availableLanguages = pkg.availableLanguages.sort();

const compareLocales =
  'compare-locales l10n.toml . `ls public/locales` --data=json';

exec(compareLocales, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const missingLocales = (current, package) =>
    current.filter(locale => !package.includes(locale));
  const { summary } = JSON.parse(stdout);
  const locales = Object.keys(summary)
    .filter(locale => {
      const loc = summary[locale];
      const hasMissing = loc.hasOwnProperty('missing');
      const hasErrors = loc.hasOwnProperty('errors');
      return !hasMissing && !hasErrors;
    })
    .sort();

  if (locales.join(',') !== availableLanguages.join(',')) {
    const missing = missingLocales(locales, availableLanguages);
    console.log('current 100%:', JSON.stringify(locales));
    console.log('package.json:', JSON.stringify(availableLanguages));
    console.log('missing prod:', JSON.stringify(missing));

    if (process.argv.includes('--write')) {
      const pkgPath = require.resolve('../package.json');
      pkg.availableLanguages = locales;
      const str = JSON.stringify(pkg, null, 2) + '\n';
      console.log('Updating /package.json availableLanguages');
      fs.writeFileSync(pkgPath, str, 'utf-8');
    }
  } else {
    console.log('Production locales are up to date!');
  }
});
