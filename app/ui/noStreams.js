const html = require('choo/html');
const { bytes } = require('../utils');
const assets = require('../../common/assets');

module.exports = function(state, emit) {
  const archive = state.fileInfo;
  return html`
    <div
      class="flex flex-col w-full max-w-md h-full mx-auto items-center justify-center"
    >
      <h1 class="mb-4 text-3xl font-bold">${state.translate(
        'downloadTitle'
      )}</h1>
      <p
        class="w-full p-2 border border-yellow-50 rounded md:w-4/5 text-orange-60 bg-yellow-40 text-center leading-normal"
      >
        ⚠️ ${state.translate('noStreamsWarning')} ⚠️
      </p>
      <form class="md:w-128" onsubmit=${submit}>
        <fieldset class="border rounded p-4 my-4" onchange=${optionChanged}>
          <div class="flex items-center mb-2">
            <svg class="h-8 w-6 mr-3 flex-shrink-0 text-white dark:text-grey-90">
              <use xlink:href="${assets.get('blue_file.svg')}#icon"/>
            </svg>
            <p class="flex-grow">
              <h1 class="text-base font-medium word-break-all">${
                archive.name
              }</h1>
              <div class="text-sm font-normal opacity-75 pt-1">${bytes(
                archive.size
              )}</div>
            </p>
          </div>
          <div class=" mt-6 mb-3">
            <input class="mx-2" type="radio" name="gus" id="copy" value="copy" checked>
            <label class="" for="copy">${state.translate(
              'noStreamsOptionCopy'
            )}</label>
          </div>
          <div class="my-3">
            <input class="mx-2" type="radio" name="gus" id="firefox" value="firefox">
            <label class="" for="firefox">${state.translate(
              'noStreamsOptionFirefox'
            )}</label>
          </div>
          <div class="mt-3">
            <input class="mx-2" type="radio" name="gus" id="download" value="download">
            <label class="" for="download">${state.translate(
              'noStreamsOptionDownload'
            )}</label>
          </div>
        </fieldset>
        <input
            class="btn rounded-lg w-full flex flex-shrink-0 items-center justify-center"
            value="${state.translate('copyLinkButton')}"
            title="${state.translate('copyLinkButton')}"
            type="submit" />
            <p
          class="text-grey-80 leading-normal dark:text-grey-40 font-semibold text-center md:my-8 md:text-left"
        >
          ${state.translate('downloadConfirmDescription')}
        </p>
      </form>
    </div>
  `;

  function optionChanged(event) {
    event.stopPropagation();
    const choice = event.target.value;
    const button = event.currentTarget.nextElementSibling;
    let title = button.title;
    console.error(choice, title);
    switch (choice) {
      case 'copy':
        title = state.translate('copyLinkButton');
        break;
      case 'firefox':
        title = state.translate('downloadFirefox');
        break;
      case 'download':
        title = state.translate('downloadButtonLabel');
        break;
    }
    button.title = title;
    button.value = title;
  }

  function submit(event) {
    const action = document.querySelector('input[type="radio"]:checked').value;
    switch (action) {
      case 'copy':
        emit('copy', { url: window.location.href });
        document.querySelector('input[type="submit"]').value = state.translate(
          'copiedUrl'
        );
        break;
      case 'firefox':
        window.open(
          'https://www.mozilla.org/firefox/new/?utm_campaign=send-acquisition&utm_medium=referral&utm_source=send.firefox.com'
        );
        break;
      case 'download':
        emit('download', archive);
        break;
    }
    return false;
  }
};
