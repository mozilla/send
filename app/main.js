import 'fast-text-encoding'; // MS Edge support
import 'fluent-intl-polyfill';
import app from './routes';
import capabilities from './capabilities';
import locale from '../common/locales';
import fileManager from './fileManager';
import dragManager from './dragManager';
import pasteManager from './pasteManager';
import storage from './storage';
import metrics from './metrics';
import experiments from './experiments';
import Raven from 'raven-js';
import './main.css';
import User from './user';

(async function start() {
  if (navigator.doNotTrack !== '1' && window.RAVEN_CONFIG) {
    Raven.config(window.SENTRY_ID, window.RAVEN_CONFIG).install();
  }
  const capa = await capabilities();
  if (capa.streamDownload) {
    navigator.serviceWorker.register('/serviceWorker.js');
  }

  app.use((state, emitter) => {
    state.capabilities = capa;
    state.transfer = null;
    state.fileInfo = null;
    state.translate = locale.getTranslator();
    state.storage = storage;
    state.raven = Raven;
    state.user = new User(storage);
    window.appState = state;
    let unsupportedReason = null;
    if (
      // Firefox < 50
      /firefox/i.test(navigator.userAgent) &&
      parseInt(navigator.userAgent.match(/firefox\/*([^\n\r]*)\./i)[1], 10) < 50
    ) {
      unsupportedReason = 'outdated';
    }
    if (!state.capabilities.crypto) {
      unsupportedReason = /firefox/i.test(navigator.userAgent)
        ? 'outdated'
        : 'gcm';
    }
    if (unsupportedReason) {
      setTimeout(() =>
        emitter.emit('replaceState', `/unsupported/${unsupportedReason}`)
      );
    }
  });
  app.use(metrics);
  app.use(fileManager);
  app.use(dragManager);
  app.use(experiments);
  app.use(pasteManager);
  app.mount('body');
})();
