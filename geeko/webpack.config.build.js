const path = require('path')
const webpack = require('webpack')
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 引入clean-webpack-plugin插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const TerserPlugin = require("terser-webpack-plugin");


const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


module.exports = ({
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath:"auto",
        filename: 'js/[name].[chunkhash].bundle.js',
		chunkFilename: 'js/[name].[chunkhash].chunk.js'
    },
    cache: {
        type: 'filesystem', // 使用文件缓存
    },
    mode: 'production',
    optimization: {
        minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: false,
				terserOptions: {
					compress: { pure_funcs: ['console.log'] },
				},
			}),
            new CssMinimizerPlugin({
                parallel: 4,
            }),
		],
        splitChunks: {
			chunks: 'all',
			minSize: 0,
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: "initial"
                }
            }
		},
    },
    // optimization: {
    //     minimizer: [
    //         new TerserPlugin({
    //           parallel: 4,
    //           terserOptions: {
    //             parse: {
    //               ecma: 8,
    //             },
    //             compress: {
    //               ecma: 5,
    //               warnings: false,
    //               comparisons: false,
    //               inline: 2,
    //             },
    //             mangle: {
    //               safari10: true,
    //             },
    //             output: {
    //               ecma: 5,
    //               comments: false,
    //               ascii_only: true,
    //             },
    //           },
    //         }),
    //         new CssMinimizerPlugin({
    //             parallel: 4,
    //         }),
    //     ],
    //     splitChunks: {
    //         // include all types of chunks
    //         chunks: 'all',
    //         // 重复打包问题
    //         cacheGroups:{
    //           vendors:{ // node_modules里的代码
    //             test: /[\\/]node_modules[\\/]/,
    //             chunks: "all",
    //             // name: 'vendors', 一定不要定义固定的name
    //             priority: 10, // 优先级
    //             enforce: true 
    //           }
    //         }
    //     },
    //     runtimeChunk: true,
    //     moduleIds: 'deterministic',
    // },
    resolve:{
        extensions: ['.vue', '.js'],
        alias: {
            process: "process/browser",
            "@":path.join(__dirname, 'src')
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
                            publicPath: '/resources/vue/css',
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
            filename: "css/[name].[chunkhash].css",
            chunkFilename: 'css/[id].[chunkhash].css',
            linkType: 'text/css',
        }),
        // 去掉index.html
        new HtmlWebpackPlugin({
            title: 'index',
            template: 'index.ejs',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'server',					// 开一个本地服务查看报告
        //     analyzerHost: '127.0.0.1',			// host 设置
        //     analyzerPort: 8888,							// 端口号设置
        // }),
        new ProgressBarPlugin({
            format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
        })
    ],
    devtool: 'source-map'
})