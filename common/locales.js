const gen = require('../build/generate_l10n_map');

const isServer = typeof gen === 'function';
const prefix = isServer ? '/' : '';
let manifest = {};
try {
  // eslint-disable-next-line node/no-missing-require
  manifest = require('../dist/manifest.json');
} catch (e) {
  // use middleware
}

const locales = isServer ? manifest : gen;

function getLocale(name) {
  return prefix + locales[`public/locales/${name}/send.ftl`];
}

function serverTranslator(name) {
  // eslint-disable-next-line security/detect-non-literal-require
  return require(`../dist/${locales[`public/locales/${name}/send.ftl`]}`);
}

function browserTranslator() {
  return locales.translate;
}

const translator = isServer ? serverTranslator : browserTranslator;

const instance = {
  get: getLocale,
  getTranslator: translator,
  setMiddleware: function(middleware) {
    if (middleware) {
      const _eval = require('require-from-string');
      instance.get = function getLocaleWithMiddleware(name) {
        const f = middleware.fileSystem.readFileSync(
          middleware.getFilenameFromUrl('/manifest.json')
        );
        return prefix + JSON.parse(f)[`public/locales/${name}/send.ftl`];
      };
      instance.getTranslator = function(name) {
        const f = middleware.fileSystem.readFileSync(
          middleware.getFilenameFromUrl(instance.get(name))
        );
        return _eval(f.toString());
      };
    }
  }
};

module.exports = instance;
