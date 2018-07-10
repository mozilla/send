const path = require('path');

/*
const regularJSOptions = {
  babelrc: false,
  presets: [['env'], 'stage-2'],
  plugins: ['transform-runtime']
};
*/

const entry = {
  serviceWorker: ['./app/serviceWorker.js']
};

module.exports = {
  entry,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  /*
  module: {
    rules: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: regularJSOptions
      }
    ]
  }
  */
};
