import testPilotGA from 'testpilot-ga/src/TestPilotGA';
import storage from './storage';

let hasLocalStorage = false;
try {
  hasLocalStorage = typeof localStorage !== 'undefined';
} catch (e) {
  // when disabled, any mention of localStorage throws an error
}

const analytics = new testPilotGA({
  an: 'Firefox Send',
  ds: 'web',
  tid: window.GOOGLE_ANALYTICS_ID
});

let appState = null;
let experiment = null;

export default function initialize(state, emitter) {
  appState = state;
  emitter.on('DOMContentLoaded', () => {
    addExitHandlers();
    experiment = storage.enrolled[0];
    sendEvent(category(), 'visit', {
      cm5: storage.totalUploads,
      cm6: storage.files.length,
      cm7: storage.totalDownloads
    });
  });
  emitter.on('exit', exitEvent);
  emitter.on('experiment', experimentEvent);
}

function category() {
  switch (appState.route) {
    case '/':
    case '/share/:id':
      return 'sender';
    case '/download/:id/:key':
    case '/download/:id':
    case '/completed':
      return 'recipient';
    default:
      return 'other';
  }
}

function sendEvent() {
  const args = Array.from(arguments);
  if (experiment && args[2]) {
    args[2].xid = experiment[0];
    args[2].xvar = experiment[1];
  }
  return (
    hasLocalStorage && analytics.sendEvent.apply(analytics, args).catch(() => 0)
  );
}

function urlToMetric(url) {
  switch (url) {
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
    case 'https://qsurvey.mozilla.com/s3/txp-firefox-send':
      return 'survey';
    case 'https://testpilot.firefox.com/':
    case 'https://testpilot.firefox.com/experiments/send':
      return 'testpilot';
    case 'https://www.mozilla.org/firefox/new/?utm_campaign=send-acquisition&utm_medium=referral&utm_source=send.firefox.com':
      return 'promo';
    default:
      return 'other';
  }
}

function setReferrer(state) {
  if (category() === 'sender') {
    if (state) {
      storage.referrer = `${state}-upload`;
    }
  } else if (category() === 'recipient') {
    if (state) {
      storage.referrer = `${state}-download`;
    }
  }
}

function externalReferrer() {
  if (/^https:\/\/testpilot\.firefox\.com/.test(document.referrer)) {
    return 'testpilot';
  }
  return 'external';
}

function takeReferrer() {
  const referrer = storage.referrer || externalReferrer();
  storage.referrer = null;
  return referrer;
}

function startedUpload(params) {
  return sendEvent('sender', 'upload-started', {
    cm1: params.size,
    cm5: storage.totalUploads,
    cm6: storage.files.length + 1,
    cm7: storage.totalDownloads,
    cd1: params.type,
    cd5: takeReferrer()
  });
}

function cancelledUpload(params) {
  setReferrer('cancelled');
  return sendEvent('sender', 'upload-stopped', {
    cm1: params.size,
    cm5: storage.totalUploads,
    cm6: storage.files.length,
    cm7: storage.totalDownloads,
    cd1: params.type,
    cd2: 'cancelled'
  });
}

function completedUpload(params) {
  return sendEvent('sender', 'upload-stopped', {
    cm1: params.size,
    cm2: params.time,
    cm3: params.speed,
    cm5: storage.totalUploads,
    cm6: storage.files.length,
    cm7: storage.totalDownloads,
    cd1: params.type,
    cd2: 'completed'
  });
}

function addedPassword(params) {
  return sendEvent('sender', 'password-added', {
    cm1: params.size,
    cm5: storage.totalUploads,
    cm6: storage.files.length,
    cm7: storage.totalDownloads
  });
}

function startedDownload(params) {
  return sendEvent('recipient', 'download-started', {
    cm1: params.size,
    cm4: params.ttl,
    cm5: storage.totalUploads,
    cm6: storage.files.length,
    cm7: storage.totalDownloads
  });
}

function stoppedDownload(params) {
  return sendEvent('recipient', 'download-stopped', {
    cm1: params.size,
    cm5: storage.totalUploads,
    cm6: storage.files.length,
    cm7: storage.totalDownloads,
    cd2: 'errored',
    cd6: params.err
  });
}

function cancelledDownload(params) {
  setReferrer('cancelled');
  return sendEvent('recipient', 'download-stopped', {
    cm1: params.size,
    cm5: storage.totalUploads,
    cm6: storage.files.length,
    cm7: storage.totalDownloads,
    cd2: 'cancelled'
  });
}

function stoppedUpload(params) {
  return sendEvent('sender', 'upload-stopped', {
    cm1: params.size,
    cm5: storage.totalUploads,
    cm6: storage.files.length,
    cm7: storage.totalDownloads,
    cd1: params.type,
    cd2: 'errored',
    cd6: params.err
  });
}

function changedDownloadLimit(params) {
  return sendEvent('sender', 'download-limit-changed', {
    cm1: params.size,
    cm5: storage.totalUploads,
    cm6: storage.files.length,
    cm7: storage.totalDownloads,
    cm8: params.dlimit
  });
}

function completedDownload(params) {
  return sendEvent('recipient', 'download-stopped', {
    cm1: params.size,
    cm2: params.time,
    cm3: params.speed,
    cm5: storage.totalUploads,
    cm6: storage.files.length,
    cm7: storage.totalDownloads,
    cd2: 'completed'
  });
}

function deletedUpload(params) {
  return sendEvent(category(), 'upload-deleted', {
    cm1: params.size,
    cm2: params.time,
    cm3: params.speed,
    cm4: params.ttl,
    cm5: storage.totalUploads,
    cm6: storage.files.length,
    cm7: storage.totalDownloads,
    cd1: params.type,
    cd4: params.location
  });
}

function unsupported(params) {
  return sendEvent(category(), 'unsupported', {
    cd6: params.err
  });
}

function copiedLink(params) {
  return sendEvent('sender', 'copied', {
    cd4: params.location
  });
}

function exitEvent(target) {
  return sendEvent(category(), 'exited', {
    cd3: urlToMetric(target.currentTarget.href)
  });
}

function experimentEvent(params) {
  return sendEvent(category(), 'experiment', params);
}

// eslint-disable-next-line no-unused-vars
function addExitHandlers() {
  const links = Array.from(document.querySelectorAll('a'));
  links.forEach(l => {
    if (/^http/.test(l.getAttribute('href'))) {
      l.addEventListener('click', exitEvent);
    }
  });
}

function restart(state) {
  setReferrer(state);
  return sendEvent(category(), 'restarted', {
    cd2: state
  });
}

export {
  copiedLink,
  startedUpload,
  cancelledUpload,
  stoppedUpload,
  completedUpload,
  changedDownloadLimit,
  deletedUpload,
  startedDownload,
  cancelledDownload,
  stoppedDownload,
  completedDownload,
  addedPassword,
  restart,
  unsupported
};
