const html = require('choo/html');
const account = require('./account');

module.exports = function(state, emit) {
  const header = html`
  <header class="relative flex-none flex flex-row items-center justify-between bg-white w-full px-6 h-16 shadow z-20">
    <a
      class="header-logo"
      href="/">
      <h1 class="text-black font-normal">Firefox <b>Send</b></h1>
    </a>
    ${account(state, emit)}
    <div class="invisible absolute pin-t pin-l mt-12 w-full flex flex-col items-center pointer-events-none">
      <div class="border rounded bg-grey-darkest text-white mt-2 p-2">Your upload has finished.<button class="border border-blue rounded-sm bg-blue text-white inline-block p-1 ml-2">Copy Link</button><button class="text-white inline-block p-1 ml-2">ⓧ</button></div>
      ${state.toast ? state.toast() : ''}
    </div>
  </header>`;
  // HACK
  // We only want to render this once because we
  // toggle the targets of the links with utils/openLinksInNewTab
  // header.isSameNode = function(target) {
  //   return target && target.nodeName && target.nodeName === 'HEADER';
  // };
  return header;
};
