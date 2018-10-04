const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const dir = path.join(__dirname, 'integration', 'downloads');

mkdirp.sync(dir);
rimraf.sync(`${dir}${path.sep}*`);

exports.config = {
  specs: [path.join(__dirname, './integration/**/*-tests.js')],
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
      browserName: 'firefox',
      'moz:firefoxOptions': {
        log: { level: 'trace' },
        prefs: {
          'browser.download.panel.shown': false,
          'browser.helperApps.neverAsk.openFile': 'text/plain',
          'browser.helperApps.neverAsk.saveToDisk': 'text/plain',
          'browser.download.folderList': 2,
          'browser.download.dir': dir
        }
      }
    }
  ],
  pageLoadStrategy: 'normal',
  watch: false,
  async: true,
  logLevel: 'error',
  coloredLogs: true,
  deprecationWarnings: true,
  bail: 0,
  screenshotOnReject: false,
  baseUrl: 'http://localhost:8000',
  waitforTimeout: 20000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: ['firefox-profile'],
  framework: 'mocha',
  reporters: ['dot', 'spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 30000,
    retries: 1
  }
};
