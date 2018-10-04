/* global browser */
const assert = require('assert');
const HomePage = require('./pages/desktop/home_page');

describe('Firefox Send homepage', function() {
  const baseUrl = browser.options['baseUrl'];
  const legalLinks = [
    'legal',
    'about',
    'legal',
    'cookies',
    'report-infringement'
  ];
  const socialLinks = ['github', 'twitter', 'mozilla'];

  beforeEach(function() {
    browser.url('/');
    browser.pause(500);
  });

  it('should have the right title', function() {
    assert.equal(browser.getTitle(), 'Firefox Send');
  });

  legalLinks.forEach((link, i) => {
    it(`should navigate to the correct legal pages, page: ${link}`, function() {
      const homePage = new HomePage();
      // Click links on bottom of page
      const els = browser.elements(homePage.legalLinks);
      browser.elementIdClick(els.value[i].ELEMENT);
      // Wait for page to load
      browser.waitUntil(() => {
        const url = browser.getUrl();
        return url !== baseUrl;
      });
      assert.ok(browser.getUrl().includes(link));
    });
  });

  socialLinks.forEach((link, i) => {
    it(`should navigate to the correct social pages, page: ${link}`, function() {
      const homePage = new HomePage();
      // Click links on bottom of page
      const els = browser.elements(homePage.socialLinks);
      browser.elementIdClick(els.value[i].ELEMENT);
      // Wait for page to load
      browser.waitUntil(() => {
        const url = browser.getUrl();
        return url !== baseUrl;
      });
      assert.ok(browser.getUrl().includes(link));
    });
  });
});
