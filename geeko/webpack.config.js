const path = require('path');

const webpack = require('webpack');


const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');

const isProduction = process.env.NODE_ENV === 'production';


module.exports = {
  entry: {
    main: './src/main.js'
  },

  output: {
    path: path.resolve(__dirname, './dist'),
     /*publicPath: '/joyshoetique/resources/vue/me/js/',*/
      publicPath: '/resources/vue/me/js/',
    filename: '[name].js',
    chunkFilename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'css': 'style-loader!css-loader!sass-loader'
          },
          extractCSS: process.env.NODE_ENV === 'production'
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },


  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new HtmlWebpackPlugin({
      title: 'index',
      template: 'index.ejs',
      filename: 'index.html'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') > 0;
      }
    }),
    new ExtractTextPlugin({ filename: '[name].css' }),
    new webpack.DefinePlugin({
      'site':JSON.stringify("chicme")
    })
  ],


  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }

  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: './dist',
    proxy: {
      '/api': {
        /*target: 'http://localhost:8080/boutiquefeel',*/
        /*target: 'http://192.168.1.128:8080/wanna',*/
        target: 'https://www.chicme.xyz',
        pathRewrite: { '^/api': '' },
        secure: false
      }
    }
  },
  devtool: '#eval-source-map'

};

if (isProduction) {
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]);
}
