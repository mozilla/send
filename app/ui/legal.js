const html = require('choo/html');
const raw = require('choo/html/raw');
const modal = require('./modal');

module.exports = function(state, emit) {
  return html`
    <main class="main">
      ${state.modal && modal(state, emit)}
      <div
        class="flex flex-col items-center bg-white m-4 px-6 py-8 border border-grey-light md:border-none md:px-12 md:py-16 shadow w-full md:h-full"
      >
        <h1 class="text-center">${state.translate('legalTitle')}</h1>
        <p class="mt-2">${state.translate('legalDateStamp')}</p>
        <div class="overflow-scroll px-4">
          ${raw(
            replaceLinks(state.translate('legalNoticeSend'), [
              'https://www.mozilla.org/privacy/',
              'https://github.com/mozilla/send/blob/master/docs/metrics.md'
            ])
          )}
          <ul class="mt-10 max-w-md leading-normal">
            <li class="mb-4">
              <b>${state.translate('legalNoticeSendContentHeader')}:</b>
              ${state.translate('legalNoticeSendContent')}
            </li>
            <li class="mb-4">
              <b>${state.translate('legalNoticeSendDataHeader')}:</b>
              ${state.translate('legalNoticeSendData')}
            </li>
            <li class="mb-4">
              <b>${state.translate('legalNoticeSendPersonalHeader')}:</b>
              ${state.translate('legalNoticeSendPersonal')}:
              <ul class="leading-normal">
                <li class="my-4">
                  <u>${state.translate('legalNoticeSendIPHeader')}:</u>
                  ${state.translate('legalNoticeSendIP')}
                </li>
                <li class="mb-4">
                  <u>${state.translate('legalNoticeSendFXAHeader')}:</u>
                  ${state.translate('legalNoticeSendFXA')}
                </li>
              </ul>
            </li>
            <li class="mb-4">
              <b>${state.translate('legalNoticeSendNonPersonalHeader')}:</b>
              ${state.translate('legalNoticeSendNonPersonal')}:
              <ul class="leading-normal">
                <li class="my-4">
                  <u>${state.translate('legalNoticeSendInteractionHeader')}:</u>
                  ${state.translate('legalNoticeSendInteraction')}
                </li>
                <li class="mb-4">
                  <u>${state.translate('legalNoticeSendTechnicalHeader')}:</u>
                  ${state.translate('legalNoticeSendTechnical')}
                </li>
              </ul>
            </li>
            <li class="mb-4">
              <b>${state.translate('legalNoticeSendThirdPartyHeader')}:</b>
              ${state.translate('legalNoticeSendThirdParty')}
            </li>
          </ul>
        </div>
      </div>
    </main>
  `;
};

function replaceLinks(str, urls) {
  let i = 0;
  const s = str.replace(
    /<a>([^<]+)<\/a>/g,
    (m, v) => `<a class="text-blue" href="${urls[i++]}">${v}</a>`
  );
  return `<p class="mt-10 max-w-md leading-normal">${s}</p>`;
}
