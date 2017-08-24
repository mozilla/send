function arrayToHex(iv) {
  let hexStr = '';
  // eslint-disable-next-line prefer-const
  for (let i in iv) {
    if (iv[i] < 16) {
      hexStr += '0' + iv[i].toString(16);
    } else {
      hexStr += iv[i].toString(16);
    }
  }
  return hexStr;
}

function hexToArray(str) {
  const iv = new Uint8Array(str.length / 2);
  for (let i = 0; i < str.length; i += 2) {
    iv[i / 2] = parseInt(str.charAt(i) + str.charAt(i + 1), 16);
  }

  return iv;
}

function notify(str) {
  return str;
  /* TODO: enable once we have an opt-in ui element
  if (!('Notification' in window)) {
    return;
  } else if (Notification.permission === 'granted') {
    new Notification(str);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function(permission) {
      if (permission === 'granted') new Notification(str);
    });
  }
  */
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

async function canHasSend(polyfill) {
  try {
    const key = await window.crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 128
      },
      true,
      ['encrypt', 'decrypt']
    );

    await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: window.crypto.getRandomValues(new Uint8Array(12)),
        tagLength: 128
      },
      key,
      new ArrayBuffer(8)
    );
    return true;
  } catch (err) {
    return loadShim(polyfill);
  }
}

function isFile(id) {
  return /^[0-9a-fA-F]{10}$/.test(id);
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
    const sel = window.getSelection();
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

const UNITS = ['B', 'kB', 'MB', 'GB'];
function bytes(num) {
  const exponent = Math.min(Math.floor(Math.log10(num) / 3), UNITS.length - 1);
  const n = Number(num / Math.pow(1000, exponent));
  const nStr = LOCALIZE_NUMBERS
    ? n.toLocaleString(navigator.languages, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      })
    : n.toFixed(1);
  return `${nStr}${UNITS[exponent]}`;
}

function percent(ratio) {
  return LOCALIZE_NUMBERS
    ? ratio.toLocaleString(navigator.languages, { style: 'percent' })
    : `${Math.floor(ratio * 100)}%`;
}

function allowedCopy() {
  const support = !!document.queryCommandSupported;
  return support ? document.queryCommandSupported('copy') : false;
}

function delay(delay = 100) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

function fadeOut(id) {
  const classes = document.getElementById(id).classList;
  classes.remove('fadeIn');
  classes.add('fadeOut');
  return delay(300);
}

const ONE_DAY_IN_MS = 86400000;

module.exports = {
  fadeOut,
  delay,
  allowedCopy,
  bytes,
  percent,
  copyToClipboard,
  arrayToHex,
  hexToArray,
  notify,
  canHasSend,
  isFile,
  ONE_DAY_IN_MS
};
