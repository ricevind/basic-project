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
  resolve: {
    extensions: ['.js', '.json', '.scss', '.jpeg', '.jpg', '.gif', '.png', '.ico'],
    alias: {
      images: path.resolve(__dirname, 'src/assets/images'),
      icons: path.resolve(__dirname, 'src/assets/icons')
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'link:href']
          }
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
        use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({
          use: ['css-loader', 'sass-loader', 'postcss-loader'],
          fallback: 'style-loader'
        }))
      },
      {
        test: /.ico$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            context: 'src/assets/icons',
            outputPath: 'icons/'
          }
        }
      },
      {
        test: /.(jpe?g|png|gif|svg)$/i,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              context: 'src/assets/images',
              outputPath: 'images/'
            }
          },
          {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: {
                progressive: true
              },
              gifsicle: {
                interlaced: false
              },
              optipng: {
                optimizationLevel: 4
              },
              pngquant: {
                quality: '75-90',
                speed: 3
              }
            }
          }
        ]
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
