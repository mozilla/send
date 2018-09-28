const html = require('choo/html');

module.exports = function(state) {
  if (state.user.loggedIn || !state.capabilities.account) {
    return null;
  }
  return html`
  <a href="/signin" class="signupPromo">
    <div class="signupPromo__title">${state.translate('signInPromoText')}</div>
    <div class="signupPromo__info">${state.translate('signInExplanation')}</div>
  </a>
  `;
};
