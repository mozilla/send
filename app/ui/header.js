const html = require('choo/html');
const Component = require('choo/component');
const Account = require('./account');
const { browserName } = require('../utils');

class Header extends Component {
  constructor(name, state, emit) {
    super(name);
    this.state = state;
    this.emit = emit;
    this.account = state.cache(Account, 'account');
  }

  update() {
    this.account.render();
    return false;
  }

  createElement() {
    const title =
      browserName() === 'android-app'
        ? html`
            <a class="header-logo">
              <h1 class="text-white md:text-black font-normal">
                Firefox <b>Send</b>
              </h1>
            </a>
          `
        : html`
            <a class="header-logo" href="/">
              <h1 class="text-white md:text-black font-normal">
                Firefox <b>Send</b>
              </h1>
            </a>
          `;
    return html`
      <header
        class="relative flex-none flex flex-row items-center justify-between bg-blue md:bg-white w-full px-6 h-16 md:shadow z-20"
      >
        ${title} ${this.account.render()}
      </header>
    `;
  }
}

module.exports = Header;
