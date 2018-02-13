const html = require('choo/html');
const passwordInput = require('../passwordInput');

module.exports = function(state, emit) {
  const file = state.storage.getFileById(state.params.id);
  const div = html`
  <div class="setPasswordSection">
    <div class="checkbox">
      <input
        class="checkbox__input"
        id="add-password"
        type="checkbox"
        autocomplete="off"
        onchange=${togglePasswordInput}/>
      <label class="checkbox__label" for="add-password">
        ${state.translate('requirePasswordCheckbox')}
      </label>
    </div>
    ${passwordInput(
      state.translate('unlockInputPlaceholder'),
      state.translate('addPasswordButton'),
      addPassword
    )}
  </div>`;

  function addPassword(event) {
    event.preventDefault();
    const password = document.getElementById('password-input').value;
    if (password.length > 0) {
      emit('password', { password, file });
    }
    return false;
  }

  function togglePasswordInput(e) {
    const unlockInput = document.getElementById('password-input');
    const boxChecked = e.target.checked;
    document
      .querySelector('form.passwordInput')
      .classList.toggle('passwordInput--hidden', !boxChecked);
    if (boxChecked) {
      unlockInput.focus();
    } else {
      unlockInput.value = '';
    }
  }

  return div;
};
