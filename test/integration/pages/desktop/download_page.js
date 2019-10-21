/* global browser */
const Page = require('./page');

class DownloadPage extends Page {
  constructor(path) {
    super(path);
    this.fileId = /download\/(\w+)\/\??.*#/.exec(path)[1];
    this.downloadButton = '#download-btn';
    this.downloadComplete = '#download-complete';
    this.passwordInput = '#password-input';
    this.passwordButton = '#password-btn';
  }

  downloadUsingPassword(password) {
    browser.waitForExist(this.passwordInput);
    browser.setValue(this.passwordInput, password);
    browser.click(this.passwordButton);
    return browser.click(this.downloadButton);
  }

  download() {
    browser.waitForExist(this.downloadButton);
    return browser.click(this.downloadButton);
  }
}
module.exports = DownloadPage;
