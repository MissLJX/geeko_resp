const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const ROOT_PATH = path.resolve(__dirname)
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist')

module.exports = {
  entry: {
    app: path.resolve(ROOT_PATH, 'app.jsx')
  },
  output: {
    path: BUILD_PATH,
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  mode: 'development',
  // enable dev source map
  // devtool: 'eval-source-map',
  devtool: 'cheap-module-source-map',
  // enable dev server
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    proxy: {
      '/api': {
        target: 'https://www.chicme.com',
        // target: 'http://192.168.2.66:8080',
				// cookiePathRewrite: {
				// 	'/wanna': '/',
				// },
        pathRewrite: { '^/api': '' },
        secure: false,
        changeOrigin: true
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
        use: ['style-loader', {loader:'css-loader',options:{modules:true}}]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'FAQ',
      template: 'index.html',
      meta: {
      	'charset': 'utf-8',
        'viewport': 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no'
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'site': JSON.stringify('chicme'),
      'messageId': JSON.stringify('804997446264798')
    })
  ]
}
