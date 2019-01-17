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
    $(this.downloadButton).waitForExist(5000);
    return this;
  }

  download() {
    const element = $(this.downloadButton);
    element.waitForExist(5000);
    return element.click();
  }
}
module.exports = DownloadPage;
