import storage from './storage';
import { platform } from './utils';
import { sendMetrics } from './api';

let appState = null;
// let experiment = null;
const HOUR = 1000 * 60 * 60;
const events = [];
let session_id = Date.now();
const lang = document.querySelector('html').lang;

export default function initialize(state, emitter) {
  appState = state;
  if (!appState.user.firstAction) {
    appState.user.firstAction = appState.route === '/' ? 'upload' : 'download';
  }
  emitter.on('DOMContentLoaded', () => {
    // experiment = storage.enrolled[0];
    const query = appState.query;
    addEvent('client_visit', {
      entrypoint: appState.route === '/' ? 'upload' : 'download',
      referrer: document.referrer,
      utm_campaign: query.utm_campaign,
      utm_content: query.utm_content,
      utm_medium: query.utm_medium,
      utm_source: query.utm_source,
      utm_term: query.utm_term
    });
  });
  emitter.on('experiment', experimentEvent);
  window.addEventListener('unload', submitEvents);
}

function sizeOrder(n) {
  return Math.floor(Math.log10(n));
}

function submitEvents() {
  if (navigator.doNotTrack === '1') {
    return;
  }
  sendMetrics(
    new Blob(
      [
        JSON.stringify({
          now: Date.now(),
          session_id,
          lang,
          platform: platform(),
          events
        })
      ],
      { type: 'text/plain' } // see http://crbug.com/490015
    )
  );
  events.splice(0);
}

async function addEvent(event_type, event_properties) {
  const user_id = await appState.user.metricId();
  const device_id = await appState.user.deviceId();
  events.push({
    device_id,
    event_properties,
    event_type,
    time: Date.now(),
    user_id,
    user_properties: {
      anonymous: !appState.user.loggedIn,
      first_action: appState.user.firstAction,
      active_count: storage.files.length
    }
  });
  if (events.length === 25) {
    submitEvents();
  }
}

function cancelledUpload(archive, duration) {
  return addEvent('client_upload', {
    download_limit: archive.dlimit,
    duration: sizeOrder(duration),
    file_count: archive.numFiles,
    password_protected: !!archive.password,
    size: sizeOrder(archive.size),
    status: 'cancel',
    time_limit: archive.timeLimit
  });
}

function completedUpload(archive, duration) {
  return addEvent('client_upload', {
    download_limit: archive.dlimit,
    duration: sizeOrder(duration),
    file_count: archive.numFiles,
    password_protected: !!archive.password,
    size: sizeOrder(archive.size),
    status: 'ok',
    time_limit: archive.timeLimit
  });
}

function stoppedUpload(archive) {
  return addEvent('client_upload', {
    download_limit: archive.dlimit,
    file_count: archive.numFiles,
    password_protected: !!archive.password,
    size: sizeOrder(archive.size),
    status: 'error',
    time_limit: archive.timeLimit
  });
}

function stoppedDownload(params) {
  return addEvent('client_download', {
    duration: sizeOrder(params.duration),
    password_protected: params.password_protected,
    size: sizeOrder(params.size),
    status: 'error'
  });
}

function completedDownload(params) {
  return addEvent('client_download', {
    duration: sizeOrder(params.duration),
    password_protected: params.password_protected,
    size: sizeOrder(params.size),
    status: 'ok'
  });
}

function deletedUpload(ownedFile) {
  return addEvent('client_delete', {
    age: Math.floor((Date.now() - ownedFile.createdAt) / HOUR),
    downloaded: ownedFile.dtotal > 0,
    status: 'ok'
  });
}

function experimentEvent(params) {
  return addEvent('client_experiment', params);
}

function submittedSignup(params) {
  return addEvent('client_login', {
    status: 'ok',
    trigger: params.trigger
  });
}

function canceledSignup(params) {
  return addEvent('client_login', {
    status: 'cancel',
    trigger: params.trigger
  });
}

function loggedOut(params) {
  addEvent('client_logout', {
    status: 'ok',
    trigger: params.trigger
  });
  // flush events and start new anon session
  submitEvents();
  session_id = Date.now();
}

export {
  cancelledUpload,
  stoppedUpload,
  completedUpload,
  deletedUpload,
  stoppedDownload,
  completedDownload,
  submittedSignup,
  canceledSignup,
  loggedOut
};
