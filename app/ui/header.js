const html = require('choo/html');
const account = require('./account');

module.exports = function(state, emit) {
  const header = html`
  <header class="flex-none flex flex-row items-center justify-between bg-white w-full px-4 h-12 md:shadow-md">
    <a
      class="header-logo"
      href="/">
      <h1 class="text-black font-normal">Firefox <b>Send</b></h1>
    </a>
    ${account(state, emit)}
  </header>`;
  // HACK
  // We only want to render this once because we
  // toggle the targets of the links with utils/openLinksInNewTab
  // header.isSameNode = function(target) {
  //   return target && target.nodeName && target.nodeName === 'HEADER';
  // };
  return header;
};
