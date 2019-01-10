/* global browser */
const Page = require('./page');

class DownloadPage extends Page {
  constructor(path) {
    super(path);
    this.fileId = /download\/(\w+)\/#/.exec(path)[1];
    this.downloadButton = '#download-btn';
    this.downloadComplete = '#download-complete';
  }

  /**
   * @function waitForPageToLoad
   * @returns {Object} An object representing the page.
   * @throws ElementNotFound
   */
  waitForPageToLoad() {
    super.waitForPageToLoad();
    browser.waitForExist(this.downloadButton);
    return this;
  }

  download() {
    return browser.click(this.downloadButton);
  }
}
module.exports = DownloadPage;
