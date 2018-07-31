const html = require('choo/html');
const assets = require('../../../common/assets');
const title = require('../../templates/title');

// eslint-disable-next-line no-unused-vars
module.exports = function(state, emit) {
  return html`

    <div class="page signInPage">
      <a href="/" class="goBackButton"> 
        <img src="${assets.get('back-arrow.svg')}"/> 
      </a>
      ${title(state)}

      <div class="signIn__info flexible">
        ${state.translate('accountBenefitTitle')}
      <ul>
        <li>${state.translate('accountBenefitMultiFile')}</li>
        <li>${state.translate('accountBenefitLargeFiles')}</li>
        <li>${state.translate('accountBenefitExpiry')}</li>
        <li>${state.translate('accountBenefitSync')}</li>
        <li>${state.translate('accountBenefitNotify')}</li>
        <li>${state.translate('accountBenefitMore')}</li>
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
            data-no-csrf>
            <input
              type="text"
              class="signIn__emailInput"
              placeholder=${state.translate('emailEntryPlaceholder')}/>

            <input
              class='noDisplay'
              id="emailSubmit"
              type="submit"/>
          </form>

      </div>

      <label class="btn" for="emailSubmit">
        ${state.translate('signInContinueButton')}
      </label>

    </div>
  `;
};
