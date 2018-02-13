const html = require('choo/html');
const progress = require('../../templates/progress');
const { bytes } = require('../../utils');

module.exports = function(state, emit) {
  const transfer = state.transfer;

  const div = html`
  <div class="page effect--fadeIn">
    <div class="title">
      ${state.translate('uploadingPageProgress', {
        filename: transfer.file.name,
        size: bytes(transfer.file.size)
      })}
    </div>
    <div class="description"></div>
    ${progress(transfer.progressRatio)}
    <div class="progressSection">
      <div class="progressSection__text">
        ${state.translate(transfer.msg, transfer.sizes)}
      </div>
      <button
        id="cancel-upload"
        class="btn btn--cancel"
        title="${state.translate('uploadingPageCancel')}"
        onclick=${cancel}>
        ${state.translate('uploadingPageCancel')}
      </button>
    </div>
  </div>
  `;

  function cancel() {
    const btn = document.getElementById('cancel-upload');
    btn.disabled = true;
    btn.textContent = state.translate('uploadCancelNotification');
    emit('cancel');
  }
  return div;
};
