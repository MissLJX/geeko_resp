const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const ROOT_PATH = path.resolve(__dirname)
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist_confirm_pc')

module.exports = {
  entry: {
  	orderconfirm: ['babel-polyfill', path.resolve(ROOT_PATH, 'app.jsx')]
  },
  output: {
  	path: BUILD_PATH,
    // publicPath: '/resources/js/react/msite/order_confirm/',
    publicPath: '/resources/js/react/pc/order_confirm/',
  	filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  mode: 'production',
  devtool: 'source-map',
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
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'siteurl': JSON.stringify('https://www.ivrose.com'),
      'sitename': JSON.stringify('IVRose'),
      // 'MercadoPublicKey': JSON.stringify('APP_USR-feb41ad2-2287-437d-859d-0be51c116e51')
      'MercadoPublicKey': JSON.stringify('TEST-aa971175-51cd-4be7-8ae4-f12006ac536d'),
      'sitelogo': JSON.stringify('https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/site/pc/icon326_iv.png'),
      'deviceType': JSON.stringify('pc'),
      'siteType': JSON.stringify('old')
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
}
