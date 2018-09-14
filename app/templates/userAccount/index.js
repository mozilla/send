const html = require('choo/html');

module.exports = function(state, emit) {
  if (!state.capabilities.account) {
    return null;
  }
  const user = state.user;
  const menu = user.loggedIn
    ? html`
    <ul
      class="account_dropdown"
      onblur=${hideMenu}
      tabindex="-1">
      <li class="account_dropdown__text">
        ${user.email}
      </li>
      <li>
        <a class="account_dropdown__link" onclick=${logout}>${state.translate(
        'logOut'
      )}</a>
      </li>
    </ul>`
    : html`
    <ul
      class="account_dropdown"
      onblur=${hideMenu}
      tabindex="-1">
      <li>
        <a class="account_dropdown__link" onclick=${login}>${state.translate(
        'signInMenuOption'
      )}</a>
      </li>
    </ul>
  `;

  return html`
    <div class="account">
      <div class="account__avatar">
        <img
          class="account__avatar"
          src="${user.avatar}"
          onclick=${avatarClick}
        />
      </div>
      ${menu}
    </div>`;

  function avatarClick(event) {
    event.preventDefault();
    const dropdown = document.querySelector('.account_dropdown');
    dropdown.classList.toggle('visible');
    dropdown.focus();
  }

  function login(event) {
    event.preventDefault();
    emit('login');
  }

  function logout(event) {
    event.preventDefault();
    emit('logout');
  }

  function hideMenu(event) {
    event.stopPropagation();
    const dropdown = document.querySelector('.account_dropdown');
    dropdown.classList.remove('visible');
  }
};
