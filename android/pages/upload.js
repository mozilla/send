const html = require('choo/html');

export default function progressBar(state, emit) {
  let percent = 0;
  if (state.transfer && state.transfer.progress) {
    percent = Math.floor(state.transfer.progressRatio * 100);
  }
  function onclick(e) {
    e.preventDefault();
    if (state.uploading) {
      emit('cancel');
    }
    emit('pushState', '/');
  }
  return html`<body>
  <div id="white">
    <div class="card">
      <div>${percent}%</div>
      <span class="progress" style="width: ${percent}%">.</span>
      <div class="cancel" onclick=${onclick}>CANCEL</div>
    </div>
  </div>
</body>`;
}
