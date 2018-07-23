const commit = require('git-rev-sync').short();
const pkg = require('../package.json');

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
          return version.length
        }
      }
    })
  }
}

module.exports = VersionPlugin;
