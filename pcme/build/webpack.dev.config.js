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
        target: 'https://www.chicme.com',
				// target: 'https://www.chicme.xyz',
        // target: 'https://www.crostechno.com',
        // target: 'https://www.neobosen.com/',
        // target: 'https://www.boutiquefeel.com/',
				// target: 'http://192.168.1.59:8080/wanna/',
				pathRewrite: { '^/api': '' },
				cookieDomainRewrite: 'localhost',
				cookiePathRewrite: {
					'/wanna': '/',
				},
				secure: true,
				changeOrigin: true
			}
		},
		host: '0.0.0.0'
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
