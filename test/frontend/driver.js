var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
  .forBrowser('firefox')
  .build();

driver.get('file:///' + __dirname + '/frontend.test.html');
driver.wait(until.titleIs('Mocha Tests'), 1000);
driver.wait(until.titleMatches(/^[0-1]$/), 10000);

driver.getTitle().then(title => {
  driver.quit().then(() => {
    if (title === "0") {
      process.exit(0);
    } else {
      throw new Error(`Frontend tests are failing. ` + 
                `Please open the frontend.test.html file in a browser.`);
    }
  })
})