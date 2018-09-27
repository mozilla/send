import HomePage from './pages/desktop/home_page';

const assert = require('assert');
const chai = require('chai');
let chaiWebdriver = require('chai-webdriverio').default;
//chai.use(chaiWebdriver(browser));

describe('Firefox Send homepage', () => {
  const baseUrl = browser.options['baseUrl'];
  const legalLinks = [
    'mozilla',
    'mozilla',
    'about',
    'legal',
    'legal',
    'cookies',
    'report-infringement'
  ];

  beforeEach(() => {
    browser.url('/');
  });

  it('should have the right title', () => {
    chai.expect(browser.getTitle()).to.equal('Firefox Send');
  });

  legalLinks.forEach((link, i) => {
    it(`should navigate to the correct footer pages, page: ${link}`, () => {
      let homePage = new HomePage();
      // Click links on bottom of page
      var els = browser.elements(homePage.legalLinks);
      browser.elementIdClick(els.value[i].ELEMENT);
      // Wait for page to load
      let url = browser.getUrl();
      browser.waitUntil(() => {
        return url !== baseUrl;
      });
      chai.expect(url).to.include(link);
    });
  });
});
