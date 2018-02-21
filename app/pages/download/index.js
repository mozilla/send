const html = require('choo/html');
const progress = require('../../templates/progress');
const { bytes } = require('../../utils');

module.exports = function(state, emit) {
  const transfer = state.transfer;
  const cancelBtn = html`
  <button
    id="cancel"
    class="btn btn--cancel"
    title="${state.translate('deletePopupCancel')}"
    onclick=${cancel}>
    ${state.translate('deletePopupCancel')}
  </button>`;

  return html`
    <div class="page effect--fadeIn">
      <div class="title">
        ${state.translate('downloadingPageProgress', {
          filename: state.fileInfo.name,
          size: bytes(state.fileInfo.size)
        })}
      </div>
      <div class="description">
        ${state.translate('downloadingPageMessage')}
      </div>
      ${progress(transfer.progressRatio, transfer.progressIndefinite)}
      <div class="progressSection">
        <div class="progressSection__text">
          ${state.translate(transfer.msg, transfer.sizes)}
        </div>
        ${transfer.state === 'downloading' ? cancelBtn : null}
      </div>
    </div>
  `;

  function cancel() {
    const btn = document.getElementById('cancel');
    btn.remove();
    emit('cancel');
  }
};
