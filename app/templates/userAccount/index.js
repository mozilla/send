const html = require('choo/html');
const assets = require('../../../common/assets');

// eslint-disable-next-line no-unused-vars
module.exports = function(state) {
  const notLoggedInMenu = html`
    <ul class="account_dropdown"
          tabindex="-1"
    >
      <li>
        <a class=account_dropdown__link>${state.translate(
          'accountMenuOption'
        )}</a>
      </li>
      <li>
        <a href="/signin"
          class=account_dropdown__link>${state.translate(
            'signInMenuOption'
          )}</a>
      </li>
    </ul>
  `;

  return html`
    <div class="account">
      <img
      src="${assets.get('user.svg')}"
      onclick=${avatarClick}
      alt="account"/>
      ${notLoggedInMenu}
    </div>`;

  function avatarClick(event) {
    event.preventDefault();
    const dropdown = document.querySelector('.account_dropdown');
    dropdown.classList.toggle('visible');
    dropdown.focus();
  }

  //the onblur trick makes links unclickable wtf
  /*
  function hideMenu(event) {
    event.stopPropagation();
    const dropdown = document.querySelector('.account_dropdown');
    dropdown.classList.remove('visible');
  }
  */
};
