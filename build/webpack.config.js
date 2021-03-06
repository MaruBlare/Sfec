const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const utils = require('./utils');

module.exports = env => {

  return {
    context: path.resolve(__dirname, '../src'),
    entry: {
      main: './js/index.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: 'assets/js/[name].[hash:7].bundle.js'
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        source: path.resolve(__dirname, '../src'), 
        images: path.resolve(__dirname, '../src/img'), 
        fonts: path.resolve(__dirname, '../src/fonts'), 
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
        {
          test: /\.scss$/,
          use: [
            env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, // creates style nodes from JS strings
            'css-loader',
            'postcss-loader',
            'sass-loader', 
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 3000,
            name: 'assets/images/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 5000,
            name: 'assets/fonts/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(mp4)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/videos/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.pug$/,
          loader: 'pug-loader',
          options: {
              pretty: true
          }
        },
      ]
    }, 
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
      ],
      splitChunks: {
        cacheGroups: {
          default: false,
          vendors: false,
          // vendor chunk
          vendor: {
            filename: 'assets/js/vendor.[hash:7].bundle.js',
            // sync + async chunks
            chunks: 'all',
            // import file path containing node_modules
            test: /node_modules/
          }
        }
      }
    },
    plugins: [ 
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].[hash:7].bundle.css',
        chunkFilename: '[id].css',
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.pug',
        inject: true
      }),
      ...utils.pages(env),
      new WebpackMd5Hash(),
      new FaviconsWebpackPlugin({
        logo:'./logo.png',
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          opengraph: false,
          twitter: false,
          yandex: false,
          windows: false
        }
      }),
      new webpack.ProvidePlugin({
        '$': "jquery",
        'jQuery': "jquery",
        'Popper': 'popper.js'
      }),
    ],
    devServer: {
      contentBase: path.resolve(__dirname, '../src'),
      stats: 'errors-only',
      port: 9000
    }
  }
};
