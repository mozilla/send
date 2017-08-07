const testPilotGA = require('testpilot-ga/src/TestPilotGA');
const Storage = require('./storage');
const storage = new Storage(localStorage);

const analytics = new testPilotGA({
  an: 'Firefox Send',
  ds: 'web',
  tid: window.GOOGLE_ANALYTICS_ID
});

const category = location.pathname.includes('/download')
  ? 'recipient'
  : 'sender';

document.addEventListener('DOMContentLoaded', function() {
  addExitHandlers();
  addRestartHandlers();
});

function sendEvent() {
  return analytics.sendEvent.apply(analytics, arguments).catch(() => 0);
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
    default:
      return 'other';
  }
}

function setReferrer(state) {
  if (category === 'sender') {
    if (state) {
      storage.referrer = `${state}-upload`;
    }
  } else if (category === 'recipient') {
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
  return sendEvent(category, 'upload-started', {
    cm1: params.size,
    cm5: storage.totalUploads,
    cm6: storage.numFiles + 1,
    cm7: storage.totalDownloads,
    cd1: params.type,
    cd5: takeReferrer()
  });
}

function cancelledUpload(params) {
  setReferrer('cancelled');
  return sendEvent(category, 'upload-stopped', {
    cm1: params.size,
    cm5: storage.totalUploads,
    cm6: storage.numFiles,
    cm7: storage.totalDownloads,
    cd1: params.type,
    cd2: 'cancelled'
  });
}

function completedUpload(params) {
  return sendEvent(category, 'upload-stopped', {
    cm1: params.size,
    cm2: params.time,
    cm3: params.speed,
    cm5: storage.totalUploads,
    cm6: storage.numFiles,
    cm7: storage.totalDownloads,
    cd1: params.type,
    cd2: 'completed'
  });
}

function startedDownload(params) {
  return sendEvent(category, 'download-started', {
    cm1: params.size,
    cm4: params.ttl,
    cm5: storage.totalUploads,
    cm6: storage.numFiles,
    cm7: storage.totalDownloads
  });
}

function stoppedDownload(params) {
  return sendEvent(category, 'download-stopped', {
    cm1: params.size,
    cm5: storage.totalUploads,
    cm6: storage.numFiles,
    cm7: storage.totalDownloads,
    cd2: 'errored',
    cd6: params.err
  });
}

function cancelledDownload(params) {
  setReferrer('cancelled');
  return sendEvent(category, 'download-stopped', {
    cm1: params.size,
    cm5: storage.totalUploads,
    cm6: storage.numFiles,
    cm7: storage.totalDownloads,
    cd2: 'cancelled'
  });
}

function stoppedUpload(params) {
  return sendEvent(category, 'upload-stopped', {
    cm1: params.size,
    cm5: storage.totalUploads,
    cm6: storage.numFiles,
    cm7: storage.totalDownloads,
    cd1: params.type,
    cd2: 'errored',
    cd6: params.err
  });
}

function completedDownload(params) {
  return sendEvent(category, 'download-stopped', {
    cm1: params.size,
    cm2: params.time,
    cm3: params.speed,
    cm5: storage.totalUploads,
    cm6: storage.numFiles,
    cm7: storage.totalDownloads,
    cd2: 'completed'
  });
}

function deletedUpload(params) {
  return sendEvent(category, 'upload-deleted', {
    cm1: params.size,
    cm2: params.time,
    cm3: params.speed,
    cm4: params.ttl,
    cm5: storage.totalUploads,
    cm6: storage.numFiles,
    cm7: storage.totalDownloads,
    cd1: params.type,
    cd4: params.location
  });
}

function unsupported(params) {
  return sendEvent(category, 'unsupported', {
    cd6: params.err
  });
}

function copiedLink(params) {
  return sendEvent(category, 'copied', {
    cd4: params.location
  });
}

function exitEvent(target) {
  return sendEvent(category, 'exited', {
    cd3: urlToMetric(target.currentTarget.href)
  });
}

function addExitHandlers() {
  const links = Array.from(document.querySelectorAll('a'));
  links.forEach(l => {
    if (/^http/.test(l.href)) {
      l.addEventListener('click', exitEvent);
    }
  });
}

function restartEvent(state) {
  setReferrer(state);
  return sendEvent(category, 'restarted', {
    cd2: state
  });
}

function addRestartHandlers() {
  const elements = Array.from(document.querySelectorAll('.send-new'));
  elements.forEach(el => {
    const state = el.getAttribute('data-state');
    el.addEventListener('click', restartEvent.bind(null, state));
  });
}

module.exports = {
  copiedLink,
  startedUpload,
  cancelledUpload,
  stoppedUpload,
  completedUpload,
  deletedUpload,
  startedDownload,
  cancelledDownload,
  stoppedDownload,
  completedDownload,
  unsupported
};
