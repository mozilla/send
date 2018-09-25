/* globals DEFAULTS */
const html = require('choo/html');

export default function options(state, emit) {
  function clickCancel(event) {
    event.preventDefault();
    emit('pushState', '/');
  }

  async function submitForm(event) {
    event.preventDefault();
    if (this.addPassword.checked) {
      if (this.password.value !== this.confirmPassword.value) {
        state.passwordDoesNotMatchError = true;
        emit('render');
        return;
      } else {
        state.passwordDoesNotMatchError = false;
      }
    }
    state.timeLimit = parseInt(event.target.maxTime);
    emit('upload', {
      type: 'click',
      dlimit: parseInt(event.target.numDownloads.value),
      password: event.target.password.value
    });
    emit('pushState', '/upload');
  }

  function addPasswordChange(event) {
    const pw = document.getElementById('password-section');
    if (event.target.checked) {
      pw.style.display = 'block';
    } else {
      pw.style.display = 'none';
    }
  }

  const passwordDoesNotMatchDisplayStyle = state.passwordDoesNotMatchError
    ? 'display: block'
    : 'display: none';
  const passwordChecked = state.passwordDoesNotMatchError ? true : false;

  return html`<body>
  <div id="white">
    <div id="options">
      <a onclick=${clickCancel} class="cancel" href="#">
      cancel
      </a>
      <h5>Selected files</h5>
      <ul>
        <li>file</li>
      </ul>
      <div id="options-controls">
        <form onsubmit=${submitForm}>
          <div id="expires-after-section">
            <h5>Expires after</h5>
            <select name="numDownloads">
            ${DEFAULTS.DOWNLOAD_COUNTS.map(i => {
              return html`<option value="${i}">${i} download${
                i > 1 ? 's' : ''
              }</option>`;
            })}
            </select>
            or
            <select name="maxTime">
              <option value="300">5 minutes</option>
              <option value="3600">1 hour</option>
              <option value="86400" selected="true">24 hours</option>
              <option value="604800">7 days</option>
            </select>
          </div>
          <div id="set-password-section">
            <input onchange=${addPasswordChange} name="addPassword" autocomplete="off" type="checkbox" checked=${passwordChecked}>
            <label for="addPassword">Protect with password</label>
            <div id="password-section" style=${passwordDoesNotMatchDisplayStyle}>
              <div style=${passwordDoesNotMatchDisplayStyle}>
                Passwords must match.
              </div>
              <h5>Password:</h5>
              <input name="password" type="password" />
              <h5>Confirm password:</h5>
              <input name="confirmPassword" type="password" />
            </div>
          </div>
          <button>Send</button>
        </form>
      </div>
    </div>
  </div>
</body>`;
}
