const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

child_process.execSync('npm run build');

const prefix = path.join('..', '..', 'dist');
const json_string = fs.readFileSync(path.join(prefix, 'manifest.json'));
const manifest = JSON.parse(json_string);

const android_filename = manifest['android.js'];
fs.writeFileSync(
  'src/main/assets/android.js',
  fs.readFileSync(`${prefix}${android_filename}`)
);

const vendor_filename = manifest['vendor.js'];
fs.writeFileSync(
  'src/main/assets/vendor.js',
  fs.readFileSync(`${prefix}${vendor_filename}`)
);
