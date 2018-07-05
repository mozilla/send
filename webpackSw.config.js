const path = require('path');
const webpack = require('webpack');

const regularJSOptions = {
  babelrc: false,
  presets: [['env', { modules: false  }], 'stage-2'],
  // yo-yoify converts html template strings to direct dom api calls
  plugins: [
    "transform-runtime", {
      //"polyfill": false,
      //"regenerator": true
    }
  ]
};

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
  module: {
    rules: [
      {
        loader: 'babel-loader',
        // exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'app'),
          path.resolve(__dirname, 'node_modules/buffer')
        ],
        options: regularJSOptions
      }
    ]
  }
};