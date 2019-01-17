/* global browser */
const assert = require('assert');
const HomePage = require('./pages/desktop/home_page');

describe('Firefox Send homepage', function() {
  const homePage = new HomePage();
  const baseUrl = browser.config['baseUrl'];
  const footerLinks = [
    'mozilla',
    'legal',
    'legal',
    'cookies',
    'report-infringement',
    'github'
  ];

  beforeEach(function() {
    homePage.open();
  });

  it('should have the right title', function() {
    assert.equal(browser.getTitle(), 'Firefox Send');
  });

  footerLinks.forEach((link, i) => {
    it(`should navigate to the correct page: ${link}`, function() {
      // Click links on bottom of page
      const els = $$(homePage.footerLinks);
      els[i].click();
      // Wait for page to load
      browser.waitUntil(() => {
        const url = browser.getUrl();
        return url !== baseUrl;
      });
      assert.ok(browser.getUrl().includes(link));
    });
  });
});
