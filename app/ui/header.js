const html = require('choo/html');
const Component = require('choo/component');
const Account = require('./account');
const { platform } = require('../utils');

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
      platform() === 'android'
        ? html`
            <a class="header-logo">
              <h1 class="text-3xl text-white md:text-black font-normal">
                <b>Firefox</b> Send
              </h1>
            </a>
          `
        : html`
            <a class="header-logo" href="/">
              <h1 class="text-3xl text-white md:text-black font-normal">
                <b>Firefox</b> Send
              </h1>
            </a>
          `;
    return html`
      <header
        class="relative flex-none flex flex-row items-center justify-between bg-black w-full px-6 h-16 z-20 md:bg-transparent"
      >
        ${title} ${this.account.render()}
      </header>
    `;
  }
}

module.exports = Header;
