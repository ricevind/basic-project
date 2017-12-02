const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
   path: path.resolve(__dirname, './dist'),
   filename: 'output.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        },
      },
      {
        test: /.scss$/,
        use: ExtractTextWebpackPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        }) 
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    historyApiFallback: true,
    inline: true,
    open: true
  },
  devtool: 'eval-source-map'
}

if (process.env === 'production') { 
  config.plugins.push(
    new UglifyJsPlugin(),
    new OptimizeCssAssets()
  )
}

module.exports = config;

