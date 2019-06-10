const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  entry: {
    main: './src/js/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
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
        test: /\.scss$/,
        use:  [  
            'style-loader', 
            MiniCssExtractPlugin.loader, 
            'css-loader', 
            'postcss-loader', 
            'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use:  [  
            'style-loader', 
            MiniCssExtractPlugin.loader, 
            'css-loader'
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
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  },
  plugins: [ 
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: 'style.[contenthash].css',
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

  ],
  devServer: {
    stats: 'errors-only',
    port: 9000
  }
}