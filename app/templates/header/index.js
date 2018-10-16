const html = require('choo/html');
const assets = require('../../../common/assets');

module.exports = function() {
  const header = html`
  <header class="header">
    <a href="/"><img src="${assets.get('send_logo.svg')}"/></a>
    <a href="/"><h1>Firefox Send</h1></a>
  </header>`;
  // HACK
  // We only want to render this once because we
  // toggle the targets of the links with utils/openLinksInNewTab
  header.isSameNode = function(target) {
    return target && target.nodeName && target.nodeName === 'HEADER';
  };
  return header;
};
