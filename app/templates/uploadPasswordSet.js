const html = require('choo/html');

module.exports = function(state, emit) {
  const file = state.storage.getFileById(state.params.id);

  return html`<div class="selectPassword">
    ${passwordSpan(file.password)}
    <button
      id="resetButton"
      onclick=${toggleResetInput}
      >${state.translate('changePasswordButton')}</button>
    <form
      id='reset-form'
      class="setPassword hidden"
      onsubmit=${resetPassword}
      data-no-csrf>
      <input id="unlock-reset-input"
        class="unlock-input input-no-btn"
        maxlength="32"
        autocomplete="off"
        type="password"
        oninput=${inputChanged}
        placeholder="${state.translate('unlockInputPlaceholder')}">
      <input type="submit"
        id="unlock-reset-btn"
        class="btn btn-hidden"
        value="${state.translate('changePasswordButton')}"/>
    </form>
    </div>`;

  function passwordSpan(password) {
    password = password || '●●●●●';
    const span = html([
      `<span>${state.translate('passwordResult', {
        password:
          '<pre class="passwordOriginal"></pre><pre class="passwordMask"></pre>'
      })}</span>`
    ]);
    const og = span.querySelector('.passwordOriginal');
    const masked = span.querySelector('.passwordMask');
    og.textContent = password;
    masked.textContent = password.replace(/./g, '●');
    return span;
  }

  function inputChanged() {
    const resetInput = document.getElementById('unlock-reset-input');
    const resetBtn = document.getElementById('unlock-reset-btn');
    if (resetInput.value.length > 0) {
      resetBtn.classList.remove('btn-hidden');
      resetInput.classList.remove('input-no-btn');
    } else {
      resetBtn.classList.add('btn-hidden');
      resetInput.classList.add('input-no-btn');
    }
  }

  function resetPassword(event) {
    event.preventDefault();
    const password = document.querySelector('#unlock-reset-input').value;
    if (password.length > 0) {
      document.getElementById('copy').classList.remove('wait-password');
      document.getElementById('copy-btn').disabled = false;
      emit('password', { password, file });
    }
    return false;
  }

  function toggleResetInput(event) {
    const form = event.target.parentElement.querySelector('form');
    const input = document.getElementById('unlock-reset-input');
    if (form.style.visibility === 'hidden' || form.style.visibility === '') {
      form.style.visibility = 'visible';
      input.focus();
    } else {
      form.style.visibility = 'hidden';
    }
    inputChanged();
  }
};
