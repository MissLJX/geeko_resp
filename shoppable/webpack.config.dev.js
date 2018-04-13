const webpack = require('webpack')
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    // collection: path.resolve(__dirname, './src/list-collection.js')
    product: path.resolve(__dirname, './src/pc/list-product.js')
  },
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: './dist',
    proxy: {
      "/api": {
        // target: "http://localhost:8080/joyshoetique",
        target: "https://www.joyshoetique.com",
        pathRewrite: {"^/api" : ""},
        secure: false
      }
    }
  },
  module: {
    rules:[
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: ['css-loader', 'style-loader']
          }
        },
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
        {
          test: /.scss$/,
            loaders: ["style", "css", "sass"]
        }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({title:'shoppable',meta:{viewport: 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no'}})
  ]
}
