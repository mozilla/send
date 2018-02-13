const html = require('choo/html');

module.exports = function(placeholder, action, submit) {
  return html`
    <form
      class="passwordInput passwordInput--hidden"
      onsubmit=${submit}
      data-no-csrf>
      <input id="password-input"
        class="input input--noBtn"
        maxlength="32"
        autocomplete="off"
        type="password"
        oninput=${inputChanged}
        placeholder="${placeholder}">
      <input type="submit"
        id="password-btn"
        class="inputBtn inputBtn--hidden"
        value="${action}"/>
    </form>
  `;

  function inputChanged() {
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
};
