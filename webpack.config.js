const webpack = require('webpack');
const path = require('path');

const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
   path: path.resolve(__dirname, './dist'),
   filename: 'output.js'
  },
  module: {
    rules: [
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
    new ExtractTextWebpackPlugin('styles.css')
  ]
}

module.exports = config;
