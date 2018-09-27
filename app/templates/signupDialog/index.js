/* globals LIMITS */
const html = require('choo/html');
const bytes = require('../../utils').bytes;

// TODO: there's some duplication here with the signin page
module.exports = function() {
  return function(state, emit, close) {
    return html`
    <div class="signupDialog">
      <div class="signupDialog__message">
        ${state.translate('accountBenefitTitle')}
        <ul>
          <li>${state.translate('accountBenefitLargeFiles', {
            size: bytes(LIMITS.MAX_FILE_SIZE)
          })}</li>
          <li>${state.translate('accountBenefitExpiry')}</li>
          <li>${state.translate('accountBenefitSync')}</li>
        </ul>
      </div>
      <form
        onsubmit=${submitEmail}
        data-no-csrf>
        <input
          id="email-input"
          type="text"
          class="signupDialog__emailInput"
          placeholder=${state.translate('emailEntryPlaceholder')}/>
        <input
          class='noDisplay'
          id="email-submit"
          type="submit"/>
      </form>
      <label class="btn" for="email-submit">
        ${state.translate('signInMenuOption')}
      </label>
      <button
        class="btn--cancel"
        title="${state.translate('deletePopupCancel')}"
        onclick=${close}>${state.translate('deletePopupCancel')}
      </button>
    </div>`;

    function submitEmail(event) {
      event.preventDefault();
      const el = document.getElementById('email-input');
      const email = el.value;
      if (email) {
        // just check if it's the right shape
        const a = email.split('@');
        if (a.length === 2 && a.every(s => s.length > 0)) {
          return emit('login', email);
        }
      }
      el.value = '';
    }
  };
};
