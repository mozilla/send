const Page = require('./page');

class HomePage extends Page {
  constructor() {
    super();
    this.legalSectionLinks = '.legalSection .legalSection__link';
    this.readyToSendLocator = 'div#page-one button.btn';
    this.socialLinksLocator = '.socialSection__link';
  }

  get legalLinks() {
    return this.legalSectionLinks;
  }

  get readyToSend() {
    return this.readyToSendLocator;
  }

  get socialLinks() {
    return this.socialLinksLocator;
  }
}
module.exports = HomePage;
