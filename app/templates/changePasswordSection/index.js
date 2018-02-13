const html = require('choo/html');
const raw = require('choo/html/raw');
const passwordInput = require('../passwordInput');

module.exports = function(state, emit) {
  const file = state.storage.getFileById(state.params.id);

  return html`<div class="changePasswordSection">
    ${passwordSpan(file.password)}
    <button
      class="btn btn--reset"
      onclick=${toggleResetInput}
      >${state.translate('changePasswordButton')}</button>
    ${passwordInput(
      state.translate('unlockInputPlaceholder'),
      state.translate('changePasswordButton'),
      changePassword
    )}
    </div>`;

  function passwordSpan(password) {
    password = password || '●●●●●';
    const span = html`<span>${raw(
      state.translate('passwordResult', {
        password: '<pre class="passwordMask"></pre>'
      })
    )}</span>`;
    const masked = span.querySelector('.passwordMask');
    masked.textContent = password.replace(/./g, '●');
    return span;
  }

  function changePassword(event) {
    event.preventDefault();
    const password = document.getElementById('password-input').value;
    if (password.length > 0) {
      emit('password', { password, file });
    }
    return false;
  }

  function toggleResetInput(event) {
    const form = event.target.parentElement.querySelector('form.passwordInput');
    const input = document.getElementById('password-input');
    if (form.style.visibility === 'hidden' || form.style.visibility === '') {
      form.style.visibility = 'visible';
      input.focus();
    } else {
      form.style.visibility = 'hidden';
    }
  }
};
