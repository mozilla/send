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