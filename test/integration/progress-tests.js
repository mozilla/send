/* global browser */
const assert = require('assert');
const HomePage = require('./pages/desktop/home_page');

describe('Firefox Send progress page', function() {
  const homePage = new HomePage();
  beforeEach(function() {
    homePage.open();
  });

  it('should show progress when a file is uploading', function() {
    browser.chooseFile(homePage.uploadInput, __filename);
    browser.waitForExist(homePage.uploadButton);
    browser.click(homePage.uploadButton);

    assert.ok(browser.waitForExist(homePage.progress));
  });
});
