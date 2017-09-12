const config = require('./config');
const layout = require('./layout');
const locales = require('../common/locales');

module.exports = function(req) {
  const locale = req.language || 'en-US';
  return {
    locale,
    translate: locales.getTranslator(locale),
    title: 'Firefox Send',
    description:
      'Encrypt and send files with a link that automatically expires to ensure your important documents don’t stay online forever.',
    baseUrl: config.base_url,
    ui: {},
    storage: {
      files: []
    },
    config: {
      uploadWindowStyle: 'upload-window',
      uploadButtonStyle: 'browse btn'
    },
    layout
  };
};
