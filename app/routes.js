const choo = require('choo');
const html = require('choo/html');
const nanotiming = require('nanotiming');
const download = require('./ui/download');
const footer = require('./ui/footer');
const fxPromo = require('./ui/fxPromo');
const header = require('./ui/header');

nanotiming.disabled = true;

function banner(state, emit) {
  if (state.promo && !state.route.startsWith('/unsupported/')) {
    return fxPromo(state, emit);
  }
}

function body(main) {
  return function(state, emit) {
    const b = html`<body class="flex flex-col justify-between items-center font-sans md:h-screen md:bg-grey-lightest bg-blue-lightest">
    ${banner(state, emit)}
    ${header(state, emit)}
    ${main(state, emit)}
    ${footer(state)}
    </body>`;
    if (state.layout) {
      // server side only
      return state.layout(state, b);
    }
    return b;
  };
}

module.exports = function() {
  const app = choo();
  app.route('/', body(require('./ui/welcome')));
  app.route('/download/:id', body(download));
  app.route('/download/:id/:key', body(download));
  app.route('/unsupported/:reason', body(require('./ui/unsupported')));
  app.route('/legal', body(require('./ui/legal')));
  app.route('/error', body(require('./ui/error')));
  app.route('/blank', body(require('./ui/blank')));
  app.route('/oauth', async function(state, emit) {
    try {
      await state.user.finishLogin(state.query.code, state.query.state);
      emit('replaceState', '/');
    } catch (e) {
      emit('replaceState', '/error');
      setTimeout(() => emit('render'));
    }
  });
  app.route('*', body(require('./ui/notFound')));
  return app;
};
