const choo = require('choo');
const html = require('choo/html');
const download = require('./download');
const header = require('../templates/header');
const footer = require('../templates/footer');
const fxPromo = require('../templates/fxPromo');

const app = choo();

function banner(state, emit) {
  if (state.promo && !state.route.startsWith('/unsupported/')) {
    return fxPromo(state, emit);
  }
}

function body(template) {
  return function(state, emit) {
    const b = html`<body>
      ${banner(state, emit)}
      ${header(state)}
      <div class="all">
        <noscript>
          <h2>${state.translate('javascriptRequired')}</h2>
          <p>
            <a href="https://github.com/mozilla/send/blob/master/docs/faq.md#why-does-firefox-send-require-javascript">
            ${state.translate('whyJavascript')}
            </a>
          </p>
          <p>${state.translate('enableJavascript')}</p>
        </noscript>
        ${template(state, emit)}
      </div>
      ${footer(state)}
    </body>`;
    if (state.layout) {
      // server side only
      return state.layout(state, b);
    }
    return b;
  };
}

app.route('/', body(require('./home')));
app.route('/share/:id', body(require('../pages/share')));
app.route('/download/:id', body(download));
app.route('/download/:id/:key', body(download));
app.route('/completed', body(require('../pages/completed')));
app.route('/unsupported/:reason', body(require('../pages/unsupported')));
app.route('/legal', body(require('../pages/legal')));
app.route('/error', body(require('../pages/error')));
app.route('/blank', body(require('../pages/blank')));
app.route('*', body(require('../pages/notFound')));

module.exports = app;
