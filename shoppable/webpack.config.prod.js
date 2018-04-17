const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    collection: path.resolve(__dirname, './src/pc/theme-product.js'),
    product: path.resolve(__dirname, './src/pc/list-product.js'),
    // collection: path.resolve(__dirname, './src/msite/theme-product.js'),
    // product: path.resolve(__dirname, './src/msite/list-product.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: ['sass-loader', 'css-loader', 'style-loader']
          }
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  plugins: [
    new webpack.optimize.SplitChunksPlugin(),
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]
};
