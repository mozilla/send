const html = require('choo/html');
const percent = require('../../utils').percent;

module.exports = function(state, emit) {
  const downloadState = state.transfer.state;
  const progress = percent(state.transfer.progressRatio);

  let btnText = '';
  let btnClass = '';

  if (downloadState === 'complete') {
    btnText = state.translate('downloadFinish');
    btnClass = 'btn--complete';
  } else if (downloadState === 'decrypting') {
    btnText = state.translate('decryptingFile');
    btnClass = 'btn--blueStripes';
  } else if (downloadState === 'downloading') {
    btnText = state.translate('downloadProgressButton', { progress });
    btnClass = 'btn--blueStripes';
  } else {
    btnText = state.translate('downloadButtonLabel');
  }

  return html`
    <button class="btn btn--download ${btnClass}"
      onclick=${download}>
        ${btnText}
    </button>`;

  function download(event) {
    event.preventDefault();
    event.target.disabled = true;
    if (downloadState === 'ready') {
      emit('download', state.fileInfo);
    }
  }
};
