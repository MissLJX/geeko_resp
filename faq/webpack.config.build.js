const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const ROOT_PATH = path.resolve(__dirname)
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist_faq_chicme')

module.exports = {
  entry: {
  	support: path.resolve(ROOT_PATH, 'app.jsx')
  },
  output: {
  	path: BUILD_PATH,
    publicPath: '/',
  	filename: '[name].bundle.js'
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
        test: /.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      // Chicme
      'messageId': JSON.stringify('804997446264798')
      // IVRose
      // 'messageId': JSON.stringify('317606285243994')
      // Boutiquefeel
      // 'messageId': JSON.stringify('1197317563662685')
    }),
    new webpack.DefinePlugin({
      'site': JSON.stringify('chicme')
    })
  ]
}
