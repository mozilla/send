const html = require('choo/html');

module.exports = function(state, emit) {
  if (!state.capabilities.account) {
    return null;
  }
  const user = state.user;
  if (!user.loggedIn) {
    return html`<button
      class="p-2 border rounded border-white text-white hover:bg-white hover:text-blue md:text-blue md:border-blue md:hover:text-white md:hover:bg-blue"
      onclick=${login}>
        ${state.translate('signInMenuOption')}
      </button>`;
  }
  return html`<div class="relative h-8">
    <input
      type="image"
      alt="${user.email}"
      class="w-8 h-8 rounded-full text-white"
      src="${user.avatar}"
      onclick=${avatarClick}/>
    <ul
      id="accountMenu"
      class="invisible list-reset absolute pin-t pin-r mt-10 pt-2 pb-2 bg-white shadow-md whitespace-no-wrap outline-none z-50"
      onblur="${hideMenu}"
      tabindex="-1">
      <li class="p-2 text-grey-dark">${user.email}</li>
      <li>
        <a class="block px-4 py-2 text-grey-darkest hover:bg-blue hover:text-white cursor-pointer" onclick=${logout}>
          ${state.translate('logOut')}
        </a>
      </li>
    </ul>
  </div>`;

  function avatarClick(event) {
    event.preventDefault();
    const menu = document.getElementById('accountMenu');
    menu.classList.toggle('invisible');
    menu.focus();
  }

  function hideMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('accountMenu');
    menu.classList.add('invisible');
  }

  function login(event) {
    event.preventDefault();
    emit('login');
  }

  function logout(event) {
    event.preventDefault();
    emit('logout');
  }
};
