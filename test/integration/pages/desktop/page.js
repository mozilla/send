/* global browser */
class Page {
  constructor(path) {
    this.path = path;
  }

  open() {
    browser.url(this.path);
    this.waitForPageToLoad();
  }

  /**
   * @function waitForPageToLoad
   * @returns {Object} An object representing the page.
   * @throws ElementNotFound
   */
  waitForPageToLoad() {
    return this;
  }
}
module.exports = Page;
