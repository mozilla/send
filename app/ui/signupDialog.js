/* global LIMITS */
const html = require('choo/html');
const { bytes } = require('../utils');

module.exports = function() {
  return function(state, emit, close) {
    let submitting = false;
    return html`
    <send-signup-dialog class="flex flex-col p-4">
      <p class="p-8">
        ${state.translate('accountBenefitTitle')}
        <ul class="my-2 leading-normal">
          <li>${state.translate('accountBenefitLargeFiles', {
            size: bytes(LIMITS.MAX_FILE_SIZE)
          })}</li>
          <li>${state.translate('accountBenefitExpiry')}</li>
          <li>${state.translate('accountBenefitSync')}</li>
        </ul>
      </p>
      <form
        onsubmit=${submit}
        data-no-csrf>
        <input
          class="hidden"
          id="email-submit"
          type="submit"/>
      </form>
      <label class="btn rounded w-full flex flex-no-shrink items-center justify-center" for="email-submit">
        ${state.translate('signInMenuOption')}
      </label>
      <button
        class="my-4 text-blue hover:text-blue-dark focus:text-blue-darker font-medium"
        title="${state.translate('deletePopupCancel')}"
        onclick=${close}>${state.translate('deletePopupCancel')}
      </button>
    </send-signup-dialog>`;

    function submit(event) {
      event.preventDefault();
      if (submitting) {
        return;
      }
      submitting = true;
      emit('login', null);
    }
  };
};
