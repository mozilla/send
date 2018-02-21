const html = require('choo/html');
const MAX_LENGTH = 32;

module.exports = function(file, state, emit) {
  const loading = state.settingPassword;
  const pwd = file.hasPassword;
  const sectionClass =
    pwd || state.passwordSetError
      ? 'passwordInput'
      : 'passwordInput passwordInput--hidden';
  const inputClass = loading || pwd ? 'input' : 'input input--noBtn';
  let btnClass = 'inputBtn inputBtn--password inputBtn--hidden';
  if (loading) {
    btnClass = 'inputBtn inputBtn--password inputBtn--loading';
  } else if (pwd) {
    btnClass = 'inputBtn inputBtn--password';
  }
  const action = pwd
    ? state.translate('changePasswordButton')
    : state.translate('addPasswordButton');
  return html`
  <div class="${sectionClass}">
    <form
      class="passwordInput__form"
      onsubmit=${setPassword}
      data-no-csrf>
      <input id="password-input"
        ${loading ? 'disabled' : ''}
        class="${inputClass}"
        maxlength="${MAX_LENGTH}"
        autocomplete="off"
        type="password"
        oninput=${inputChanged}
        onfocus=${focused}
        placeholder="${
          pwd && !state.passwordSetError
            ? passwordPlaceholder(file.password)
            : state.translate('unlockInputPlaceholder')
        }">
      <input type="submit"
        id="password-btn"
        ${loading ? 'disabled' : ''}
        class="${btnClass}"
        value="${loading ? '' : action}">
    </form>
    <label
      class="passwordInput__msg ${
        state.passwordSetError ? 'passwordInput__msg--error' : ''
      }"
      for="password-input">${message(state, pwd)}</label>
  </div>`;

  function inputChanged() {
    state.passwordSetError = null;
    const resetInput = document.getElementById('password-input');
    const resetBtn = document.getElementById('password-btn');
    const pwdmsg = document.querySelector('.passwordInput__msg');
    const length = resetInput.value.length;

    if (length === MAX_LENGTH) {
      pwdmsg.textContent = state.translate('maxPasswordLength', {
        length: MAX_LENGTH
      });
    } else {
      pwdmsg.textContent = '';
    }
    if (length > 0) {
      resetBtn.classList.remove('inputBtn--hidden');
      resetInput.classList.remove('input--noBtn');
    } else {
      resetBtn.classList.add('inputBtn--hidden');
      resetInput.classList.add('input--noBtn');
    }
  }

  function focused(event) {
    event.preventDefault();
    const el = document.getElementById('password-input');
    if (el.placeholder !== state.translate('unlockInputPlaceholder')) {
      el.placeholder = '';
    }
  }

  function setPassword(event) {
    event.preventDefault();
    const el = document.getElementById('password-input');
    const password = el.value;
    if (password.length > 0) {
      emit('password', { password, file });
    } else {
      el.focus();
    }
    return false;
  }
};

function passwordPlaceholder(password) {
  return password ? password.replace(/./g, '●') : '●●●●●●●●●●●●';
}

function message(state, pwd) {
  if (state.passwordSetError) {
    return state.translate('passwordSetError');
  }
  if (state.settingPassword || !pwd) {
    return '';
  }
  return state.translate('passwordIsSet');
}
