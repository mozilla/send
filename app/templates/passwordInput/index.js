const html = require('choo/html');

module.exports = function(file, state, emit) {
  const loading = state.settingPassword;
  const pwd = file.hasPassword;
  const formClass = pwd
    ? 'passwordInput'
    : 'passwordInput passwordInput--hidden';
  const inputClass = loading || pwd ? 'input' : 'input input--noBtn';
  let btnClass = 'inputBtn inputBtn--hidden';
  if (loading) {
    btnClass = 'inputBtn inputBtn--loading';
  } else if (pwd) {
    btnClass = 'inputBtn';
  }

  const action = pwd
    ? state.translate('changePasswordButton')
    : state.translate('addPasswordButton');
  return html`
  <div>
    <form
      class="${formClass}"
      onsubmit=${setPassword}
      data-no-csrf>
      <input id="password-input"
        ${loading ? 'disabled' : ''}
        class="${inputClass}"
        maxlength="32"
        autocomplete="off"
        type="password"
        oninput=${inputChanged}
        placeholder="${
          pwd
            ? passwordPlaceholder(file.password)
            : state.translate('unlockInputPlaceholder')
        }">
      <input type="submit"
        id="password-btn"
        ${loading ? 'disabled' : ''}
        class="${btnClass}"
        value="${loading ? '' : action}">
    </form>
    <div class="passwordInput__msg">${message(
      loading,
      pwd,
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

function message(loading, pwd, deflt) {
  if (loading || !pwd) {
    return '';
  }
  return deflt;
}
