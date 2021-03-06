const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


const setPath = function (folderName) {
  return path.join(__dirname, folderName);
};



const extractHTML = new HtmlWebpackPlugin({
  title: 'Me',
  filename: 'index.html',
  inject: true,
  template: setPath('../index.ejs')
});



const config = {
  entry: {
    build: setPath('../src/App.js')
  },
  output: {
    path: setPath('dist'),
    publicPath: '/',
    filename: '[name].[hash].js'
  },

  optimization: {
    runtimeChunk: false,
    splitChunks: {
      chunks: 'all'
    }
  },
  resolveLoader: {
    modules: [setPath('../node_modules')]
  },
  mode: 'development',
  devtool: '#eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: './dist',
    proxy: {
      '/api': {
        /*68是刚哥得IP*/
        /*target: 'http://192.168.1.68:8080/wanna',*/
        target: 'http://localhost:8080/wanna',
        /*target: 'https://www.chicme.xyz/',*/
        pathRewrite: { '^/api': '' },
        secure: false
      }
    }
  },
  plugins: [
    extractHTML,
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader'
        }]
      },
      {
        test: /\.css$/,
        use:['vue-style-loader', 'css-loader','sass-loader']
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader','css-loader', 'sass-loader']
      }
    ]
  },

};
module.exports = config;
