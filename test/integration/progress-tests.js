/* global browser document */
const assert = require('assert');
const ProgressPage = require('./pages/desktop/progress_page');
const HomePage = require('./pages/desktop/home_page');

describe('Firefox Send progress page', function() {
  beforeEach(function() {
    browser.url('/');
  });

  it('should show an icon while an upload is in progress', function() {
    browser.execute(() => {
      document.getElementById('file-upload').style.display = 'block';
    });
    browser.waitForExist('#file-upload');
    const homePage = new HomePage();
    browser.chooseFile('#file-upload', __filename);
    browser.click(homePage.readyToSend);
    const progressPage = new ProgressPage();
    assert.ok(progressPage.waitForPageToLoad());
  });
});
