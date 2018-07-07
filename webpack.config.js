const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require('path');

module.exports = {
  devtool: 'inline-source-map',

  entry: './client/index.js',

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js'
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
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,  
        include: /node_modules/,  
        loaders: ['style-loader', 'css-loader'],
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
      "*": "http://localhost:8081"
    }
  },
};