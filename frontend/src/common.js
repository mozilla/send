const testPilotGA = require('testpilot-ga');
const { sendEvent } = require('./utils');
const Raven = require('raven-js');

if (navigator.doNotTrack !== '1' && window.RAVEN_CONFIG) {
  Raven.config(window.SENTRY_ID, window.RAVEN_CONFIG).install();
}

const analytics = new testPilotGA({
  an: 'Firefox Send',
  ds: 'web',
  tid: window.GOOGLE_ANALYTICS_ID
});

const ua = navigator.userAgent.toLowerCase();
if (
  ua.indexOf('firefox') > -1 &&
  parseInt(ua.match(/firefox\/*([^\n\r]*)\./)[1], 10) <= 49
) {
  const isSender = !location.pathname.includes('/download');
  const ec = isSender ? 'sender' : 'recipient';
  sendEvent(ec, 'unsupported', {
    cd6: new Error('Firefox is outdated.')
  }).then(() => {
    location.replace('/unsupported/outdated');
  });
}

window.analytics = analytics;
window.Raven = Raven;
