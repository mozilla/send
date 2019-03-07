const fs = require('fs');
const path = require('path');
const { FluentBundle } = require('fluent');
const localesPath = path.resolve(__dirname, '../public/locales');
const locales = fs.readdirSync(localesPath);

function makeBundle(locale) {
  const bundle = new FluentBundle(locale, { useIsolating: false });
  bundle.addMessages(
    fs.readFileSync(path.resolve(localesPath, locale, 'send.ftl'), 'utf8')
  );
  return [locale, bundle];
}

const bundles = new Map(locales.map(makeBundle));

module.exports = function getTranslator(locale) {
  const defaultBundle = bundles.get('en-US');
  const bundle = bundles.get(locale) || defaultBundle;
  return function(id, data) {
    if (bundle.hasMessage(id)) {
      return bundle.format(bundle.getMessage(id), data);
    }
    return defaultBundle.format(defaultBundle.getMessage(id), data);
  };
};
