const html = require('choo/html');

module.exports = function(file, state, emit) {
  const setting = state.settingPassword;
  const formClass = file.hasPassword
    ? 'passwordInput'
    : 'passwordInput passwordInput--hidden';
  const inputClass = setting ? 'input input--copied' : 'input input--noBtn';
  const btnClass = setting
    ? 'inputBtn inputBtn--loading'
    : 'inputBtn inputBtn--hidden';
  const action = file.hasPassword
    ? state.translate('changePasswordButton')
    : state.translate('addPasswordButton');
  return html`
  <div>
    <form
      class="${formClass}"
      onsubmit=${setPassword}
      data-no-csrf>
      <input id="password-input"
        ${setting ? 'disabled' : ''}
        class="${inputClass}"
        maxlength="32"
        autocomplete="off"
        type="password"
        oninput=${inputChanged}
        placeholder="${
          file.hasPassword
            ? passwordPlaceholder(file.password)
            : state.translate('unlockInputPlaceholder')
        }">
      <input type="submit"
        id="password-btn"
        ${setting ? 'disabled' : ''}
        class="${btnClass}"
        value="${setting ? '' : action}">
    </form>
    <div class="passwordInput__msg">${message(
      setting,
      file.hasPassword,
      state.translate('passwordIsSet')
    )}</div>
  </div>
  `;

  function inputChanged() {
    const pwdmsg = document.querySelector('.passwordInput__msg');
    if (pwdmsg) {
      pwdmsg.textContent = '';
    }
    const resetInput = document.getElementById('password-input');
    const resetBtn = document.getElementById('password-btn');
    if (resetInput.value.length > 0) {
      resetBtn.classList.remove('inputBtn--hidden');
      resetInput.classList.remove('input--noBtn');
    } else {
      resetBtn.classList.add('inputBtn--hidden');
      resetInput.classList.add('input--noBtn');
    }
  }

  function setPassword(event) {
    event.preventDefault();
    const password = document.getElementById('password-input').value;
    if (password.length > 0) {
      emit('password', { password, file });
    }
    return false;
  }
};

function passwordPlaceholder(password) {
  return password ? password.replace(/./g, '●') : '●●●●●●●●●●●●';
}

function message(setting, pwd, deflt) {
  if (setting || !pwd) {
    return '';
  }
  return deflt;
}
