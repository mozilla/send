const html = require('choo/html');

module.exports = function(state, emit) {
  return html`
  <div class="absolute pin flex items-center justify-center overflow-hidden z-40 bg-shades" onclick=${close}>
    <div class="border-modal bg-white" onclick=${e => e.stopPropagation()}>
      ${state.modal(state, emit, close)}
    </div>
  </div>`;

  function close(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    state.modal = null;
    emit('render');
  }
};
