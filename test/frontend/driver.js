const webdriver = require('selenium-webdriver');
const path = require('path');
const until = webdriver.until;

const driver = new webdriver.Builder()
  .forBrowser('firefox')
  .build();

driver.get(path.join('file:///', __dirname, '/frontend.test.html'));
driver.wait(until.titleIs('Mocha Tests'));
driver.wait(until.titleMatches(/^[0-1]$/));

driver.getTitle().then(title => {
  driver.quit().then(() => {
    if (title === '0') {
      console.log('Frontend tests have passed.');
    } else {
      throw new Error('Frontend tests are failing. ' + 
                'Please open the frontend.test.html file in a browser.');
    }
  })
})