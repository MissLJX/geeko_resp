const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const ROOT_PATH = path.resolve(__dirname)
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist')

module.exports = {
	entry: {
		app: [path.resolve(ROOT_PATH, 'app.jsx')]
	},
	output: {
		path: BUILD_PATH,
		publicPath: './',
		filename: '[name].bundle.js'
	}, 
	mode: 'development',
	// enable dev source map
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
				test: /\.css$/,
				use: [
          'style-loader',
					'css-loader'
				]
			}
		]
	},
	plugins: [
		new HTMLWebpackPlugin({
			title: 'Index'
		})
	]
}
