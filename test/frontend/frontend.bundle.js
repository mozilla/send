class FakeFile extends Blob {
  constructor(name, data, opt) {
    super(data, opt);
    this.name = name;
  }
}

window.Raven = {
  captureException: function(err) {
    console.error(err, err.stack);
  }
};

window.FakeFile = FakeFile;
window.FileSender = require('../../app/fileSender');
window.FileReceiver = require('../../app/fileReceiver');
window.sinon = require('sinon');
window.server = window.sinon.fakeServer.create();
window.assert = require('assert');
const utils = require('../../app/utils');
window.hexToArray = utils.hexToArray;
window.arrayToHex = utils.arrayToHex;
