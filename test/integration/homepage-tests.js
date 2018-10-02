import HomePage from './pages/desktop/home_page';

const assert = require('assert');

describe('Firefox Send homepage', () => {
  const baseUrl = browser.options['baseUrl'];
  const legalLinks = [
    'legal',
    'about',
    'legal',
    'cookies',
    'report-infringement'
  ];
  const socialLinks = ['github', 'twitter', 'mozilla'];

  beforeEach(() => {
    browser.url('/');
    browser.pause(500);
  });

  it('should have the right title', () => {
    chai.expect(browser.getTitle()).to.equal('Firefox Send');
  });

  legalLinks.forEach((link, i) => {
    it(`should navigate to the correct legal pages, page: ${link}`, () => {
      let homePage = new HomePage();
      // Click links on bottom of page
      var els = browser.elements(homePage.legalLinks);
      if (i === 0) {
      }
      browser.elementIdClick(els.value[i].ELEMENT);
      // Wait for page to load
      browser.waitUntil(() => {
        let url = browser.getUrl();
        return url !== baseUrl;
      });
      assert.ok(browser.getUrl().includes(link));
    });
  });

  socialLinks.forEach((link, i) => {
    it(`should navigate to the correct social pages, page: ${link}`, () => {
      let homePage = new HomePage();
      // Click links on bottom of page
      var els = browser.elements(homePage.socialLinks);
      browser.elementIdClick(els.value[i].ELEMENT);
      // Wait for page to load
      browser.waitUntil(() => {
        let url = browser.getUrl();
        return url !== baseUrl;
      });
      assert.ok(browser.getUrl().includes(link));
    });
  });
});
