const html = require('choo/html');
const progress = require('../templates/progress');
const { bytes } = require('../utils');

module.exports = function(state, emit) {
  const transfer = state.transfer;
  const cancelBtn = html`
  <button
    id="cancel-upload"
    title="${state.translate('deletePopupCancel')}"
    onclick=${cancel}>
    ${state.translate('deletePopupCancel')}
  </button>`;

  const div = html`
  <div id="page-one">
    <div id="download">
      <div id="download-progress" class="fadeIn">
        <div id="dl-title" class="title">
          ${state.translate('downloadingPageProgress', {
            filename: state.fileInfo.name,
            size: bytes(state.fileInfo.size)
          })}
        </div>
        <div class="description">
          ${state.translate('downloadingPageMessage')}
        </div>
        ${progress(transfer.progressRatio)}
        <div class="upload">
          <div class="progress-text">
            ${state.translate(transfer.msg, transfer.sizes)}
          </div>
          ${transfer.state === 'downloading' ? cancelBtn : null}
        </div>
      </div>
    </div>
  </div>
  `;

  function cancel() {
    const btn = document.getElementById('cancel-upload');
    btn.remove();
    emit('cancel');
  }
  return div;
};
