const choo = require('choo');
const download = require('./download');

const app = choo();

app.route('/', require('./home'));
app.route('/share/:id', require('../templates/share'));
app.route('/download/:id', download);
app.route('/download/:id/:key', download);
app.route('/completed', require('../templates/completed'));
app.route('/unsupported/:reason', require('../templates/unsupported'));
app.route('/legal', require('../templates/legal'));
app.route('/error', require('../templates/error'));
app.route('/blank', require('../templates/blank'));
app.route('*', require('../templates/notFound'));

module.exports = app;
