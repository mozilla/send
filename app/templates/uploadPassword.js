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
        autocomplete="off"
        placeholder="${state.translate('unlockInputPlaceholder')}"/>
      <input type="submit"
        id="unlock-btn"
        class="btn"
        value="${state.translate('addPasswordButton')}"/>
    </form>
  </div>`;

  function togglePasswordInput() {
    document.querySelector('.setPassword').classList.toggle('hidden');
  }

  function setPassword(event) {
    event.preventDefault();
    const password = document.getElementById('unlock-input').value;
    if (password.length > 0) {
      emit('password', { password, file });
    }
  }

  return div;
};
