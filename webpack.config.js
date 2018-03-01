const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const IS_DEV = process.env.NODE_ENV === 'development';

const regularJSOptions = {
  babelrc: false,
  presets: [['env', { modules: false }], 'stage-2'],
  plugins: ['yo-yoify']
};

const entry = {
  vendor: ['babel-polyfill', 'fluent'],
  app: ['./app/main.js'],
  style: ['./app/main.css']
};

if (IS_DEV) {
  entry.tests = ['./test/frontend/index.js'];
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
              path.resolve(__dirname, 'node_modules/testpilot-ga/src'),
              path.resolve(__dirname, 'node_modules/fluent-intl-polyfill'),
              path.resolve(__dirname, 'node_modules/intl-pluralrules')
            ],
            options: regularJSOptions
          },
          {
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
                { removeViewBox: false },
                { convertStyleToAttrs: true },
                { removeTitle: true }
              ]
            }
          }
        ]
      },
      {
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
        test: require.resolve('./test/frontend/index.js'),
        use: ['babel-loader', 'val-loader']
      },
      {
        test: require.resolve('./build/generate_asset_map.js'),
        use: ['babel-loader', 'val-loader']
      },
      {
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
    new webpack.IgnorePlugin(/dist/),
    new webpack.IgnorePlugin(/require-from-string/),
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
    new ManifestPlugin()
  ],
  devServer: {
    compress: true,
    host: '0.0.0.0',
    before: IS_DEV ? require('./server/dev') : undefined
  }
};
