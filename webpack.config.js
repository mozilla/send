const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: {
    vendor: ['babel-polyfill', 'raven-js', 'fluent', 'choo'],
    app: ['./app/main.js']
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
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
        test: /\.js$/,
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
        test: require.resolve('./assets/cryptofill'),
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
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),
    new ManifestPlugin()
  ],
  devServer: {
    compress: true,
    setup:
      process.env.NODE_ENV === 'development'
        ? require('./server/dev')
        : undefined
  }
};
