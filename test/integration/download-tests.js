import DownloadPage from './pages/desktop/download_page';
import HomePage from './pages/desktop/home_page';
import SharePage from './pages/desktop/share_page';

const chai = require('chai');
const fs = require('fs');
const path = require('path');

describe('Firefox Send', () => {
  const baseUrl = browser.options['baseUrl'];
  const downloadDir =
    browser.desiredCapabilities['moz:firefoxOptions']['prefs'][
      'browser.download.dir'
    ];
  const testFilesPath = path.join(__dirname, 'fixtures');
  const testFiles = fs.readdirSync(testFilesPath);

  beforeEach(() => {
    browser.url('/');
    browser.execute(() => {
      document.getElementById('file-upload').style.display = 'block';
    });
    browser.waitForExist('#file-upload');
  });

  testFiles.forEach(file => {
    it(`should upload and download files, file: ${file}`, () => {
      browser.execute(() => {
        document.getElementById('file-upload').style.display = 'block';
      });
      browser.waitForExist('#file-upload');
      let homePage = new HomePage();
      browser.chooseFile('#file-upload', `${testFilesPath}/${file}`);
      browser.click(homePage.readyToSend);
      let sharePage = new SharePage();
      browser.waitForExist(sharePage.fileUrl);
      browser.url(browser.getValue(sharePage.fileUrl));
      let downloadPage = new DownloadPage();
      downloadPage.waitForPageToLoad();
      downloadPage.downloadBtn();
      // Wait for download to complete
      browser.waitUntil(() => {
        browser.waitForExist(downloadPage.downloadComplete);
        return (
          browser.getText(downloadPage.downloadComplete) === 'DOWNLOAD COMPLETE'
        );
      });
      chai.assert.isTrue(fs.existsSync(`${downloadDir}/${file}`));
    });
  });
});
