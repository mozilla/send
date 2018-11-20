const assets = require('../../common/assets');

module.exports = function(req, res) {
  const manifest = {
    name: 'Firefox Send',
    short_name: 'Send',
    lang: req.language,
    icons: [
      {
        src: assets.get('favicon-144.png'),
        type: 'image/png',
        sizes: '144x144'
      },
      {
        src: assets.get('send_logo.svg'),
        type: 'image/svg',
        sizes: '192x192 512x512'
      }
    ],
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    theme_color: '#0a84ff',
    background_color: 'white'
  };
  res.set('Content-Type', 'application/manifest+json');
  res.json(manifest);
};
