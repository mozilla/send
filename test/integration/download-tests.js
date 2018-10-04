/* global browser document */
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const DownloadPage = require('./pages/desktop/download_page');
const HomePage = require('./pages/desktop/home_page');
const SharePage = require('./pages/desktop/share_page');

describe('Firefox Send', function() {
  const downloadDir =
    browser.desiredCapabilities['moz:firefoxOptions']['prefs'][
      'browser.download.dir'
    ];
  const testFilesPath = path.join(__dirname, 'fixtures');
  const testFiles = fs.readdirSync(testFilesPath);

  beforeEach(function() {
    browser.url('/');
    browser.execute(() => {
      document.getElementById('file-upload').style.display = 'block';
    });
    browser.waitForExist('#file-upload');
  });

  testFiles.forEach(file => {
    it(`should upload and download files, file: ${file}`, function() {
      browser.execute(() => {
        document.getElementById('file-upload').style.display = 'block';
      });
      browser.waitForExist('#file-upload');
      const homePage = new HomePage();
      browser.chooseFile('#file-upload', `${testFilesPath}/${file}`);
      browser.click(homePage.readyToSend);
      const sharePage = new SharePage();
      browser.waitForExist(sharePage.fileUrl);
      browser.url(browser.getValue(sharePage.fileUrl));
      const downloadPage = new DownloadPage();
      downloadPage.waitForPageToLoad();
      downloadPage.downloadBtn();
      // Wait for download to complete
      browser.waitUntil(() => {
        browser.waitForExist(downloadPage.downloadComplete);
        return (
          browser.getText(downloadPage.downloadComplete) === 'DOWNLOAD COMPLETE'
        );
      });
      assert.ok(fs.existsSync(path.join(downloadDir, file)));
    });
  });
});
