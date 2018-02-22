const html = require('choo/html');
const raw = require('choo/html/raw');

module.exports = function(state) {
  return html`
    <div>
      <div class="title">${state.translate('legalHeader')}</div>
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
  `;
};

function replaceLinks(str, urls) {
  let i = 0;
  const s = str.replace(
    /<a>([^<]+)<\/a>/g,
    (m, v) => `<a href="${urls[i++]}">${v}</a>`
  );
  return `<div class="description">${s}</div>`;
}
