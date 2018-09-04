const { FluentBundle } = require('fluent');
const fs = require('fs');

function toJSON(map) {
  return JSON.stringify(Array.from(map));
}

function merge(m1, m2) {
  const result = new Map(m1);
  for (const [k, v] of m2) {
    result.set(k, v);
  }
  return result;
}

module.exports = function(source) {
  const localeExp = /([^/]+)\/[^/]+\.ftl$/;
  const result = localeExp.exec(this.resourcePath);
  const locale = result && result[1];
  if (!locale) {
    throw new Error(`couldn't find locale in: ${this.resourcePath}`);
  }
  // load default language and "merge" contexts
  // TODO: make this configurable
  const en_ftl = fs.readFileSync(
    require.resolve('../public/locales/en-US/send.ftl'),
    'utf8'
  );
  const en = new FluentBundle('en-US');
  en.addMessages(en_ftl);
  // pre-parse the ftl
  const context = new FluentBundle(locale);
  context.addMessages(source);

  const merged = merge(en._messages, context._messages);
  return `
module.exports = \`
if (typeof window === 'undefined') {
  var fluent = require('fluent');
}
(function () {
  var bundle = new fluent.FluentBundle('${locale}', {useIsolating: false});
  bundle._messages = new Map(${toJSON(merged)});
  function translate(id, data) {
    var msg = bundle.getMessage(id);
    if (typeof(msg) !== 'string' && !msg.val && msg.attrs) {
      msg = msg.attrs.title || msg.attrs.alt
    }
    return bundle.format(msg, data);
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
