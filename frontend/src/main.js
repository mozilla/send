window.Raven = require('raven-js');
window.Raven.config(window.dsn).install();
window.dsn = undefined;
require('./upload');
require('./download');
