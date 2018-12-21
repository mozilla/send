/* global LOCALE */
import 'core-js';
import 'fast-text-encoding'; // MS Edge support
import 'fluent-intl-polyfill';
import choo from 'choo';
import nanotiming from 'nanotiming';
import routes from './routes';
import getCapabilities from './capabilities';
import controller from './controller';
import dragManager from './dragManager';
import pasteManager from './pasteManager';
import storage from './storage';
import metrics from './metrics';
import experiments from './experiments';
import Raven from 'raven-js';
import './main.css';
import User from './user';
import { getTranslator } from './locale';
import Archive from './archive';

if (navigator.doNotTrack !== '1' && window.RAVEN_CONFIG) {
  Raven.config(window.SENTRY_ID, window.RAVEN_CONFIG).install();
}

if (process.env.NODE_ENV === 'production') {
  nanotiming.disabled = true;
}

(async function start() {
  const capabilities = await getCapabilities();
  if (!capabilities.crypto) {
    return window.location.assign('/unsupported/crypto');
  }
  if (capabilities.serviceWorker) {
    await navigator.serviceWorker.register('/serviceWorker.js');
    await navigator.serviceWorker.ready;
  }

  const translate = await getTranslator(LOCALE);
  window.initialState = {
    archive: new Archive(),
    capabilities,
    translate,
    storage,
    raven: Raven,
    user: new User(storage),
    transfer: null,
    fileInfo: null
  };

  const app = routes(choo());
  app.use(metrics);
  app.use(controller);
  app.use(dragManager);
  app.use(experiments);
  app.use(pasteManager);
  app.mount('body');
})();
