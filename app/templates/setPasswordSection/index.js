const html = require('choo/html');
const passwordInput = require('../passwordInput');

module.exports = function(state) {
  const checked = state.password ? 'checked' : '';
  const label = state.password ? 'addPasswordLabel' : 'addPasswordMessage';

  return html`
  <div class="setPasswordSection">
    <div class="checkbox">
      <input
        class="checkbox__input" id="add-password"
        type="checkbox"
        ${checked}
        autocomplete="off"
        onchange=${togglePasswordInput}/>
      <label class="checkbox__label" for="add-password">
        ${state.translate(label)}
      </label>
    </div>

    ${passwordInput(state)}

  </div>`;

  function togglePasswordInput(e) {
    const unlockInput = document.getElementById('password-input');
    const boxChecked = e.target.checked;
    document
      .querySelector('.passwordInput')
      .classList.toggle('passwordInput--hidden', !boxChecked);

    const label = document.querySelector('.checkbox__label');
    if (boxChecked) {
      label.innerHTML = state.translate('addPasswordLabel');
      unlockInput.focus();
    } else {
      label.innerHTML = state.translate('addPasswordMessage');
      unlockInput.value = '';
    }
  }
};
