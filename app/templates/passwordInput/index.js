const html = require('choo/html');

module.exports = function(state) {
  const placeholder =
    state.route === '/' ? '' : state.translate('unlockInputPlaceholder');
  const hasPassword = !!state.password;
  const sectionClass = hasPassword
    ? 'passwordInput'
    : 'passwordInput passwordInput--hidden';

  return html`
  <div class="${sectionClass}">
    <form
      onsubmit=${onSubmit}
      data-no-csrf>

      <input id="password-input"
        class="input passwordInput__fill"
        autocomplete="off"
        type="password"
        oninput=${inputChanged}
        onfocus=${focused}
        placeholder="${
          hasPassword ? passwordPlaceholder(state.password) : placeholder
        }"
      >
    </form>
  </div>`;

  function onSubmit() {
    event.preventDefault();
  }

  function inputChanged() {
    const password = document.getElementById('password-input').value;
    state.password = password;
  }

  function focused(event) {
    event.preventDefault();
    const el = document.getElementById('password-input');
    if (el.placeholder !== state.translate('unlockInputPlaceholder')) {
      el.placeholder = '';
    }
  }
};

function passwordPlaceholder(password) {
  return password ? password.replace(/./g, '•') : '••••••••••••';
}
