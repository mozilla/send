const html = require('choo/html');

module.exports = function(state, emit) {
  return html`
  <div class="absolute pin flex items-center justify-center overflow-hidden my-8 z-40 bg-cloud" onclick=${close}>
    <div class="h-full max-h-screen absolute pin-t flex items-center">
      <div class="shadow-cloud bg-white" onclick=${e => e.stopPropagation()}>
        ${state.modal(state, emit, close)}
      </div>
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
