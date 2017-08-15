const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: {
    upload: ['./frontend/src/upload.js'],
    download: ['./frontend/src/download.js']
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'frontend'),
          path.resolve(__dirname, 'node_modules/testpilot-ga/src')
        ],
        options: {
          babelrc: false,
          presets: [['es2015', { modules: false }], 'stage-2']
        }
      }
    ]
  },
  plugins: [new ManifestPlugin()]
};
