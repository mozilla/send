/* global browser window */
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
    browser.waitUntil(() => {
      return browser.execute(() => {
        return typeof window.appState !== 'undefined';
      });
    }, 3000);
    browser.pause(100);
    return this;
  }
}
module.exports = Page;
