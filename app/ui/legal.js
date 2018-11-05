const html = require('choo/html');
const raw = require('choo/html/raw');

module.exports = function(state) {
  return html`
  <main class="main container">
  <div class="flex flex-col items-center bg-white m-6 px-6 py-8 border border-grey-light md:border-none md:px-12 md:py-16 shadow w-full md:h-full">
      <h1 class="text-2xl text-center">${state.translate('legalHeader')}</h1>
      ${raw(
        replaceLinks(state.translate('legalNoticeTestPilot'), [
          'https://testpilot.firefox.com/terms',
          'https://testpilot.firefox.com/privacy',
          'https://testpilot.firefox.com/experiments/send'
        ])
      )}
      ${raw(
        replaceLinks(state.translate('legalNoticeMozilla'), [
          'https://www.mozilla.org/privacy/websites/',
          'https://www.mozilla.org/about/legal/terms/mozilla/'
        ])
      )}
    </div>
  </main>`;
};

function replaceLinks(str, urls) {
  let i = 0;
  const s = str.replace(
    /<a>([^<]+)<\/a>/g,
    (m, v) => `<a class="text-blue" href="${urls[i++]}">${v}</a>`
  );
  return `<p class="mt-10 max-w-md leading-normal">${s}</p>`;
}
