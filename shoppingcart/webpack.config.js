const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
        target: 'http://localhost:8080/boutiquefeel',
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
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Shopping Cart',
      template: 'index.html'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),

    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'siteurl': JSON.stringify('http://localhost:8080/wanna'),
      'MercadoPublicKey': JSON.stringify('TEST-aa971175-51cd-4be7-8ae4-f12006ac536d'),
      'sitename': JSON.stringify('IVRose'),
      'sitelogo': JSON.stringify('https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/site/pc/icon326_iv.png'),
      'deviceType': JSON.stringify('msite'),
      'siteType': JSON.stringify('old')
    })
  ]
}
