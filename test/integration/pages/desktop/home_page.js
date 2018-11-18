/* global browser document */
const Page = require('./page');

class HomePage extends Page {
  constructor() {
    super('/');
    this.footerLinks = 'footer a';
    this.uploadInput = '#file-upload';
    this.uploadButton = '#upload-btn';
    this.progress = 'progress';
    this.shareUrl = '#share-url';
  }

  waitForPageToLoad() {
    super.waitForPageToLoad();
    browser.waitForExist(this.uploadInput);
    this.showUploadInput();
    return this;
  }

  showUploadInput() {
    browser.execute(() => {
      document.getElementById('file-upload').style.display = 'block';
    });
  }
}
module.exports = HomePage;
