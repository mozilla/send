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
        class="w-full flex-row items-center content-center justify-center bg-white text-grey-80 px-4 py-3 flex border-b border-grey-banner leading-normal dark:bg-grey-90 dark:text-grey-20 dark:border-grey-80"
      >
        <div class="flex items-center mx-auto">
          <img
            src="${assets.get('master-logo.svg')}"
            class="w-6 h-6"
            alt="Firefox"
          />
          <span class="ml-2 sm:ml-4 text-xs sm:text-base">
            ${`Like Firefox Send? You'll love our new full-device VPN. `}
            <a
              class="underline link-blue"
              href="https://fpn.firefox.com/?utm_source=send.firefox.com&utm_medium=referral&utm_content=Try+Firefox+Private+Network&utm_campaign=top-bar"
              >${`Get it today`}</a
            >
          </span>
        </div>
      </send-promo>
    `;
  }
}

module.exports = Promo;
