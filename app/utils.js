/* global Android */
let html;
try {
  html = require('choo/html');
} catch (e) {
  // running in the service worker
}
const b64 = require('base64-js');

function arrayToB64(array) {
  return b64
    .fromByteArray(array)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function b64ToArray(str) {
  return b64.toByteArray(str + '==='.slice((str.length + 3) % 4));
}

function locale() {
  return document.querySelector('html').lang;
}

function loadShim(polyfill) {
  return new Promise((resolve, reject) => {
    const shim = document.createElement('script');
    shim.src = polyfill;
    shim.addEventListener('load', () => resolve(true));
    shim.addEventListener('error', () => resolve(false));
    document.head.appendChild(shim);
  });
}

function isFile(id) {
  return /^[0-9a-fA-F]{10,16}$/.test(id);
}

function copyToClipboard(str) {
  const aux = document.createElement('input');
  aux.setAttribute('value', str);
  aux.contentEditable = true;
  aux.readOnly = true;
  document.body.appendChild(aux);
  if (navigator.userAgent.match(/iphone|ipad|ipod/i)) {
    const range = document.createRange();
    range.selectNodeContents(aux);
    const sel = getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    aux.setSelectionRange(0, str.length);
  } else {
    aux.select();
  }
  const result = document.execCommand('copy');
  document.body.removeChild(aux);
  return result;
}

const LOCALIZE_NUMBERS = !!(
  typeof Intl === 'object' &&
  Intl &&
  typeof Intl.NumberFormat === 'function' &&
  typeof navigator === 'object'
);

const UNITS = ['bytes', 'kb', 'mb', 'gb'];
function bytes(num) {
  if (num < 1) {
    return '0B';
  }
  const exponent = Math.min(Math.floor(Math.log10(num) / 3), UNITS.length - 1);
  const n = Number(num / Math.pow(1024, exponent));
  const decimalDigits = Math.floor(n) === n ? 0 : 1;
  let nStr = n.toFixed(decimalDigits);
  if (LOCALIZE_NUMBERS) {
    try {
      nStr = n.toLocaleString(locale(), {
        minimumFractionDigits: decimalDigits,
        maximumFractionDigits: decimalDigits
      });
    } catch (e) {
      // fall through
    }
  }
  return translate('fileSize', {
    num: nStr,
    units: translate(UNITS[exponent])
  });
}

function percent(ratio) {
  if (LOCALIZE_NUMBERS) {
    try {
      return ratio.toLocaleString(locale(), { style: 'percent' });
    } catch (e) {
      // fall through
    }
  }
  return `${Math.floor(ratio * 100)}%`;
}

function number(n) {
  if (LOCALIZE_NUMBERS) {
    return n.toLocaleString(locale());
  }
  return n.toString();
}

function allowedCopy() {
  const support = !!document.queryCommandSupported;
  return support ? document.queryCommandSupported('copy') : false;
}

function delay(delay = 100) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

function fadeOut(selector) {
  const classes = document.querySelector(selector).classList;
  classes.remove('effect--fadeIn');
  classes.add('effect--fadeOut');
  return delay(300);
}

function openLinksInNewTab(links, should = true) {
  links = links || Array.from(document.querySelectorAll('a:not([target])'));
  if (should) {
    links.forEach(l => {
      l.setAttribute('target', '_blank');
      l.setAttribute('rel', 'noopener noreferrer');
    });
  } else {
    links.forEach(l => {
      l.removeAttribute('target');
      l.removeAttribute('rel');
    });
  }
  return links;
}

function browserName() {
  try {
    if (/firefox/i.test(navigator.userAgent)) {
      return 'firefox';
    }
    if (/edge/i.test(navigator.userAgent)) {
      return 'edge';
    }
    if (/trident/i.test(navigator.userAgent)) {
      return 'ie';
    }
    if (/chrome/i.test(navigator.userAgent)) {
      return 'chrome';
    }
    if (/safari/i.test(navigator.userAgent)) {
      return 'safari';
    }
    if (/send android/i.test(navigator.userAgent)) {
      return 'android-app';
    }
    return 'other';
  } catch (e) {
    return 'unknown';
  }
}

async function streamToArrayBuffer(stream, size) {
  const reader = stream.getReader();
  let state = await reader.read();

  if (size) {
    const result = new Uint8Array(size);
    let offset = 0;
    while (!state.done) {
      result.set(state.value, offset);
      offset += state.value.length;
      state = await reader.read();
    }
    return result.buffer;
  }

  const parts = [];
  let len = 0;
  while (!state.done) {
    parts.push(state.value);
    len += state.value.length;
    state = await reader.read();
  }
  let offset = 0;
  const result = new Uint8Array(len);
  for (const part of parts) {
    result.set(part, offset);
    offset += part.length;
  }
  return result.buffer;
}

function list(items, ulStyle = '', liStyle = '') {
  const lis = items.map(
    i =>
      html`
        <li class="${liStyle}">${i}</li>
      `
  );
  return html`
    <ul class="${ulStyle}">
      ${lis}
    </ul>
  `;
}

function secondsToL10nId(seconds) {
  if (seconds < 3600) {
    return { id: 'timespanMinutes', num: Math.floor(seconds / 60) };
  } else if (seconds < 86400) {
    return { id: 'timespanHours', num: Math.floor(seconds / 3600) };
  } else {
    return { id: 'timespanDays', num: Math.floor(seconds / 86400) };
  }
}

function timeLeft(milliseconds) {
  if (milliseconds < 1) {
    return { id: 'linkExpiredAlt' };
  }
  const minutes = Math.floor(milliseconds / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days >= 1) {
    return {
      id: 'expiresDaysHoursMinutes',
      days,
      hours: hours % 24,
      minutes: minutes % 60
    };
  }
  if (hours >= 1) {
    return {
      id: 'expiresHoursMinutes',
      hours,
      minutes: minutes % 60
    };
  } else if (hours === 0) {
    if (minutes === 0) {
      return { id: 'expiresMinutes', minutes: '< 1' };
    }
    return { id: 'expiresMinutes', minutes };
  }
  return null;
}

function platform() {
  if (typeof Android === 'object') {
    return 'android';
  }
  return 'web';
}

const ECE_RECORD_SIZE = 1024 * 64;
const TAG_LENGTH = 16;
function encryptedSize(size, rs = ECE_RECORD_SIZE, tagLength = TAG_LENGTH) {
  const chunk_meta = tagLength + 1; // Chunk metadata, tag and delimiter
  return 21 + size + chunk_meta * Math.ceil(size / (rs - chunk_meta));
}

let translate = function() {
  throw new Error('uninitialized translate function. call setTranslate first');
};
function setTranslate(t) {
  translate = t;
}

function concat(b1, b2) {
  const result = new Uint8Array(b1.length + b2.length);
  result.set(b1, 0);
  result.set(b2, b1.length);
  return result;
}

module.exports = {
  concat,
  locale,
  fadeOut,
  delay,
  allowedCopy,
  bytes,
  percent,
  number,
  copyToClipboard,
  arrayToB64,
  b64ToArray,
  loadShim,
  isFile,
  openLinksInNewTab,
  browserName,
  streamToArrayBuffer,
  list,
  secondsToL10nId,
  timeLeft,
  platform,
  encryptedSize,
  setTranslate
};
