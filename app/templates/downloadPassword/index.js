const html = require('choo/html');

module.exports = function(state, emit) {
  const fileInfo = state.fileInfo;
  const invalid = fileInfo.password === null;
  const label = invalid
    ? html`
          <label class="error" for="password-input">
            ${state.translate('passwordTryAgain')}
          </label>`
    : html`
          <label for="password-input">
            ${state.translate('unlockInputLabel')}
          </label>`;
  const inputClass = invalid
    ? 'input input--noBtn input--error'
    : 'input input--noBtn';
  const div = html`
    <div class="passwordSection">
      ${label}
      <form class="passwordForm" onsubmit=${checkPassword} data-no-csrf>
        <input id="password-input"
          class="${inputClass}"
          maxlength="64"
          autocomplete="off"
          placeholder="${state.translate('unlockInputPlaceholder')}"
          oninput=${inputChanged}
          type="password" />
        <input type="submit"
          id="password-btn"
          class="inputBtn inputBtn--hidden"
          value="${state.translate('unlockButtonLabel')}"/>
      </form>
    </div>`;

  if (!(div instanceof String)) {
    setTimeout(() => document.getElementById('password-input').focus());
  }

  function inputChanged() {
    const input = document.getElementById('password-input');
    const btn = document.getElementById('password-btn');
    input.classList.remove('input--error');
    if (input.value.length > 0) {
      btn.classList.remove('inputBtn--hidden');
      input.classList.remove('input--noBtn');
    } else {
      btn.classList.add('inputBtn--hidden');
      input.classList.add('input--noBtn');
    }
  }

  function checkPassword(event) {
    event.preventDefault();
    const password = document.getElementById('password-input').value;
    if (password.length > 0) {
      document.getElementById('password-btn').disabled = true;
      state.fileInfo.url = window.location.href;
      state.fileInfo.password = password;
      emit('getMetadata');
    }
    return false;
  }

  return div;
};
