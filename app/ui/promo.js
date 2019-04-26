const html = require('choo/html');
const Component = require('choo/component');
const assets = require('../../common/assets');

class Promo extends Component {
  constructor(name, state) {
    super(name);
    this.state = state;
  }

  update() {
    return false;
  }

  createElement() {
    return html`
      <send-promo
        class="w-full flex-none flex-row items-center content-center justify-center text-sm bg-grey-light leading-tight text-grey-darkest px-4 py-3 hidden md:flex"
      >
        <div class="flex items-center mx-auto">
          <img
            src="${assets.get('firefox_logo-only.svg')}"
            class="w-6"
            alt="Firefox"
          />
          <span class="ml-3">
            ${this.state.translate('downloadFirefoxPromo')}${' '}
            <a
              class="text-blue"
              href="https://www.mozilla.org/firefox/new/?utm_campaign=send-acquisition&utm_medium=referral&utm_source=send.firefox.com"
              >${this.state.translate('downloadFirefox')}</a
            >
          </span>
        </div>
      </send-promo>
    `;
  }
}

module.exports = Promo;
