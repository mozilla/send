const commit = require('git-rev-sync').short();

module.exports = function(source) {
  const pkg = JSON.parse(source);
  const version = {
    commit,
    source: pkg.homepage,
    version: process.env.CIRCLE_TAG || `v${pkg.version}`
  };
  return `module.exports = '${JSON.stringify(version)}'`;
};
