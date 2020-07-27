const raw = require('choo/html/raw');
const qrcode = require('../qrcode');

module.exports = function(url) {
  const gen = qrcode(5, 'L');
  gen.addData(url);
  gen.make();
  const qr = gen.createSvgTag({ scalable: true });
  return raw(qr);
};
