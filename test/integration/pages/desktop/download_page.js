import Page from './page';

export default class DownloadPage extends Page {
  constructor() {
    super();
    this.downloadBtnLocator = '.btn--download';
    this.downloadCompletedLocator = 'main .page.effect--fadeIn .title';
  }

  /**
   * @function waitForPageToLoad
   * @returns {Object} An object representing the page.
   * @throws ElementNotFound
   */
  waitForPageToLoad() {
    browser.waitUntil(() => {
      browser.waitForExist(this.downloadBtnLocator);
      let el = browser.element(this.downloadBtnLocator);
      return browser.elementIdDisplayed(el.value.ELEMENT);
    });
    return this;
  }

  downloadBtn() {
    this.waitForPageToLoad();
    return browser.click(this.downloadBtnLocator);
  }

  get downloadComplete() {
    return this.downloadCompletedLocator;
  }
}
