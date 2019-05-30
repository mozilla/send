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
            src="${assets.get('master-logo.svg')}"
            class="w-6"
            alt="Firefox"
          />
          <span class="ml-3">
            ${this.state.translate('trailheadPromo')}${' '}
            <a
              class="text-blue"
              href="http://www.mozilla.org/firefox/accounts/?utm_source=send.firefox.com&utm_medium=banner&utm_campaign=trailhead&utm_content=protect-your-privacy"
              >${this.state.translate('learnMore')}</a
            >
          </span>
        </div>
      </send-promo>
    `;
  }
}

module.exports = Promo;
