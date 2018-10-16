/* globals LIMITS */
const html = require('choo/html');
const assets = require('../../../common/assets');
const title = require('../../templates/title');
const bytes = require('../../utils').bytes;

module.exports = function(state, emit) {
  return html`
    <main class="main page signInPage">
      ${title(state)}
      <div class="signIn__info flexible">
        ${state.translate('accountBenefitTitle')}
      <ul>
        <li>${state.translate('accountBenefitLargeFiles', {
          size: bytes(LIMITS.MAX_FILE_SIZE)
        })}</li>
        <li>${state.translate('accountBenefitExpiry')}</li>
        <li>${state.translate('accountBenefitSync')}</li>
      </ul>
      </div>
      <div class="signIn__form flexible">
        <img class="signIn__firefoxLogo"
          src="${assets.get('firefox_logo-only.svg')}"
          width=56 height=56
          alt="Firefox logo"/>
          <div class="signIn__emailLabel">
            ${state.translate('signInEmailEnter')}
          </div>
          ${state.translate('signInContinueMessage')}
          <form
            onsubmit=${submitEmail}
            data-no-csrf>
            <input
              id="email-input"
              type="text"
              class="signIn__emailInput"
              placeholder=${state.translate('emailEntryPlaceholder')}/>
            <input
              class='noDisplay'
              id="email-submit"
              type="submit"/>
          </form>
      </div>
      <label class="btn" for="email-submit">
        ${state.translate('signInContinueButton')}
      </label>
    </main>
  `;

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
