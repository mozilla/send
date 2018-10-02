import ProgressPage from './pages/desktop/progress_page';
import HomePage from './pages/desktop/home_page';

const assert = require('assert');

describe('Firefox Send progress page', () => {
  const baseUrl = browser.options['baseUrl'];

  beforeEach(() => {
    browser.url('/');
  });

  it('should show an icon while an upload is in progress', () => {
    browser.execute(() => {
      document.getElementById('file-upload').style.display = 'block';
    });
    browser.waitForExist('#file-upload');
    let homePage = new HomePage();
    browser.chooseFile('#file-upload', __filename);
    browser.click(homePage.readyToSend);
    let progressPage = new ProgressPage();
    assert.ok(progressPage.waitForPageToLoad());
  });
});
