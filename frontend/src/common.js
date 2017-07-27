window.Raven = require('raven-js');
window.Raven.config(window.dsn).install();
window.dsn = undefined;

const testPilotGA = require('testpilot-ga');
const {gcmCompliant, sendEvent} = require('./utils');
window.analytics = new testPilotGA({
  an: 'Firefox Send',
  ds: 'web',
  tid: window.trackerId
});

const isSender = location.pathname.includes('/download');

gcmCompliant().catch(err => {
  $('#page-one').attr('hidden', true);
  $('#download').attr('hidden', true);
  sendEvent(isSender ? 'sender' : 'recipient', 'unsupported', {
    cd6: err
  }).then(() => {
    location.replace('/unsupported');
  });
});

if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1 &&
    parseInt(navigator.userAgent.toLowerCase().match(/firefox\/*([^\n\r]*)\./)[1]) <= 49) {
    sendEvent(isSender ? 'sender' : 'recipient', 'unsupported', {
      cd6: new Error('Firefox is outdated.')
    }).then(() => {
      location.replace('/unsupported');
    });
}