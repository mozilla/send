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
    compiler.hooks.emit.tap(NAME, compilation => {
      const files = chunkFileNames(compilation);
      const page = html`
        <html lang="en-US">
          <head>
            <title>Firefox Send</title>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link href="${files['app.css']}" rel="stylesheet" />
            <script src="${files['android.js']}"></script>
          </head>
          <body></body>
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
