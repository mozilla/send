/* global browser */
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const DownloadPage = require('./pages/desktop/download_page');
const HomePage = require('./pages/desktop/home_page');

describe('Firefox Send', function() {
  const homePage = new HomePage();
  const downloadDir = path.join(__dirname, 'downloads');
  const testFilesPath = path.join(__dirname, 'fixtures');
  const testFiles = fs.readdirSync(testFilesPath);

  beforeEach(function() {
    homePage.open();
  });

  testFiles.forEach(file => {
    it(`should upload and download files, file: ${file}`, function() {
      homePage.uploadFile(testFilesPath, file);
      $(homePage.shareUrl).waitForExist(5000);
      const downloadPage = new DownloadPage(
        $(homePage.shareUrl).getValue()
      );
      homePage.closeSharePopup();
      downloadPage.open()
      downloadPage.download();
      $(downloadPage.downloadComplete).waitForExist(5000);
      assert.ok(fs.existsSync(path.join(downloadDir, file)));
    });
  });

  it('should update the download count on home page after 1 download', function() {
    const expectedExpiresAfterText = 'Expires after 1 download';
    homePage.uploadFile(testFilesPath, testFiles[0], 1);
    const downloadPage = new DownloadPage(
      $(homePage.shareUrl).getValue());
    homePage.closeSharePopup();
    downloadPage.open();
    downloadPage.download();
    $(downloadPage.downloadComplete).waitForExist(5000);
    browser.back();
    $(`#archive-${downloadPage.fileId}`).waitForExist(5000);
    assert.equal(
      $(`#archive-${downloadPage.fileId} > div`).getText().substring(0, 24),
      expectedExpiresAfterText
    );
  });
});
