const { FluentResource } = require('fluent/compat');
const fs = require('fs');

function toJSON(resource) {
  return JSON.stringify(Array.from(resource));
}

module.exports = function(source) {
  const localeExp = /([^/]+)\/[^/]+\.ftl$/;
  const result = localeExp.exec(this.resourcePath);
  const locale = result && result[1];
  if (!locale) {
    throw new Error(`couldn't find locale in: ${this.resourcePath}`);
  }

  // Parse the current language's translation file.
  const locResource = FluentResource.fromString(source);
  let enResource;

  // If the current language is not en-US, also parse en-US to provide a
  // fallback for missing translations.
  if (locale !== 'en-US') {
    const en_ftl = fs.readFileSync(
      require.resolve('../public/locales/en-US/send.ftl'),
      'utf8'
    );
    enResource = FluentResource.fromString(en_ftl);
  }

  return `
module.exports = \`
if (typeof window === 'undefined') {
  var fluent = require('fluent');
}
(function () {
  let bundles = [
    ['${locale}', ${toJSON(locResource)}],
    ${enResource ? `['en-US', ${toJSON(enResource)}]` : ''}
  ].map(([locale, entries]) => {
    let bundle = new fluent.FluentBundle(locale, {useIsolating: false});
    bundle.addResource(new fluent.FluentResource(entries));
    return bundle;
  });

  function translate(id, data) {
    for (let bundle of bundles) {
      if (bundle.hasMessage(id)) {
        let message = bundle.getMessage(id);
        return bundle.format(message, data);
      }
    }
  }

  if (typeof window === 'undefined') {
    module.exports = translate;
  }
  else {
    window.translate = translate;
  }
})();
\``;
};
