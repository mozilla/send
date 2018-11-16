const choo = require('choo');
const download = require('./ui/download');
const body = require('./ui/body');

module.exports = function(app = choo()) {
  app.route('/', body(require('./ui/home')));
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
