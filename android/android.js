/* global window, navigator, Android */

window.LIMITS = {
  ANON: {
    MAX_FILE_SIZE: 1024 * 1024 * 1024 * 2,
    MAX_DOWNLOADS: 32,
    MAX_EXPIRE_SECONDS: 604800
  },
  MAX_FILE_SIZE: 1024 * 1024 * 1024 * 2,
  MAX_DOWNLOADS: 32,
  MAX_EXPIRE_SECONDS: 604800,
  MAX_FILES_PER_ARCHIVE: 32,
  MAX_ARCHIVES_PER_USER: 32
};

window.DEFAULTS = {
  DOWNLOAD_COUNTS: [1, 2, 3, 4, 5, 20, 50, 100, 200],
  EXPIRE_TIMES_SECONDS: [300, 3600, 86400, 604800],
  EXPIRE_SECONDS: 3600
};

const choo = require('choo');
const html = require('choo/html');
const assets = require('../common/assets');
const header = require('../app/ui/header');
const locale = require('../common/locales');
const home = require('../app/ui/home');
const fxa = require('../app/fxa');
const app = choo();

if (navigator.userAgent === 'Send Android') {
  assets.setPrefix('/android_asset');
}

function body(main) {
  return function(state, emit) {
    return html`<body class="flex flex-col items-center font-sans bg-blue-lightest md:h-screen md:bg-grey-lightest">
      <a id="hamburger" class="absolute pin-t pin-r z-50" href="#" onclick=${clickPreferences}>
        <img src=${assets.get('preferences.png')} />
      </a>
      ${header(state, emit)}
      ${main(state, emit)}
    </body>`;

    function clickPreferences(event) {
      event.preventDefault();
      emit('pushState', '/preferences');
    }
  };
}

app.use(require('./stores/state').default);
app.use((state, emitter) => {
  state.translate = locale.getTranslator();
  state.capabilities = {
    account: true
  }; //TODO

  window.finishLogin = async function(stuff) {
    const jwks = JSON.parse(stuff.keys);
    const ikm = jwks['https://identity.mozilla.com/apps/send'].k;
    const profile = {
      displayName: stuff.displayName,
      email: stuff.email,
      avatar: stuff.avatar,
      access_token: stuff.accessToken
    };
    profile.fileListKey = await fxa.deriveFileListKey(ikm);
    state.user.info = profile;
    emitter.emit('render');
  };
  emitter.on('login', () => {
    Android.beginOAuthFlow();
  });

  // for debugging
  window.appState = state;
  window.appEmit = emitter.emit.bind(emitter);
});
// app.use(require('../app/fileManager').default);
app.use(require('./stores/intents').default);
app.route('/', body(home));
app.route('/options', require('./pages/options').default);
app.route('/upload', require('./pages/upload').default);
app.route('/share/:id', require('./pages/share').default);
app.route('/preferences', require('./pages/preferences').default);
app.route('/error', require('./pages/error').default);
//app.route('/debugging', require('./pages/debugging').default);
// add /api/filelist
app.mount('body');
