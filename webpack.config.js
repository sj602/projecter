const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require('path');

module.exports = {
  devtool: 'eval-source-map',

  entry: './client/index.js',

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.html$/,
        use: "html-loader"
      },
      {
        test: /\.css$/,  
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        use: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('/dist'),
    new HtmlWebPackPlugin({
      template: "client/index.html"
    })
  ],
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, './client/static'),
    watchContentBase: true,
    overlay: {
      warnings: true,
      errors: true
    },
    historyApiFallback: true,
    proxy: {
      "**": "http://localhost:8081",
    }
  },
};