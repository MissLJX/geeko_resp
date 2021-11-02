const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


const setPath = function (folderName) {
    return path.join(__dirname, folderName);
};

const {CleanWebpackPlugin} = require('clean-webpack-plugin')

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
        // publicPath: '/resources/vue/pcme/', // 正式
        publicPath: '/wanna/resources/vue/pcme/', // 本地
        filename:'[name].[contenthash].js'
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
    mode: 'production',
    devtool: '#eval-source-map',
    plugins: [
        extractHTML,
        new VueLoaderPlugin(),
        new CleanWebpackPlugin()
    ],
    devtool: 'source-map',
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
