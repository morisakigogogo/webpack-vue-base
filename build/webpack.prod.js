'use strict'
const webpack = require('webpack')
const path = require('path');
const config = require('./config');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const utils = require("./utils");
let resolvePath = utils.resolvePath;
let productName = config.productName;
let prodConfig = {
    output: {
        publicPath: utils.getNodeEnv() === "prod" ? config.buildProd.publicPath : "./"
    },
    mode: 'production',
    module: {
        rules: [{
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    options: {
                        minimize: true,
                        }
                    },
                    'less-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            minimize: true,
                            module: true
                        }
                    },
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: path.join(__dirname, "..", "static"),
            to: "static",
            ignore: [".*"]
        }]),
        // copy custom static assets
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: utils.getNodeEnv() === "prod" ? '"prod"' : '"test"'
            }
        }),
        new UglifyjsWebpackPlugin({
            uglifyOptions: {
                compress: {
                    // Does not output warnings when UglifyJs deletes unused code
                    // 在UglifyJs删除没有用到的代码时不输出警告
                    warnings: false,
                    // Delete all `console` statements, compatible with IE browser
                    // 删除所有的 `console` 语句，可以兼容ie浏览器
                    drop_console: true,
                    // Inline variables defined but used only once
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // Extract static values that appear multiple times but are not defined as variables to reference
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true,
                },
                output: {
                    // The most compact output
                    //最紧凑的输出
                    beautify: false,
                    // Delete all comments
                    //删除所有的注释
                    comments: false,
                }
            }
        }),
        // new CleanWebpackPlugin([path.resolve(__dirname, "../dist", productName)], {
        //     root: path.resolve(__dirname, "..")
        // }),
        new CleanWebpackPlugin([path.resolve(__dirname, "../dist")], {
            root: path.resolve(__dirname, "..")
        }),
        // Extract css as a separate css file 将css抽取出来，为单独的 css 文件
        new MiniCssExtractPlugin({
            filename: resolvePath("css/[name].[hash].css"),
            chunkFilename: resolvePath("css/[id].[hash].css")
        })
    ]
};
if (config.buildProd.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    prodConfig.plugins.push(new BundleAnalyzerPlugin())
}
let dll = () => (
    // copy dll vendors
    new CopyWebpackPlugin([{
        from: config.dllPath + '/',
        to: path.resolve(__dirname, '../dist/dll'),
        ignore: ['.*']
    }]));

config.isDll ? prodConfig.plugins.push(dll()) : null;
module.exports = prodConfig;