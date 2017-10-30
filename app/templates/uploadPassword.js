const html = require('choo/html');

module.exports = function(state, emit) {
  const file = state.storage.getFileById(state.params.id);
  const div = html`
  <div class="selectPassword">
    <div id="addPasswordWrapper">
      <input id="addPassword" type="checkbox" onchange=${togglePasswordInput}/>
      <label for="addPassword">
        ${state.translate('requirePasswordCheckbox')}</label>
    </div>
    <form class="setPassword hidden" onsubmit=${setPassword}>
      <input id="unlock-input"
        maxlength="64"
        autocomplete="off"
        placeholder="${state.translate('unlockInputPlaceholder')}"/>
      <input type="submit"
        id="unlock-btn"
        class="btn"
        value="${state.translate('addPasswordButton')}"/>
    </form>
  </div>`;

  function togglePasswordInput(e) {
    const unlockInput = document.getElementById('unlock-input');
    const boxChecked = e.target.checked;
    document.querySelector('.setPassword').classList.toggle('hidden');
    document
      .getElementById('copy')
      .classList.toggle('wait-password', boxChecked);
    document.getElementById('copy-btn').disabled = boxChecked;
    if (boxChecked) {
      unlockInput.focus();
    } else {
      unlockInput.value = '';
    }
  }

  function setPassword(event) {
    event.preventDefault();
    const password = document.getElementById('unlock-input').value;
    if (password.length > 0) {
      document.getElementById('copy').classList.remove('wait-password');
      document.getElementById('copy-btn').disabled = false;
      emit('password', { password, file });
    }
  }

  return div;
};
