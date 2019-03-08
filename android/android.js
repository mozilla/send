/* global window, navigator */
import choo from 'choo';
import html from 'choo/html';
import Raven from 'raven-js';

import { setApiUrlPrefix, getConstants } from '../app/api';
import metrics from '../app/metrics';
//import assets from '../common/assets';
import Archive from '../app/archive';
import Header from '../app/ui/header';
import storage from '../app/storage';
import controller from '../app/controller';
import User from './user';
import intents from './stores/intents';
import home from './pages/home';
import upload from './pages/upload';
import share from './pages/share';
import preferences from './pages/preferences';
import error from './pages/error';
import { getTranslator } from '../app/locale';
import { delay } from '../app/utils';

if (navigator.userAgent === 'Send Android') {
  setApiUrlPrefix('https://send2.dev.lcip.org');
}

const app = choo();
//app.use(state);
app.use(controller);
app.use(intents);

window.finishLogin = async function(accountInfo) {
  while (!(app.state && app.state.user)) {
    await delay();
  }
  await app.state.user.finishLogin(accountInfo);
  await app.state.user.syncFileList();
  app.emitter.emit('replaceState', '/');
};

function body(main) {
  return function(state, emit) {
    /*
      Disable the preferences menu for now since it is ugly and isn't
      relevant to the beta
    function clickPreferences(event) {
      event.preventDefault();
      emit('pushState', '/preferences');
    }

    const menu = html`<a
        id="hamburger"
        class="absolute pin-t pin-r z-50"
        href="#"
        onclick="${clickPreferences}"
      >
        <img src="${assets.get('preferences.png')}" />
      </a>`;
    */
    return html`
      <body
        class="flex flex-col items-center font-sans bg-grey-lightest h-screen"
      >
        ${state.cache(Header, 'header').render()} ${main(state, emit)}
      </body>
    `;
  };
}
(async function start() {
  const translate = await getTranslator('en-US');
  const { LIMITS, DEFAULTS } = await getConstants();
  app.use(state => {
    state.LIMITS = LIMITS;
    state.DEFAULTS = DEFAULTS;
    state.translate = translate;
    state.capabilities = {
      account: true
    }; //TODO
    state.archive = new Archive([], DEFAULTS.EXPIRE_SECONDS);
    state.storage = storage;
    state.user = new User(storage, LIMITS, {
      issuer: 'https://accounts.firefox.com'
    });
    state.raven = Raven;
  });
  app.use(metrics);
  app.route('/', body(home));
  app.route('/upload', upload);
  app.route('/share/:id', share);
  app.route('/preferences', preferences);
  app.route('/error', error);
  //app.route('/debugging', require('./pages/debugging').default);
  // add /api/filelist
  app.mount('body');
})();

window.app = app;
