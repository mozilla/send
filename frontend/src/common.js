import Raven from 'raven-js';
import { unsupported } from './metrics';

if (navigator.doNotTrack !== '1' && window.RAVEN_CONFIG) {
  Raven.config(window.SENTRY_ID, window.RAVEN_CONFIG).install();
}

const ua = navigator.userAgent.toLowerCase();
if (
  ua.indexOf('firefox') > -1 &&
  parseInt(ua.match(/firefox\/*([^\n\r]*)\./)[1], 10) <= 49
) {
  unsupported({
    err: new Error('Firefox is outdated.')
  }).then(() => {
    location.replace('/unsupported/outdated');
  });
}

export { Raven };
