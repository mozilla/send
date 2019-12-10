const gitRevSync = require('git-rev-sync');
const pkg = require('../package.json');

let commit = 'unknown';

try {
  commit = gitRevSync.short();
} catch (e) {
  console.warn('Error fetching current git commit: ' + e);
}

const version = JSON.stringify({
  commit,
  source: pkg.homepage,
  version: process.env.CIRCLE_TAG || `v${pkg.version}`
});

class VersionPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('VersionPlugin', compilation => {
      compilation.assets['version.json'] = {
        source() {
          return version;
        },
        size() {
          return version.length;
        }
      };
    });
  }
}

module.exports = VersionPlugin;
