/* global window, navigator */

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

import choo from 'choo';
import html from 'choo/html';
import Raven from 'raven-js';

import assets from '../common/assets';
import header from '../app/ui/header';
import locale from '../common/locales';
import storage from '../app/storage';
import controller from '../app/controller';
import User from './user';
import intents from './stores/intents';
import home from './pages/home';
import upload from './pages/upload';
import share from './pages/share';
import preferences from './pages/preferences';
import error from './pages/error';

if (navigator.userAgent === 'Send Android') {
  assets.setPrefix('/android_asset');
}

const app = choo();
//app.use(state);
app.use(controller);
app.use(intents);

function body(main) {
  return function(state, emit) {
    return html`
      <body
        class="flex flex-col items-center font-sans bg-blue-lightest md:h-screen md:bg-grey-lightest"
      >
        <a
          id="hamburger"
          class="absolute pin-t pin-r z-50"
          href="#"
          onclick="${clickPreferences}"
        >
          <img src="${assets.get('preferences.png')}" />
        </a>
        ${header(state, emit)} ${main(state, emit)}
      </body>
    `;

    function clickPreferences(event) {
      event.preventDefault();
      emit('pushState', '/preferences');
    }
  };
}

app.use((state, emitter) => {
  state.translate = locale.getTranslator();
  state.capabilities = {
    account: true
  }; //TODO
  state.storage = storage;
  state.user = new User(storage);
  state.raven = Raven;

  window.finishLogin = async function(accountInfo) {
    await state.user.finishLogin(accountInfo);
    emitter.emit('render');
  };

  // for debugging
  window.appState = state;
  window.appEmit = emitter.emit.bind(emitter);
});
app.route('/', body(home));
app.route('/upload', upload);
app.route('/share/:id', share);
app.route('/preferences', preferences);
app.route('/error', error);
//app.route('/debugging', require('./pages/debugging').default);
// add /api/filelist
app.mount('body');
