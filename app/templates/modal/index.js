const html = require('choo/html');

module.exports = function(state, emit) {
  return html`
  <div class="modal" onclick=${close}>
    <div class="modal__box" onclick=${e => e.stopPropagation()}>
      ${state.modal(state, close)}
    </div>
  </div>`;

  function close(event) {
    state.modal = null;
    emit('render');
  }
};
