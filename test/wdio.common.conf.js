const path = require('path');
// Docs: http://webdriver.io/guide/testrunner/configurationfile.html

exports.config = {
  specs: [path.join(__dirname, './ui/**/*-tests.js')],
  exclude: [],
  maxInstances: 10,
  capabilities: [{ browserName: 'firefox' }],
  watch: false,
  sync: true,
  logLevel: 'error',
  coloredLogs: true,
  deprecationWarnings: true,
  bail: 0,
  screenshotPath: path.join(__dirname, './ui/errorShots/'),
  baseUrl: 'http://localhost:8081',
  waitforTimeout: 20000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: [],
  framework: 'mocha',
  reporters: ['dot'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 30000
  }
};
