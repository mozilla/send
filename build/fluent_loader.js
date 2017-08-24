const { MessageContext } = require('fluent');

function toJSON(map) {
  return JSON.stringify(Array.from(map));
}

module.exports = function(source) {
  const localeExp = this.options.locale || /([^/]+)\/[^/]+\.ftl$/;
  const result = localeExp.exec(this.resourcePath);
  const locale = result && result[1];
  // pre-parse the ftl
  const context = new MessageContext(locale);
  context.addMessages(source);
  if (!locale) {
    throw new Error(`couldn't find locale in: ${this.resourcePath}`);
  }
  return `
module.exports = \`
if (typeof window === 'undefined') {
  var fluent = require('fluent');
}
var ctx = new fluent.MessageContext('${locale}', {useIsolating: false});
ctx._messages = new Map(${toJSON(context._messages)});
function translate(id, data) {
  var msg = ctx.getMessage(id);
  if (typeof(msg) !== 'string' && !msg.val && msg.attrs) {
    msg = msg.attrs.title || msg.attrs.alt
  }
  return ctx.format(msg, data);
}
if (typeof window === 'undefined') {
  module.exports = translate;
}
else {
  window.translate = translate;
}
\``;
};
