const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');
const mkdirp = require('mkdirp');

let commit;

try {
  commit = require('git-rev-sync').short();
} catch (err) {
  // Whatever...
}

const filename = path.join(__dirname, '..', 'dist', 'public', 'version.json');
const filedata = {
  commit,
  source: pkg.homepage,
  version: process.env.CIRCLE_TAG || `v${pkg.version}`
};
mkdirp.sync(path.dirname(filename));
fs.writeFileSync(filename, JSON.stringify(filedata, null, 2) + '\n');
