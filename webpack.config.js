const webpack = require('webpack');

const config = {
  entry: './index.js',
  output: {
   filename: 'dist/output.js'
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
        loader: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}

module.exports = config;
