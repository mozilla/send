window.Raven = require('raven-js');
window.Raven.config(window.dsn).install();
window.dsn = undefined;

const testPilotGA = require('testpilot-ga');
const { gcmCompliant, sendEvent } = require('./utils');
window.analytics = new testPilotGA({
  an: 'Firefox Send',
  ds: 'web',
  tid: window.trackerId
});

const isSender = !location.pathname.includes('/download');
const ec = isSender ? 'sender' : 'recipient';
const ua = navigator.userAgent.toLowerCase();

gcmCompliant().catch(err => {
  sendEvent(ec, 'unsupported', {
    cd6: err
  }).then(() => {
    location.replace('/unsupported/gcm');
  });
});

if (
  ua.indexOf('firefox') > -1 &&
  parseInt(ua.match(/firefox\/*([^\n\r]*)\./)[1], 10) <= 49
) {
  sendEvent(ec, 'unsupported', {
    cd6: new Error('Firefox is outdated.')
  }).then(() => {
    location.replace('/unsupported/outdated');
  });
}
