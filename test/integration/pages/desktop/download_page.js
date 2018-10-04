/* global browser */
const Page = require('./page');

class DownloadPage extends Page {
  constructor() {
    super();
    this.downloadBtnLocator = '.btn--download';
    this.downloadCompletedLocator = '.btn--complete';
  }

  /**
   * @function waitForPageToLoad
   * @returns {Object} An object representing the page.
   * @throws ElementNotFound
   */
  waitForPageToLoad() {
    browser.waitUntil(() => {
      browser.waitForExist(this.downloadBtnLocator);
      const el = browser.element(this.downloadBtnLocator);
      return browser.elementIdDisplayed(el.value.ELEMENT);
    });
    return this;
  }

  downloadBtn() {
    this.waitForPageToLoad();
    return browser.click(this.downloadBtnLocator);
  }

  get downloadComplete() {
    return this.downloadCompletedLocator;
  }
}
module.exports = DownloadPage;
