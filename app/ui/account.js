const html = require('choo/html');
const Component = require('choo/component');

class Account extends Component {
  constructor(name, state, emit) {
    super(name);
    this.state = state;
    this.emit = emit;
    this.enabled = state.capabilities.account;
    this.local = state.components[name] = {};
    this.setState();
  }

  avatarClick(event) {
    event.preventDefault();
    const menu = document.getElementById('accountMenu');
    menu.classList.toggle('invisible');
    menu.focus();
  }

  hideMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('accountMenu');
    menu.classList.add('invisible');
  }

  login(event) {
    event.preventDefault();
    this.emit('login');
  }

  logout(event) {
    event.preventDefault();
    this.emit('logout');
  }

  changed() {
    return this.local.loggedIn !== this.state.user.loggedIn;
  }

  setState() {
    const changed = this.changed();
    if (changed) {
      this.local.loggedIn = this.state.user.loggedIn;
    }
    return changed;
  }

  update() {
    return this.setState();
  }

  createElement() {
    if (!this.enabled) {
      return html`
        <div></div>
      `;
    }
    const user = this.state.user;
    const translate = this.state.translate;
    if (!this.local.loggedIn) {
      return html`
        <div>
          <button
            class="p-2 border rounded border-white text-white hover:bg-white hover:text-blue md:text-blue md:border-blue md:hover:text-white md:hover:bg-blue"
            onclick="${e => this.login(e)}"
          >
            ${translate('signInMenuOption')}
          </button>
        </div>
      `;
    }
    return html`
      <div class="relative h-8">
        <input
          type="image"
          alt="${user.email}"
          class="w-8 h-8 rounded-full border text-blue md:text-white"
          src="${user.avatar}"
          onclick="${e => this.avatarClick(e)}"
        />
        <ul
          id="accountMenu"
          class="invisible list-reset absolute pin-t pin-r mt-10 pt-2 pb-2 bg-white shadow-md whitespace-no-wrap outline-none z-50"
          onblur="${e => this.hideMenu(e)}"
          tabindex="-1"
        >
          <li class="p-2 text-grey-dark">${user.email}</li>
          <li>
            <a
              class="block px-4 py-2 text-grey-darkest hover:bg-blue hover:text-white cursor-pointer"
              onclick="${e => this.logout(e)}"
            >
              ${translate('logOut')}
            </a>
          </li>
        </ul>
      </div>
    `;
  }
}

module.exports = Account;
