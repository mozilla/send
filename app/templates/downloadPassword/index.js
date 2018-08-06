const html = require('choo/html');

module.exports = function(state, emit) {
  const fileInfo = state.fileInfo;
  const invalid = fileInfo.password === null;

  const visible = invalid ? 'visible' : '';
  const invalidBtn = invalid ? 'unlockBtn--error' : '';

  const div = html`
    <div class="passwordSection">
      
      <label 
        class="error passwordForm__error ${visible}" 
        for="password-input">
        ${state.translate('passwordTryAgain')}
      </label>

      <form class="passwordForm" onsubmit=${checkPassword} data-no-csrf>
        <input id="password-input"
          class="input passwordForm__input"
          maxlength="64"
          autocomplete="off"
          placeholder="${state.translate('unlockInputPlaceholder')}"
          oninput=${inputChanged}
          type="password" />

        <input type="submit"
          id="password-btn"
          class="btn unlockBtn ${invalidBtn}"
          value="${state.translate('unlockInputLabel')}"/>

      </form>
    </div>`;

  if (!(div instanceof String)) {
    setTimeout(() => document.getElementById('password-input').focus());
  }

  function inputChanged() {
    const input = document.querySelector('.passwordForm__error');
    input.classList.remove('visible');
    const btn = document.getElementById('password-btn');
    btn.classList.remove('unlockBtn--error');
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
