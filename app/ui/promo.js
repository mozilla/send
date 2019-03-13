const html = require('choo/html');
const Component = require('choo/component');
const assets = require('../../common/assets');

class Promo extends Component {
  constructor(name) {
    super(name);
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
          <span class="ml-3"
            >Send is brought to you by the all-new Firefox.${' '}
            <a
              class="text-blue"
              href="https://www.mozilla.org/firefox/new/?utm_campaign=send-acquisition&utm_medium=referral&utm_source=send.firefox.com"
            >
              Download Firefox now ≫</a
            >
          </span>
        </div>
      </send-promo>
    `;
  }
}

module.exports = Promo;
