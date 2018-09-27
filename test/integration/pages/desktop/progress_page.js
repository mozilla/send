import Page from './page';
import SharePage from './share_page';

export default class ProgressPage extends Page {
  constructor() {
    super();
    this.cancelBtnLocator = '#cancel-upload';
    this.progressIconLocator = '.progress__bar';
  }

  /**
   * @function waitForPageToLoad
   * @returns {Object} An object representing the Share page.
   * @throws ElementNotFound
   */
  waitForPageToLoad() {
    browser.waitUntil(() => {
      browser.waitForExist(this.progressIconLocator);
      let el = browser.element(this.progressIconLocator);
      return browser.elementIdDisplayed(el.value.ELEMENT);
    });
    let sharePage = new SharePage();
    return sharePage.waitForPageToLoad();
  }

  get cancelBtn() {
    return this.cancelBtnLocator;
  }
}
