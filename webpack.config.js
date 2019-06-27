const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');


module.exports = {
  entry: {
    main: './src/js/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use:[
          { loader: 'style-loader',}, 
          { loader: MiniCssExtractPlugin.loader,}, 
          { loader: 'css-loader', }, 
          { loader: 'postcss-loader',}, 
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        options: {
            name: 'images/[name].[ext]'
        },
      },
      { 
        test: /\.(svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader', 
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [ 
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash(),
    new FaviconsWebpackPlugin({
      logo:'./src/logo.png',
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
    stats: 'errors-only',
    port: 9000
  }
}
