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
          })
          .catch(err => {
            return Promise.reject();
          });
      })
      .catch(err => {
        return Promise.reject();
      });
  } catch (err) {
    return Promise.reject();
  }
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
    case 'https://www.mozilla.org/en-US/privacy/websites/#cookies':
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

function isFile(id) {
  return ![
    'referrer',
    'totalDownloads',
    'totalUploads',
    'testpilot_ga__cid'
  ].includes(id);
}

function sendEvent() {
  return window.analytics.sendEvent
    .apply(window.analytics, arguments)
    .catch(() => 0);
}

const ONE_DAY_IN_MS = 86400000;

module.exports = {
  arrayToHex,
  hexToArray,
  notify,
  gcmCompliant,
  findMetric,
  isFile,
  sendEvent,
  ONE_DAY_IN_MS
};
