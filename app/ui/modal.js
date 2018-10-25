const html = require('choo/html');

module.exports = function(state, emit) {
  return html`
  <div class="fixed pin flex items-center justify-center overflow-hidden z-40 bg-shades" onclick=${close}>
    <div class="rounded max-w-md bg-white" onclick=${e => e.stopPropagation()}>
      ${state.modal(state, emit, close)}
    </div>
  </div>`;

  function close(event) {
    state.modal = null;
    emit('render');
  }
};
