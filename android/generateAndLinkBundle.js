const child_process = require('child_process');
const fs = require('fs');

child_process.execSync('npm run build');

const json_string = fs.readFileSync('../../dist/manifest.json');
const manifest = JSON.parse(json_string);

const android_filename = manifest['android.js'];
fs.writeFileSync(
  'src/main/assets/android.js',
  fs.readFileSync(`../../dist/${android_filename}`)
);

const vendor_filename = manifest['vendor.js'];
fs.writeFileSync(
  'src/main/assets/vendor.js',
  fs.readFileSync(`../../dist/${vendor_filename}`)
);

const runtime_filename = manifest['runtime.js'];
fs.writeFileSync(
  'src/main/assets/runtime.js',
  fs.readFileSync(`../../dist/${runtime_filename}`)
);
