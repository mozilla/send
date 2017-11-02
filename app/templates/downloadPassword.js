const html = require('choo/html');

module.exports = function(state, emit) {
  const fileInfo = state.fileInfo;
  const label =
    fileInfo.password === null
      ? html`
          <label class="red"
            for="unlock-input">${state.translate('passwordTryAgain')}</label>`
      : html`
          <label for="unlock-input">
            ${state.translate('unlockInputLabel')}
          </label>`;
  const div = html`
    <div class="enterPassword">
      ${label}
      <form id="unlock" onsubmit=${checkPassword}>
        <input id="unlock-input"
          class="unlock-input input-no-btn"
          maxlength="64"
          autocomplete="off"
          placeholder="${state.translate('unlockInputPlaceholder')}"
          oninput=${inputChanged}
          type="password"/>
        <input type="submit"
          id="unlock-btn"
          class="btn btn-hidden"
          value="${state.translate('unlockButtonLabel')}"/>
      </form>
    </div>`;

  function inputChanged() {
    const input = document.getElementById('unlock-input');
    const btn = document.getElementById('unlock-btn');
    if (input.value.length > 0) {
      btn.classList.remove('btn-hidden');
      input.classList.remove('input-no-btn');
    } else {
      btn.classList.add('btn-hidden');
      input.classList.add('input-no-btn');
    }
  }

  function checkPassword(event) {
    event.preventDefault();
    const password = document.getElementById('unlock-input').value;
    if (password.length > 0) {
      document.getElementById('unlock-btn').disabled = true;
      state.fileInfo.url = window.location.href;
      state.fileInfo.password = password;
      emit('preview');
    }
  }

  return div;
};
