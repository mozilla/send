/* global browser */
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const DownloadPage = require('./pages/desktop/download_page');
const HomePage = require('./pages/desktop/home_page');

describe('Firefox Send', function() {
  const homePage = new HomePage();
  const downloadDir =
    browser.desiredCapabilities['moz:firefoxOptions']['prefs'][
      'browser.download.dir'
    ];
  const testFilesPath = path.join(__dirname, 'fixtures');
  const testFiles = fs.readdirSync(testFilesPath);

  beforeEach(function() {
    homePage.open();
  });

  testFiles.forEach(file => {
    it(`should upload and download files, file: ${file}`, function() {
      browser.chooseFile(homePage.uploadInput, `${testFilesPath}/${file}`);
      browser.waitForExist(homePage.uploadButton);
      browser.click(homePage.uploadButton);
      browser.waitForExist(homePage.shareUrl);
      const downloadPage = new DownloadPage(
        browser.getValue(homePage.shareUrl)
      );
      downloadPage.open();
      downloadPage.download();
      browser.waitForExist(downloadPage.downloadComplete);
      assert.ok(fs.existsSync(path.join(downloadDir, file)));
    });
  });

  it('should update the download count on home page after 1 download', function() {
    browser.chooseFile(
      homePage.uploadInput,
      `${testFilesPath}/${testFiles[0]}`
    );
    browser.waitForExist(homePage.uploadButton);
    browser.waitForExist(homePage.downloadCountSelect);
    // Select 2 downloads
    browser.selectByIndex(homePage.downloadCountSelect, 1);
    browser.click(homePage.uploadButton);
    // TODO: need something like `await browser.waitForExist(homePage.shareUrl)`
    browser.waitForExist(homePage.shareUrl);
    // Newly added file will always be first in the list
    const archiveId = browser.getAttribute('send-archive', 'id')[0];
    const downloadPage = new DownloadPage(browser.getValue(homePage.shareUrl));
    downloadPage.setUseCase(archiveId, 'CHECK_DL_COUNT');
    downloadPage.open();
    downloadPage.download();
    browser.waitForExist(downloadPage.downloadComplete);
    browser.back();
    browser.waitForExist(`#${archiveId}`);
    const uploadedFile = downloadPage.getUploadedFiles('CHECK_DL_COUNT')[0];
    assert.equal(
      uploadedFile.getExpiryText().substring(0, 24),
      'Expires after 1 download'
    );
  });
});
