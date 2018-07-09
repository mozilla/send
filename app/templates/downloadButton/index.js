const html = require('choo/html');

module.exports = function(state, emit) {
  return html`
    <button class="btn btn--download"
      onclick=${download}>${state.translate('downloadButtonLabel')}
    </button>`;

  function download(event) {
    event.preventDefault();
    console.log("DOWNLOAD FIRE")
    emit('download', state.fileInfo);
  }
};
