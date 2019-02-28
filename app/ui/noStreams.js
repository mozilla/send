const html = require('choo/html');
const { bytes } = require('../utils');
const assets = require('../../common/assets');

module.exports = function(state, emit) {
  const archive = state.fileInfo;
  return html`
    <div
      class="flex flex-col w-full max-w-md h-full mx-auto items-center justify-center"
    >
      <h1 class="mb-4">${state.translate('downloadFilesTitle')}</h1>
      <p
        class="w-full p-2 border border-yellow-light rounded md:w-4/5 text-orange-dark bg-yellow-lighter text-center leading-normal"
      >
        ⚠️ ${state.translate('noStreamsWarning')} ⚠️
      </p>
      <form class="md:w-128" onsubmit=${submit}>
        <fieldset class="border rounded p-4 my-4" onchange=${optionChanged}>
          <div class="flex items-center mb-2">
            <img class="mr-3 flex-no-shrink" src="${assets.get(
              'blue_file.svg'
            )}"/>
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
            class="btn rounded-lg w-full flex flex-no-shrink items-center justify-center"
            value="${state.translate('copyUrlFormButtonText')}"
            title="${state.translate('copyUrlFormButtonText')}"
            type="submit" />
      </form>
    </div>
  `;

  function optionChanged(event) {
    event.stopPropagation();
    const choice = event.target.value;
    const button = event.currentTarget.nextElementSibling;
    let title = button.title;
    switch (choice) {
      case 'copy':
        title = state.translate('copyUrlFormButtonText');
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
