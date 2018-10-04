/* global browser */
const Page = require('./page');
const SharePage = require('./share_page');

class ProgressPage extends Page {
  constructor() {
    super();
    this.cancelBtnLocator = '.uploadCancel';
    this.progressIconLocator = '.btn--stripes';
  }

  /**
   * @function waitForPageToLoad
   * @returns {Object} An object representing the Share page.
   * @throws ElementNotFound
   */
  waitForPageToLoad() {
    browser.waitUntil(() => {
      browser.waitForExist(this.progressIconLocator);
      const el = browser.element(this.progressIconLocator);
      return browser.elementIdDisplayed(el.value.ELEMENT);
    });
    const sharePage = new SharePage();
    return sharePage.waitForPageToLoad();
  }

  get cancelBtn() {
    return this.cancelBtnLocator;
  }
}
module.exports = ProgressPage;
