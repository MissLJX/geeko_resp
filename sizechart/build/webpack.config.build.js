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
        filename: '[name].[chunkhash].js'
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
    plugins: [
        extractHTML,
        new VueLoaderPlugin()
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
    }
};
module.exports = config;
