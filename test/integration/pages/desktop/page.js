/* global browser */
class Page {
  constructor() {}

  open(path) {
    browser.url(path);
    this.waitForPageToLoad();
  }

  /**
   * @function waitForPageToLoad
   * @returns {Object} An object representing the page.
   * @throws ElementNotFound
   */
  waitForPageToLoad() {}
}
module.exports = Page;
