import Page from './page';

export default class SharePage extends Page {
  constructor() {
    super();
    this.sharePageLocator = '.sharePage';
    this.shareUrlLocator = '#fileUrl';
  }

  waitForPageToLoad() {
    browser.waitUntil(() => {
      browser.waitForExist(this.sharePageLocator);
      let el = browser.element(this.sharePageLocator);
      return browser.elementIdDisplayed(el.value.ELEMENT);
    });
    return this;
  }

  get fileUrl() {
    return this.shareUrlLocator;
  }
}
