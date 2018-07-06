const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const IS_DEV = process.env.NODE_ENV === 'development';

const regularJSOptions = {
  babelrc: false,
  presets: [['env', { modules: false }], 'stage-2'],
  // yo-yoify converts html template strings to direct dom api calls
  plugins: ['yo-yoify']
};

const entry = {
  // babel-polyfill and fluent are directly included in vendor
  // because they are not explicitly referenced by app
  vendor: ['babel-polyfill', 'fluent'],
  app: ['./app/main.js'],
  style: ['./app/main.css'],
  android: ['./android/android.js']
};

if (IS_DEV) {
  entry.tests = ['./test/frontend/index.js'];
  // istanbul instruments the source for code coverage
  regularJSOptions.plugins.push('istanbul');
}

module.exports = {
  entry,
  output: {
    filename: '[name].[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: IS_DEV && 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        oneOf: [
          {
            include: require.resolve('./assets/cryptofill'),
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
            // inlines version from package.json into header/index.js
            include: require.resolve('./app/templates/header'),
            use: [
              {
                loader: 'babel-loader',
                options: regularJSOptions
              },
              './build/version_loader'
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
            options: regularJSOptions
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
              options: { modules: false, importLoaders: 1 }
            },
            'postcss-loader'
          ]
        })
      },
      {
        // creates version.json for /__version__ from package.json
        test: require.resolve('./package.json'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'version.json'
            }
          },
          'extract-loader',
          './build/package_json_loader'
        ]
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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => /node_modules/.test(resource)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),
    new ExtractTextPlugin({
      filename: 'style.[contenthash:8].css'
    }),
    new ManifestPlugin() // used by server side to resolve hashed assets
  ],
  devServer: {
    compress: true,
    host: '0.0.0.0',
    before: IS_DEV ? require('./server/bin/dev') : undefined,
    proxy: {
      '/api/ws': {
        target: 'ws://localhost:8081',
        ws: true,
        secure: false
      }
    }
  }
};
