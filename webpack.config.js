const path = require('path');

module.exports = {
  entry: {
    upload: ['babel-polyfill', './frontend/src/upload.js'],
    download: ['babel-polyfill', './frontend/src/download.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: 'babel-loader',
        exclude: /node_modules/,
        query: { presets: ['env'] }
      }
    ]
  }
};
