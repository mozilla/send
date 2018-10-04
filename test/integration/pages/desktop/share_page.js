/* global browser */
const Page = require('./page');

class SharePage extends Page {
  constructor() {
    super();
    this.sharePageLocator = '#shareWrapper';
    this.shareUrlLocator = '#fileUrl';
  }

  waitForPageToLoad() {
    browser.waitUntil(() => {
      browser.waitForExist(this.sharePageLocator);
      const el = browser.element(this.sharePageLocator);
      return browser.elementIdDisplayed(el.value.ELEMENT);
    });
    return this;
  }

  get fileUrl() {
    return this.shareUrlLocator;
  }
}
module.exports = SharePage;
