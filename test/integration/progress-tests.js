import ProgressPage from './pages/desktop/progress_page';

const assert = require('assert');
const chai = require('chai');

describe('Firefox Send progress page', () => {
  const baseUrl = browser.options['baseUrl'];

  beforeEach(() => {
    browser.url('/');
  });

  it('should show an icon while an upload is in progress', () => {
    let progressPage = new ProgressPage();
    browser.chooseFile('#file-upload', __filename);
    chai.expect(progressPage.waitForPageToLoad()).to.be.ok;
  });
});
