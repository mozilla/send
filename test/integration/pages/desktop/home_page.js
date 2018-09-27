import Page from './page';

export default class HomePage extends Page {
  constructor() {
    super();
    this.legalSectionLinks = '.legalSection__link';
  }

  get legalLinks() {
    return this.legalSectionLinks;
  }
}
