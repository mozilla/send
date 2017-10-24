const html = require('choo/html');

module.exports = function(state, emit) {
  const file = state.storage.getFileById(state.params.id);
  const div = html`
  <div class="selectPassword">
    <div>
      <input id="addPassword" type="checkbox" onchange=${togglePasswordInput}/>
      <label for="addPassword">${state.translate(
        'requirePasswordCheckbox'
      )}</label>
    </div>
    <form class="setPassword hidden" onsubmit=${setPassword}>
      <input id="unlock-input"
        autocomplete="off"
        placeholder="${state.translate('unlockInputPlaceholder')}"/>
      <input type="submit"
        id="unlock-btn"
        class="btn"
        value="${state.translate('addPasswordButton')}"/>
    </form>
  </div>`;

  function togglePasswordInput(e) {
    document.querySelector('.setPassword').classList.toggle('hidden');
    document
      .getElementById('copy')
      .classList.toggle('wait-password', e.target.checked);
    document.getElementById('copy-btn').disabled = e.target.checked;
    if (e.target.checked) {
      document.getElementById('unlock-input').focus();
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
