const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

child_process.execSync('npm run build');

const prefix = path.join('..', 'dist');
const json_string = fs.readFileSync(path.join(prefix, 'manifest.json'));
const manifest = JSON.parse(json_string);

const ios_filename = manifest['ios.js'];
fs.writeFileSync(
  'send-ios/assets/ios.js',
  fs.readFileSync(`${prefix}${ios_filename}`)
);

const vendor_filename = manifest['vendor.js'];
fs.writeFileSync(
  'send-ios/assets/vendor.js',
  fs.readFileSync(`${prefix}${vendor_filename}`)
);
