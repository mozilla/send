const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const mqpacker = require('css-mqpacker');

const config = require('./server/config');

const options = {
  plugins: [autoprefixer, mqpacker, cssnano]
};

if (config.env === 'development') {
  options.map = { inline: true };
}

module.exports = options;
