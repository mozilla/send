const assert = require('assert');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

describe('frontend unit tests', function() {
  it('pass with flying colors', function() {
    browser.url('/test');
    browser.waitUntil(() => {
      return browser.execute(() => typeof runner.testResults !== 'undefined')
        .value;
    });
    const results = browser.execute(() => runner.testResults).value;
    const stats = results.stats;
    assert.equal(stats.failures, 0);

    const coverage = browser.execute(() => __coverage__).value;
    if (coverage) {
      const dir = path.resolve(__dirname, '../../.nyc_output');
      mkdirp.sync(dir);
      fs.writeFileSync(
        path.resolve(dir, 'frontend.json'),
        JSON.stringify(coverage)
      );
    }
  });
});
