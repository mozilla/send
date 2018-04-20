const assert = require('assert');

describe('uploading a file', function() {
  it('provides the share link', function() {
    browser.url('/');
    browser.chooseFile('#file-upload', __filename);
    browser.waitForExist('#shareWrapper');
    const url = $('#fileUrl').getValue();
    assert.ok(/https?:\/\/\S+\/download\/[a-f0-9]+\/#\w+/.test(url));
  });
});
