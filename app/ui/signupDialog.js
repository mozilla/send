/* global LIMITS */
const html = require('choo/html');
const { bytes } = require('../utils');

module.exports = function() {
  return function(state, emit, close) {
    return html`
    <div class="flex flex-col p-4">
      <p class="p-8">
        ${state.translate('accountBenefitTitle')}
        <ul class="my-2">
          <li>${state.translate('accountBenefitLargeFiles', {
            size: bytes(LIMITS.MAX_FILE_SIZE)
          })}</li>
          <li>${state.translate('accountBenefitExpiry')}</li>
          <li>${state.translate('accountBenefitSync')}</li>
        </ul>
      </p>
      <form
        onsubmit=${submitEmail}
        data-no-csrf>
        <input
          id="email-input"
          type="text"
          class="border rounded w-full px-2 text-lg text-grey-darker leading-loose"
          placeholder=${state.translate('emailEntryPlaceholder')}/>
        <input
          class="hidden"
          id="email-submit"
          type="submit"/>
      </form>
      <label class="border rounded bg-blue text-white leading-loose text-center my-2" for="email-submit">
        ${state.translate('signInMenuOption')}
      </label>
      <button
        class=""
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
