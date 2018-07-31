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

const UNITS = ['B', 'kB', 'MB', 'GB'];
function bytes(num) {
  if (num < 1) {
    return '0B';
  }
  const exponent = Math.min(Math.floor(Math.log10(num) / 3), UNITS.length - 1);
  const n = Number(num / Math.pow(1000, exponent));
  let nStr = n.toFixed(1);
  if (LOCALIZE_NUMBERS) {
    try {
      const locale = document.querySelector('html').lang;
      nStr = n.toLocaleString(locale, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      });
    } catch (e) {
      // fall through
    }
  }
  return `${nStr}${UNITS[exponent]}`;
}

function percent(ratio) {
  if (LOCALIZE_NUMBERS) {
    try {
      const locale = document.querySelector('html').lang;
      return ratio.toLocaleString(locale, { style: 'percent' });
    } catch (e) {
      // fall through
    }
  }
  return `${Math.floor(ratio * 100)}%`;
}

function number(n) {
  if (LOCALIZE_NUMBERS) {
    const locale = document.querySelector('html').lang;
    return n.toLocaleString(locale);
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

module.exports = {
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
  openLinksInNewTab
};
