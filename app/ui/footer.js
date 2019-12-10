const html = require('choo/html');
const Component = require('choo/component');

class Footer extends Component {
  constructor(name, state) {
    super(name);
    this.state = state;
  }

  update() {
    return false;
  }

  createElement() {
    return html`
      <footer
        class="flex flex-col items-start w-full flex-none self-start p-6 md:p-8 font-medium text-xs text-grey-60 dark:text-grey-40 md:items-center justify-between"
      >
        <ul
          class="flex flex-col md:flex-row items-start md:items-center md:justify-end"
        >
          <li class="m-2">
            <a href="https://send.firefox.com" target="_blank"
              >Powered by Firefox Send</a
            >
          </li>
          <li class="m-2">
            <a href="https://checkr.com/privacy-policy" target="_blank">
              Privacy Policy
            </a>
          </li>
          <li class="m-2">
            <a href="https://checkr.com/terms-of-service" target="_blank">
              Terms of Service
            </a>
          </li>
        </ul>
      </footer>
    `;
  }
}

module.exports = Footer;
