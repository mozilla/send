/* global window, document, fetch */

window.MAXFILESIZE = 1024 * 1024 * 1024 * 2;

const EventEmitter = require('events');
const emitter = new EventEmitter();

function dom(tagName, attributes, children = []) {
  const node = document.createElement(tagName);
  for (const name in attributes) {
    if (name.indexOf('on') === 0) {
      node[name] = attributes[name];
    } else if (name === 'htmlFor') {
      node.htmlFor = attributes.htmlFor;
    } else if (name === 'className') {
      node.className = attributes.className;
    } else {
      node.setAttribute(name, attributes[name]);
    }
  }
  if (!(children instanceof Array)) {
    children = [children];
  }
  for (let child of children) {
    if (typeof child === 'string') {
      child = document.createTextNode(child);
    }
    node.appendChild(child);
  }
  return node;
}

function uploadComplete(file) {
  document.body.innerHTML = '';
  const input = dom('input', { id: 'url', value: file.url, readonly: 'true' });
  const copyText = dom('span', {}, 'Copy link');
  const copyImage = dom('img', { id: 'copy-image', src: 'copy-link.png' });
  const node = dom(
    'div',
    { id: 'white' },
    dom('div', { className: 'card' }, [
      dom('div', {}, 'The card contents will be here.'),
      dom('div', {}, [
        'Expires after: ',
        dom('span', { className: 'expiresAfter' }, 'exp')
      ]),
      input,
      dom(
        'div',
        {
          id: 'copy-link',
          onclick: e => {
            e.preventDefault();
            input.select();
            document.execCommand('copy');
            input.selectionEnd = input.selectionStart;
            copyText.textContent = 'Copied!';
            setTimeout(function() {
              copyText.textContent = 'Copy link';
            }, 2000);
          }
        },
        [copyImage, copyText]
      ),
      dom('img', {
        id: 'send-another',
        src: 'cloud-upload.png',
        onclick: () => {
          render();
          document.getElementById('label').click();
        }
      })
    ])
  );
  document.body.appendChild(node);
}

const state = {
  translate: (...toTranslate) => {
    return toTranslate.map(o => JSON.stringify(o)).toString();
  },
  raven: {
    captureException: e => {
      console.error('ERROR ' + e + ' ' + e.stack);
    }
  },
  storage: {
    files: [],
    remove: function(fileId) {
      console.log('REMOVE FILEID', fileId);
    },
    writeFile: function(file) {
      console.log('WRITEFILE', file);
    },
    addFile: uploadComplete,
    totalUploads: 0
  },
  transfer: null,
  uploading: false,
  settingPassword: false,
  passwordSetError: null,
  route: '/'
};

function upload(event) {
  event.preventDefault();
  const target = event.target;
  const file = target.files[0];
  if (file.size === 0) {
    return;
  }

  emitter.emit('addFiles', { files: [file] });
  emitter.emit('upload', {});
}

function render() {
  document.body.innerHTML = '';
  const node = dom(
    'div',
    { id: 'white' },
    dom('div', { id: 'centering' }, [
      dom('img', { src: 'encrypted-envelope.png' }),
      dom('h4', {}, 'Private, Encrypted File Sharing'),
      dom(
        'div',
        {},
        'Send files through a safe, private, and encrypted link that automatically expires to ensure your stuff does not remain online forever.'
      ),
      dom('div', { id: 'spacer' }),
      dom(
        'label',
        { id: 'label', htmlFor: 'input' },
        dom('img', { src: 'cloud-upload.png' }, [])
      ),
      dom('input', {
        id: 'input',
        type: 'file',
        name: 'input',
        onchange: upload
      })
    ])
  );
  document.body.appendChild(node);
}

emitter.on('render', function() {
  if (!state.transfer || !state.transfer.progress) {
    return;
  }
  document.body.innerHTML = '';
  const percent = Math.floor(state.transfer.progressRatio * 100);
  const node = dom(
    'div',
    { id: 'white', style: 'width: 90%' },
    dom('div', { className: 'card' }, [
      dom('div', {}, `${percent}%`),
      dom(
        'span',
        {
          style: `display: inline-block; height: 4px; border-radius: 2px; width: ${percent}%; background-color: #1b96ef; color: white`
        },
        '.'
      ),
      dom(
        'div',
        {
          style: 'text-align: right',
          onclick: e => {
            e.preventDefault();
            if (state.uploading) {
              emitter.emit('cancel');
              render();
            }
          }
        },
        'CANCEL'
      )
    ])
  );
  document.body.appendChild(node);
});

emitter.on('pushState', function(path) {
  console.log('pushState ' + path + ' ' + JSON.stringify(state));
});

const fileManager = require('../app/fileManager').default;
try {
  fileManager(state, emitter);
} catch (e) {
  console.error('error' + e);
  console.error(e);
}

window.addEventListener(
  'message',
  event => {
    fetch(event.data)
      .then(res => res.blob())
      .then(blob => {
        emitter.emit('addFiles', { files: [blob] });
        emitter.emit('upload', {});
      })
      .catch(e => console.error('ERROR ' + e + ' ' + e.stack));
  },
  false
);

render();
