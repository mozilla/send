const html = require('choo/html');
const assets = require('../../common/assets');
const { bytes, platform } = require('../utils');
const { canceledSignup, submittedSignup } = require('../metrics');

module.exports = function(trigger) {
  return function(state, emit, close) {
    const DAYS = Math.floor(state.LIMITS.MAX_EXPIRE_SECONDS / 86400);
    const hidden = platform() === 'android' ? 'hidden' : '';
    let submitting = false;
    return html`
      <send-signup-dialog
        class="flex flex-col md:flex-row justify-center px-8 md:px-24 w-full h-full"
      >
        <img
          src="${assets.get('firefox_logo-only.svg')}"
          class="h-16 mt-1 mb-4"
        />
        <section class="flex flex-col flex-no-shrink self-center mx-6 max-w-xs">
          <h1 class="font-bold">${state.translate('accountBenefitTitle')}</h1>
          <ul class="leading-normal text-grey-darkest my-2 mt-4 pl-4">
            <li>
              ${state.translate('accountBenefitLargeFiles', {
                size: bytes(state.LIMITS.MAX_FILE_SIZE)
              })}
            </li>
            <li>${state.translate('accountBenefitExpiry')}</li>
            <li>
              ${state.translate('accountBenefitExpiryTwo', { count: DAYS })}
            </li>
            <li>${state.translate('accountBenefitSync')}</li>
          </ul>
        </section>
        <section class="flex flex-col flex-grow self-center m-4 max-w-xs">
          <form onsubmit=${submitEmail} data-no-csrf>
            <input
              id="email-input"
              type="text"
              class="${hidden} border rounded-lg w-full px-2 py-1 h-12 mb-3 text-lg text-grey-darker leading-loose"
              placeholder=${state.translate('emailEntryPlaceholder')}
            />
            <input
              class="btn rounded-lg w-full flex flex-no-shrink items-center justify-center"
              value="${state.translate('signInMenuOption')}"
              title="${state.translate('signInMenuOption')}"
              id="email-submit"
              type="submit"
            />
          </form>
          <button
            class="my-3 text-blue-dark hover:text-blue-darker focus:text-blue-darker font-medium"
            title="${state.translate('deletePopupCancel')}"
            onclick=${cancel}
          >
            ${state.translate('deletePopupCancel')}
          </button>
        </section>
      </send-signup-dialog>
    `;

    function emailish(str) {
      if (!str) {
        return false;
      }
      // just check if it's the right shape
      const a = str.split('@');
      return a.length === 2 && a.every(s => s.length > 0);
    }

    function cancel(event) {
      canceledSignup({ trigger });
      close(event);
    }

    function submitEmail(event) {
      event.preventDefault();
      if (submitting) {
        return;
      }
      submitting = true;

      const el = document.getElementById('email-input');
      const email = el.value;
      submittedSignup({ trigger });
      emit('login', emailish(email) ? email : null);
    }
  };
};
