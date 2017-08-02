const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

let commit;

try {
  commit = require('git-rev-sync').short();
} catch (err) {
  // Whatever...
}

const filename = path.join(__dirname, '..', 'public', 'version.json');
const filedata = {
  commit,
  source: pkg.homepage,
  version: process.env.CIRCLE_TAG || `v${pkg.version}`
};

fs.writeFileSync(filename, JSON.stringify(filedata, null, 2) + '\n');
