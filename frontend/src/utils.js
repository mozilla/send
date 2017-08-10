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

function gcmCompliant() {
  try {
    return window.crypto.subtle
      .generateKey(
        {
          name: 'AES-GCM',
          length: 128
        },
        true,
        ['encrypt', 'decrypt']
      )
      .then(key => {
        return window.crypto.subtle
          .encrypt(
            {
              name: 'AES-GCM',
              iv: window.crypto.getRandomValues(new Uint8Array(12)),
              additionalData: window.crypto.getRandomValues(new Uint8Array(6)),
              tagLength: 128
            },
            key,
            new ArrayBuffer(8)
          )
          .then(() => {
            return Promise.resolve();
          });
      })
      .catch(err => {
        return loadShim();
      });
  } catch (err) {
    return loadShim();
  }
  function loadShim() {
    return new Promise((resolve, reject) => {
      const shim = document.createElement('script');
      shim.src = '/cryptofill.js';
      shim.addEventListener('load', resolve);
      shim.addEventListener('error', reject);
      document.head.appendChild(shim);
    });
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
  typeof Intl.NumberFormat === 'function'
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

const ONE_DAY_IN_MS = 86400000;

export {
  bytes,
  percent,
  copyToClipboard,
  arrayToHex,
  hexToArray,
  notify,
  gcmCompliant,
  isFile,
  ONE_DAY_IN_MS
};
