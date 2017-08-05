const testPilotGA = require('testpilot-ga');
const Raven = require('raven-js');

if (navigator.doNotTrack !== '1' && window.RAVEN_CONFIG) {
  Raven.config(window.SENTRY_ID, window.RAVEN_CONFIG).install();
}

const analytics = new testPilotGA({
  an: 'Firefox Send',
  ds: 'web',
  tid: window.GOOGLE_ANALYTICS_ID
});

function sendEvent() {
  return analytics.sendEvent.apply(analytics, arguments).catch(() => 0);
}

function findMetric(href) {
  switch (href) {
    case 'https://www.mozilla.org/':
      return 'mozilla';
    case 'https://www.mozilla.org/about/legal':
      return 'legal';
    case 'https://testpilot.firefox.com/about':
      return 'about';
    case 'https://testpilot.firefox.com/privacy':
      return 'privacy';
    case 'https://testpilot.firefox.com/terms':
      return 'terms';
    case 'https://www.mozilla.org/privacy/websites/#cookies':
      return 'cookies';
    case 'https://github.com/mozilla/send':
      return 'github';
    case 'https://twitter.com/FxTestPilot':
      return 'twitter';
    case 'https://www.mozilla.org/firefox/new/?scene=2':
      return 'download-firefox';
    default:
      return 'other';
  }
}

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

module.exports = {
  Raven,
  sendEvent,
  findMetric
};
