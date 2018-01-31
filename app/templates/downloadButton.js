const html = require('choo/html');

module.exports = function(state, emit) {
  function download(event) {
    event.preventDefault();
    emit('download', state.fileInfo);
  }

  return html`
  <div>
    <button id="download-btn"
      class="btn"
      onclick=${download}>${state.translate('downloadButtonLabel')}
    </button>
  </div>`;
};
