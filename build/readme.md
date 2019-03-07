# Custom Loaders

## Generate Asset Map

This loader enumerates all the files in `assets/` so that `common/assets.js` can provide mappings from the source filename to the hashed filename used on the site.

## Version Plugin

Creates a `version.json` file that gets exposed by the `/__version__` route from the `package.json` file and current git commit hash.

# See Also

- [docs/build.md](../docs/build.md)
- [webpack.config.js](../webpack.config.js)