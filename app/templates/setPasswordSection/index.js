const html = require('choo/html');
const passwordInput = require('../passwordInput');

module.exports = function(state, emit) {
  const file = state.storage.getFileById(state.params.id);

  return html`
  <div class="setPasswordSection">
    <div class="checkbox">
      <input
        ${file.hasPassword ? 'disabled' : ''}
        ${file.hasPassword ? 'checked' : ''}
        class="checkbox__input"
        id="add-password"
        type="checkbox"
        autocomplete="off"
        onchange=${togglePasswordInput}/>
      <label class="checkbox__label" for="add-password">
        ${state.translate('requirePasswordCheckbox')}
      </label>
    </div>
    ${passwordInput(file, state, emit)}
  </div>`;

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
};
