/* global window */

window.MAXFILESIZE = 1024 * 1024 * 1024 * 2;

const choo = require('choo');
const app = choo();

app.use(require('./stores/state').default);
app.use(require('../app/fileManager').default);
app.use(require('./stores/intents').default);
app.route('/', require('./pages/home').default);
app.route('/upload', require('./pages/upload').default);
app.route('/share/:id', require('./pages/share').default);
app.mount('body');
