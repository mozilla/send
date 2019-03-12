const assets = require('../../common/assets');

module.exports = function(req, res) {
  const manifest = {
    name: 'Firefox Send',
    short_name: 'Send',
    lang: req.language,
    icons: [
      {
        src: assets.get('android-chrome-192x192.png'),
        type: 'image/png',
        sizes: '192x192'
      },
      {
        src: assets.get('android-chrome-512x512.png'),
        type: 'image/png',
        sizes: '512x512'
      }
    ],
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    theme_color: '#220033',
    background_color: 'white'
  };
  res.set('Content-Type', 'application/manifest+json');
  res.json(manifest);
};
