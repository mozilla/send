const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const VersionPlugin = require('./build/version_plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webJsOptions = {
  babelrc: false,
  presets: [['env', { modules: false }], 'stage-2'],
  // yo-yoify converts html template strings to direct dom api calls
  plugins: ['yo-yoify']
};

const serviceWorker = {
  target: 'webworker',
  entry: {
    serviceWorker: './app/serviceWorker.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'source-map'
};

const web = {
  target: 'web',
  entry: {
    // babel-polyfill and fluent are directly included in vendor
    // because they are not explicitly referenced by app
    vendor: ['babel-polyfill', 'fluent'],
    app: ['./app/main.js']
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        oneOf: [
          {
            include: [require.resolve('./assets/cryptofill')],
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[hash:8].[ext]'
                }
              }
            ]
          },
          {
            // fluent gets exposed as a global so that each language script
            // can load independently and share it.
            include: [path.dirname(require.resolve('fluent'))],
            use: [
              {
                loader: 'expose-loader',
                options: 'fluent'
              },
              {
                loader: 'babel-loader',
                options: {
                  presets: [['env', { modules: false }], 'stage-3']
                }
              }
            ]
          },
          {
            loader: 'babel-loader',
            include: [
              path.resolve(__dirname, 'app'),
              path.resolve(__dirname, 'common'),
              // some dependencies need to get re-babeled because we
              // have different targets than their default configs
              path.resolve(__dirname, 'node_modules/testpilot-ga/src'),
              path.resolve(__dirname, 'node_modules/fluent-intl-polyfill'),
              path.resolve(__dirname, 'node_modules/intl-pluralrules')
            ],
            options: webJsOptions
          },
          {
            // Strip asserts from our deps, mainly choojs family
            include: [path.resolve(__dirname, 'node_modules')],
            loader: 'webpack-unassert-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]'
            }
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeViewBox: false }, // true causes stretched images
                { convertStyleToAttrs: true }, // for CSP, no unsafe-eval
                { removeTitle: true } // for smallness
              ]
            }
          }
        ]
      },
      {
        // creates style.css with all styles
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            'postcss-loader'
          ]
        })
      },
      {
        // creates a js script for each ftl
        test: /\.ftl$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[hash:8].js'
            }
          },
          'extract-loader',
          'babel-loader',
          './build/fluent_loader'
        ]
      },
      {
        // creates test.js for /test
        test: require.resolve('./test/frontend/index.js'),
        use: ['babel-loader', 'val-loader']
      },
      {
        // loads all assets from assets/ for use by common/assets.js
        test: require.resolve('./build/generate_asset_map.js'),
        use: ['babel-loader', 'val-loader']
      },
      {
        // loads all the ftl from public/locales for use by common/locales.js
        test: require.resolve('./build/generate_l10n_map.js'),
        use: ['babel-loader', 'val-loader']
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      {
        context: 'public',
        from: '*.*'
      }
    ]),
    new webpack.IgnorePlugin(/dist/), // used in common/*.js
    new webpack.IgnorePlugin(/require-from-string/), // used in common/locales.js
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[hash:8].css'
    }),
    new VersionPlugin(),
    new ManifestPlugin() // used by server side to resolve hashed assets
  ],
  devtool: 'source-map',
  devServer: {
    before: require('./server/bin/dev'),
    compress: true,
    hot: false,
    host: '0.0.0.0',
    proxy: {
      '/api/ws': {
        target: 'ws://localhost:8081',
        ws: true,
        secure: false
      }
    }
  }
};

module.exports = (env, argv) => {
  const mode = argv.mode || 'production';
  console.error(`mode: ${mode}`);
  web.mode = serviceWorker.mode = mode;
  if (mode === 'development') {
    // istanbul instruments the source for code coverage
    webJsOptions.plugins.push('istanbul');
    web.entry.tests = ['./test/frontend/index.js'];
  }
  return [web, serviceWorker];
};
