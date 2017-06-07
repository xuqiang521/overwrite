var path = require('path')
var webpack = require('webpack')
var OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin')

var port = process.env.NODE_ENV || 9000;

var uri = "http://localhost:" + port;

module.exports = {
  entry: {
    entry: './modules/my-test/test.js',
    entry1: './src/index.js',
    entry2: './src/my-mvvm/index.js'
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
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new OpenBrowserWebpackPlugin({
      url: uri
    })
    // new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    // hot: true,
    port: port
  }
}
