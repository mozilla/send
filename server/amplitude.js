const crypto = require('crypto');
const geoip = require('fxa-geodb')();
const fetch = require('node-fetch');
const config = require('./config');
const pkg = require('../package.json');

const HOUR = 1000 * 60 * 60;

function truncateToHour(timestamp) {
  return Math.floor(timestamp / HOUR) * HOUR;
}

function orderOfMagnitude(n) {
  return Math.floor(Math.log10(n));
}

function userId(fileId, ownerId) {
  const hash = crypto.createHash('sha256');
  hash.update(fileId);
  hash.update(ownerId);
  return hash.digest('hex').substring(32);
}

function location(ip) {
  try {
    return geoip(ip);
  } catch (e) {
    return {};
  }
}

function statUploadEvent(data) {
  const loc = location(data.ip);
  const event = {
    session_id: -1,
    country: loc.country,
    region: loc.state,
    user_id: userId(data.id, data.owner),
    app_version: pkg.version,
    time: truncateToHour(Date.now()),
    event_type: 'server_upload',
    user_properties: {
      download_limit: data.dlimit,
      time_limit: data.timeLimit,
      size: orderOfMagnitude(data.size),
      anonymous: data.anonymous
    },
    event_properties: {
      agent: data.agent
    },
    event_id: 0
  };
  return sendBatch([event]);
}

function statDownloadEvent(data) {
  const loc = location(data.ip);
  const event = {
    session_id: -1,
    country: loc.country,
    region: loc.state,
    user_id: userId(data.id, data.owner),
    app_version: pkg.version,
    time: truncateToHour(Date.now()),
    event_type: 'server_download',
    event_properties: {
      agent: data.agent,
      download_count: data.download_count,
      ttl: data.ttl
    },
    event_id: data.download_count
  };
  return sendBatch([event]);
}

function statDeleteEvent(data) {
  const loc = location(data.ip);
  const event = {
    session_id: -1,
    country: loc.country,
    region: loc.state,
    user_id: userId(data.id, data.owner),
    app_version: pkg.version,
    time: truncateToHour(Date.now()),
    event_type: 'server_delete',
    event_properties: {
      agent: data.agent,
      download_count: data.download_count,
      ttl: data.ttl
    },
    event_id: data.download_count + 1
  };
  return sendBatch([event]);
}

function clientEvent(event, ua, language, session_id, deltaT, platform, ip) {
  const loc = location(ip);
  const ep = event.event_properties || {};
  const up = event.user_properties || {};
  const event_properties = {
    browser: ua.browser.name,
    browser_version: ua.browser.version,
    status: ep.status,

    age: ep.age,
    downloaded: ep.downloaded,
    download_limit: ep.download_limit,
    duration: ep.duration,
    entrypoint: ep.entrypoint,
    file_count: ep.file_count,
    password_protected: ep.password_protected,
    referrer: ep.referrer,
    size: ep.size,
    time_limit: ep.time_limit,
    trigger: ep.trigger,
    ttl: ep.ttl,
    utm_campaign: ep.utm_campaign,
    utm_content: ep.utm_content,
    utm_medium: ep.utm_medium,
    utm_source: ep.utm_source,
    utm_term: ep.utm_term,
    experiment: ep.experiment,
    variant: ep.variant
  };
  const user_properties = {
    active_count: up.active_count,
    anonymous: up.anonymous,
    experiments: up.experiments,
    first_action: up.first_action
  };
  return {
    app_version: pkg.version,
    country: loc.country,
    device_id: event.device_id,
    event_properties,
    event_type: event.event_type,
    language,
    os_name: ua.os.name,
    os_version: ua.os.version,
    platform,
    region: loc.state,
    session_id,
    time: event.time + deltaT,
    user_id: event.user_id,
    user_properties
  };
}

async function sendBatch(events, timeout = 1000) {
  if (!config.amplitude_id) {
    return 200;
  }
  try {
    const result = await fetch('https://api.amplitude.com/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: config.amplitude_id,
        events
      }),
      timeout
    });
    return result.status;
  } catch (e) {
    return 500;
  }
}

module.exports = {
  statUploadEvent,
  statDownloadEvent,
  statDeleteEvent,
  clientEvent,
  sendBatch
};
