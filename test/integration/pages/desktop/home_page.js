/* global browser document */
const Page = require('./page');

class HomePage extends Page {
  constructor() {
    super('/');
    this.footerLinks = 'footer a';
    this.uploadInput = '#file-upload';
    this.uploadButton = '#upload-btn';
    this.sharePopup = '.shadow-cloud a';
    this.progress = 'progress';
    this.shareUrl = '#share-url';
    this.downloadCountSelect = '#expire-after-dl-count-select';
  }

  waitForPageToLoad() {
    browser.waitUntil(() => {
      const element = $(this.uploadInput);
      element.waitForExist();
      return element.isExisting();
    }, 5000);
    this.showUploadInput();
    return this;
  }

  showUploadInput() {
    browser.execute(() => {
      document.getElementById('file-upload').style.display = 'block';
    });
  }

  closeSharePopup() {
    const element = $(this.sharePopup)

    element.waitForExist(5000);
    element.click();
  }

  uploadFile(path, file, index = 0) {
    const downloadCountSelect = $(this.downloadCountSelect);
    const uploadButton = $(this.uploadButton);
    const uploadElement = $(this.uploadInput);

    uploadElement.setValue(`${path}/${file}`);
    uploadButton.waitForExist(5000);
    downloadCountSelect.waitForExist(1000);
    downloadCountSelect.selectByIndex(index);
    uploadButton.click()
  }
}
module.exports = HomePage;
