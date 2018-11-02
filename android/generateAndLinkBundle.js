const child_process = require('child_process');
const path = require('path');

child_process.execSync('npm run build');
child_process.execSync(
  `cp -R ${path.resolve(__dirname, '../dist')} ${path.resolve(
    __dirname,
    'app/src/main/assets'
  )}`
);
