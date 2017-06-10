var path = require('path')
var webpack = require('webpack')
var OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin')

var port = process.env.NODE_ENV || 9000;

var uri = "http://localhost:" + port;

module.exports = {
  entry: {
    entry: './modules/my-test/test.js',
    entry1: './src/index.js',
    entry2: './src/my-mvvm/xue.js'
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
  resolve: {
    extensions: ['.js', '.json', '.css'],
    alias: {
      'utils': path.resolve(__dirname, 'src/my-mvvm/utils'),
      'compiler': path.resolve(__dirname, 'src/my-mvvm/compiler'),
      'watcher': path.resolve(__dirname, 'src/my-mvvm/watcher'),
      'observer': path.resolve(__dirname, 'src/my-mvvm/observer')
    }
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    // hot: true,
    port: port
  }
}
