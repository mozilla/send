const assert = require('assert');

describe('homepage', function() {
  it('has the right title', function() {
    browser.url('/');
    assert.equal(browser.getTitle(), 'Firefox Send');
  });
});
