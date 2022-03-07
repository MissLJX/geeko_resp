const path = require('path')
const webpack = require('webpack')
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath:"/",
        filename: '[name].[hash].js',
    },
    mode: 'development',
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
                        'scss': 'style-loader!css-loader!sass-loader',
                        // 'scss': 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
                    },
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve:{
        alias: {
            process: "process/browser",
            // 'vue$': 'vue/dist/vue.esm.js',
            "@":resolve('src')
        }
    },
    plugins: [
        // new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
            chunkFilename: 'css/[id].[hash].css',
            linkType: 'text/css',
        }),
        new HtmlWebpackPlugin({
            title: 'index',
            template: 'index.ejs',
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        proxy: {
			'/api': {
				// target: 'https://www.chicme.xyz',
				target: 'http://192.168.1.8:8080/',
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
    devtool: 'eval-source-map'
}