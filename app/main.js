import app from './routes';
import locale from '../common/locales';
import fileManager from './fileManager';
import dragManager from './dragManager';
import { canHasSend } from './utils';
import assets from '../common/assets';
import storage from './storage';
import metrics from './metrics';
import experiments from './experiments';
import Raven from 'raven-js';

if (navigator.doNotTrack !== '1' && window.RAVEN_CONFIG) {
  Raven.config(window.SENTRY_ID, window.RAVEN_CONFIG).install();
}

app.use((state, emitter) => {
  // init state
  state.transfer = null;
  state.fileInfo = null;
  state.translate = locale.getTranslator();
  state.storage = storage;
  state.raven = Raven;
  emitter.on('DOMContentLoaded', async () => {
    if (
      /firefox/i.test(navigator.userAgent) &&
      parseInt(navigator.userAgent.match(/firefox\/*([^\n\r]*)\./i)[1], 10) <=
        49
    ) {
      return emitter.emit('replaceState', '/unsupported/outdated');
    }
    const ok = await canHasSend(assets.get('cryptofill.js'));
    if (!ok) {
      const reason = /firefox/i.test(navigator.userAgent) ? 'outdated' : 'gcm';
      emitter.emit('replaceState', `/unsupported/${reason}`);
    }
  });
});

app.use(metrics);
app.use(fileManager);
app.use(dragManager);
app.use(experiments);

app.mount('#page-one');
