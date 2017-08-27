const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const IS_DEV = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    vendor: ['babel-polyfill', 'fluent'],
    app: ['./app/main.js']
  },
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
            include: [path.dirname(require.resolve('fluent'))],
            use: [
              {
                loader: 'expose-loader',
                options: 'fluent'
              },
              {
                loader: 'babel-loader',
                options: {
                  presets: [['env', { modules: false }]]
                }
              }
            ]
          },
          {
            loader: 'babel-loader',
            include: [
              path.resolve(__dirname, 'app'),
              path.resolve(__dirname, 'common'),
              path.resolve(__dirname, 'node_modules/testpilot-ga/src')
            ],
            options: {
              babelrc: false,
              presets: [['env', { modules: false }], 'stage-2'],
              plugins: ['yo-yoify']
            }
          },
          {
            include: [path.resolve(__dirname, 'node_modules')],
            loader: 'webpack-unassert-loader'
          }
        ]
      },
      {
        test: /\.(svg|png|jpg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]'
            }
          },
          'extract-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
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
    new ManifestPlugin()
  ],
  devServer: {
    compress: true,
    setup: IS_DEV ? require('./server/dev') : undefined
  }
};
