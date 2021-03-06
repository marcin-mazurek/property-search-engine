var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/front-end/main.ts',
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  output: {
    path: 'public/js',
    filename: 'app.js'
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        loader: 'raw'
      },
      {
        test: /\.scss$/,
        loader: 'raw!sass'
      }
    ]
  }
};
