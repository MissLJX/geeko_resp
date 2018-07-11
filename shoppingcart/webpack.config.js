const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const ROOT_PATH = path.resolve(__dirname)
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist')

module.exports = {
  entry: {
  	app: ['babel-polyfill', path.resolve(ROOT_PATH, 'app.jsx')]
  },
  output: {
  	path: BUILD_PATH,
    publicPath: '/',
  	filename: '[name].bundle.js'
  },
  mode: 'development',
  // enable dev source map
  devtool: 'eval-source-map',
  // enable dev server
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080/wanna',
        pathRewrite: { '^/api': '' },
        secure: false
      }
    }
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: ['babel-loader'],
        exclude: [path.join(ROOT_PATH, 'node_modules')]
      },
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Shopping Cart',
      meta: 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no',
      template: 'index.html'
    }),

    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'siteurl': JSON.stringify('http://localhost:8080/wanna'),
      'MercadoPublicKey': JSON.stringify('TEST-aa971175-51cd-4be7-8ae4-f12006ac536d')
    })
  ]
}
