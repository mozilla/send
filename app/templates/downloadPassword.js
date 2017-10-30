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
          maxlength="64"
          autocomplete="off"
          placeholder="${state.translate('unlockInputPlaceholder')}"
          type="password"/>
        <input type="submit"
          id="unlock-btn"
          class="btn"
          value="${state.translate('unlockButtonLabel')}"/>
      </form>
    </div>`;

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
