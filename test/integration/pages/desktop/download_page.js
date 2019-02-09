/* global browser */
const Page = require('./page');

/*
  An object with archiveId as key and useCase as value
  Can be used to retrive files according to it's use case
*/
const uploadedFilesUseCase = {};

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

  setUseCase(id, useCase) {
    uploadedFilesUseCase[id] = useCase;
  }

  getUploadedFiles(useCase) {
    const elements = [];
    Object.keys(uploadedFilesUseCase).map(archiveId => {
      if (
        useCase === undefined ||
        useCase === uploadedFilesUseCase[archiveId]
      ) {
        elements.push(new UploadedFile(archiveId));
      }
    });
    return elements;
  }
}

class UploadedFile {
  constructor(archiveId) {
    this.archiveId = archiveId;
    this.element = browser.element(`#${archiveId}`);
  }

  getName() {
    return this.element.element('p > h1').getText();
  }

  getExpiryText() {
    return this.element.element('p > div:nth-child(2)').getText();
  }

  getUseCase() {
    return uploadedFilesUseCase[this.archiveId];
  }
}
module.exports = DownloadPage;
