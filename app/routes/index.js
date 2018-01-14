const choo = require('choo');
const html = require('choo/html');
const download = require('./download');
const header = require('../templates/header');
const footer = require('../templates/footer');
const fxPromo = require('../templates/fxPromo');

const app = choo();

function showBanner(state) {
  return state.promo && !state.route.startsWith('/unsupported/');
}

function body(template) {
  return function(state, emit) {
    const b = html`<body>
      ${showBanner(state) ? fxPromo(state, emit) : ''}
      ${header(state)}
      <div class="all">
        <noscript>
          <h2>Firefox Send requires JavaScript</h2>
          <p><a href="https://github.com/mozilla/send/blob/master/docs/faq.md#why-does-firefox-send-require-javascript">Why does Firefox Send require JavaScript?</a></p>
          <p>Please enable JavaScript and try again.</p>
        </noscript>
        ${template(state, emit)}
      </div>
      ${footer(state)}
    </body>`;
    if (state.layout) {
      return state.layout(state, b);
    }
    return b;
  };
}

app.route('/', body(require('./home')));
app.route('/share/:id', body(require('../templates/share')));
app.route('/download/:id', body(download));
app.route('/download/:id/:key', body(download));
app.route('/completed', body(require('../templates/completed')));
app.route('/unsupported/:reason', body(require('../templates/unsupported')));
app.route('/legal', body(require('../templates/legal')));
app.route('/error', body(require('../templates/error')));
app.route('/blank', body(require('../templates/blank')));
app.route('*', body(require('../templates/notFound')));

module.exports = app;
