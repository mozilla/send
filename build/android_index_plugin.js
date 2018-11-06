const path = require('path');
const html = require('choo/html');
const NAME = 'AndroidIndexPlugin';

function chunkFileNames(compilation) {
  const names = {};
  for (const chunk of compilation.chunks) {
    for (const file of chunk.files) {
      if (!/\.map$/.test(file)) {
        names[`${chunk.name}${path.extname(file)}`] = file;
      }
    }
  }
  return names;
}
class AndroidIndexPlugin {
  apply(compiler) {
    const assets = {};
    compiler.hooks.compilation.tap(NAME, compilation => {
      compilation.hooks.moduleAsset.tap(NAME, (mod, file) => {
        if (mod.userRequest) {
          assets[
            path.join(path.dirname(file), path.basename(mod.userRequest))
          ] = file;
        }
      });
    });
    compiler.hooks.emit.tap(NAME, compilation => {
      const files = chunkFileNames(compilation);
      const page = html`
      <html lang="en-US">
        <head>
          <title>Firefox Send</title>
          <link href="${files['app.css']}" rel="stylesheet">
          <script src="${files['vendor.js']}"></script>
          <script src="${assets['public/locales/en-US/send.ftl']}"></script>
          <script src="${files['android.js']}"></script>
        </head>
        <body>
        </body>
      </html>
      `
        .toString()
        .replace(/\n\s{6}/g, '\n');
      compilation.assets['android.html'] = {
        source() {
          return page;
        },
        size() {
          return page.length;
        }
      };
    });
  }
}

module.exports = AndroidIndexPlugin;
