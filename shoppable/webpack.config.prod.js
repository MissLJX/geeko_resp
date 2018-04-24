const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    collection: path.resolve(__dirname, './src/pc/theme-product.js'),
    product: path.resolve(__dirname, './src/pc/list-product.js'),
    collectionmsite: path.resolve(__dirname, './src/msite/theme-product-msite.js'),
    productmsite: path.resolve(__dirname, './src/msite/list-product-msite.js')
    // collection: path.resolve(__dirname, './src/msite/theme-product.js'),
    // product: path.resolve(__dirname, './src/msite/list-product.js')
  },
  output: {
    filename: '[name].bundle.js',
    // chunkFilename : '[name].chunk.js',
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
    new webpack.optimize.SplitChunksPlugin({
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          name: 'common'
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: "vendor"
        }
      }
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
