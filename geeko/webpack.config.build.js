const path = require('path')
const webpack = require('webpack')
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 引入clean-webpack-plugin插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath:"auto",
        filename: '[name].[hash].bundle.js',
		chunkFilename: '[name].[hash].chunk.js'
    },
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: "initial"
                }
            }
        },
        minimizer: [new TerserPlugin({
            parallel: true,
        })],
        chunkIds: 'named',
    },
    resolve:{
        alias: {
            process: "process/browser"
        }
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
                        'scss': 'style-loader!css-loader!sass-loader'
                    },
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    {  
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/resources/vue/order/css',
                        },
                    },
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
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
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        })
    ],
    devtool: 'source-map'
}