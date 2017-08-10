const path = require('path');

module.exports = {
  entry: {
    upload: ['./frontend/src/upload.js'],
    download: ['./frontend/src/download.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: 'babel-loader',
        include: [
          path.resolve(__dirname, 'frontend'),
          path.resolve(__dirname, 'node_modules/testpilot-ga/src')
        ],
        query: {
          babelrc: false,
          presets: [['es2015', { modules: false }], 'stage-2']
        }
      }
    ]
  }
};
