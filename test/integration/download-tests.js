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
    browser.selectByIndex(homePage.downloadCountSelect, 1);
    browser.click(homePage.uploadButton);
    browser.waitForExist(homePage.shareUrl);
    const downloadPage = new DownloadPage(browser.getValue(homePage.shareUrl));
    downloadPage.open();
    downloadPage.download();
    browser.waitForExist(downloadPage.downloadComplete);
    browser.back();
    browser.waitForExist('send-archive');
    assert(
      browser
        .getText('send-archive > div:first-of-type')
        .includes('Expires after 1 download')
    );
  });

  it('should ensure that the downloaded file size matches the uploaded file size', function() {
    browser.chooseFile(
      homePage.uploadInput,
      `${testFilesPath}/${testFiles[0]}`
    );
    // get the file size for upload
    const uploadSize = fs.statSync(`${testFilesPath}/${testFiles[0]}`).size;

    browser.waitForExist(homePage.uploadButton);
    browser.click(homePage.uploadButton);

    browser.waitForExist(homePage.shareUrl);
    const downloadPage = new DownloadPage(browser.getValue(homePage.shareUrl));
    downloadPage.open();
    downloadPage.download();
    browser.waitForExist(downloadPage.downloadComplete);

    // get the file size for download
    const downloadFile = path.join(downloadDir, `${testFiles[0]}`);
    const downloadSize = fs.statSync(downloadFile).size;

    // check if upload and download file sizes are equal
    assert.equal(uploadSize, downloadSize);
  });

  it(`should upload and download file with added tracking parameter`, function() {
    const trackingUrl =
      '?fbclid=IaMFak3Tr4ck1ng1d_SDlP0shBk8SM2EN3cCLFKpHVl-k-Pvv0sf9Zy0tnTu9srqVY';
    const password = 'strongpassword';

    browser.chooseFile(
      homePage.uploadInput,
      `${testFilesPath}/${testFiles[0]}`
    );
    browser.waitForExist(homePage.addPassword);
    browser.click(homePage.addPassword);
    browser.waitForExist(homePage.passwordInput);
    browser.setValue(homePage.passwordInput, password);
    browser.click(homePage.uploadButton);
    browser.waitForExist(homePage.shareUrl);
    const shareUrl = browser.getValue(homePage.shareUrl);
    const downloadPage = new DownloadPage(
      shareUrl.replace('#', `${trackingUrl}#`)
    );
    downloadPage.open();
    downloadPage.downloadUsingPassword(password);
    browser.waitForExist(downloadPage.downloadComplete);
    assert.ok(fs.existsSync(path.join(downloadDir, testFiles[0])));
  });
});
