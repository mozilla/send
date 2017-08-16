const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    vendor: ['babel-polyfill', 'raven-js'],
    upload: ['./frontend/src/upload.js'],
    download: ['./frontend/src/download.js']
  },
  output: {
    filename: 'resources/[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist/public'),
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
      },
      {
        test: /\.(svg|png|jpg)$/,
        loader: 'file-loader',
        options: {
          name: 'resources/[name].[hash].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'resources/[name].[hash].[ext]'
            }
          },
          'extract-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      },
      {
        test: /\.hbs$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              interpolate: 'require',
              minimize: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      {
        context: 'public',
        from: 'locales/**/*.ftl'
      },
      {
        context: 'public',
        from: '*.*'
      },
      {
        from: 'views/**',
        to: '../'
      },
      {
        context: 'node_modules/l20n/dist/web',
        from: 'l20n.min.js'
      }
    ]),
    new HtmlPlugin({
      filename: '../views/index.handlebars',
      template: 'webpack/upload.hbs',
      chunks: ['upload']
    }),
    new HtmlPlugin({
      filename: '../views/download.handlebars',
      template: 'webpack/download.hbs',
      chunks: ['download']
    }),
    new HtmlPlugin({
      filename: '../views/legal.handlebars',
      template: 'webpack/legal.hbs',
      inject: false
    }),
    new HtmlPlugin({
      filename: '../views/notfound.handlebars',
      template: 'webpack/notfound.hbs',
      inject: false
    }),
    new HtmlPlugin({
      filename: '../views/layouts/main.handlebars',
      template: 'webpack/layout.hbs',
      inject: 'head',
      excludeChunks: ['upload', 'download']
    }),
    new HtmlPlugin({
      filename: '../views/unsupported.handlebars',
      template: 'webpack/unsupported.hbs',
      inject: false
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  ]
};
