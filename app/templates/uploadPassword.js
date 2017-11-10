const html = require('choo/html');

module.exports = function(state, emit) {
  const file = state.storage.getFileById(state.params.id);
  const div = html`
  <div class="selectPassword">
    <div id="addPasswordWrapper">
      <input id="addPassword" type="checkbox" autocomplete="off" onchange=${
        togglePasswordInput
      }/>
      <label for="addPassword">
        ${state.translate('requirePasswordCheckbox')}</label>
    </div>
    <form class="setPassword hidden" onsubmit=${setPassword} data-no-csrf>
      <input id="unlock-input"
        class="unlock-input input-no-btn"
        maxlength="64"
        autocomplete="off"
        placeholder="${state.translate('unlockInputPlaceholder')}"
        oninput=${inputChanged}/>
      <input type="submit"
        id="unlock-btn"
        class="btn btn-hidden"
        value="${state.translate('addPasswordButton')}"/>
    </form>
  </div>`;

  function inputChanged() {
    const input = document.getElementById('unlock-input');
    const btn = document.getElementById('unlock-btn');
    if (input.value.length > 0) {
      btn.classList.remove('btn-hidden');
      input.classList.remove('input-no-btn');
    } else {
      btn.classList.add('btn-hidden');
      input.classList.add('input-no-btn');
    }
  }

  function togglePasswordInput(e) {
    const unlockInput = document.getElementById('unlock-input');
    const boxChecked = e.target.checked;
    document
      .querySelector('.setPassword')
      .classList.toggle('hidden', !boxChecked);
    document
      .getElementById('copy')
      .classList.toggle('wait-password', boxChecked);
    document.getElementById('copy-btn').disabled = boxChecked;
    if (boxChecked) {
      unlockInput.focus();
    } else {
      unlockInput.value = '';
    }
    inputChanged();
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
