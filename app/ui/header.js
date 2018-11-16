const html = require('choo/html');
const Component = require('choo/component');
const Account = require('./account');

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
    return html`
      <header
        class="relative flex-none flex flex-row items-center justify-between bg-blue md:bg-white w-full px-6 h-16 md:shadow z-20"
      >
        <a class="header-logo" href="/">
          <h1 class="text-white md:text-black font-normal">
            Firefox <b>Send</b>
          </h1>
        </a>
        ${this.account.render()}
      </header>
    `;
  }
}

module.exports = Header;
