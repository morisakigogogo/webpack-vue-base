'use strict'
const path = require("path");
const webpack = require("webpack");
const vueLoaderConfig = require("./vue-loader.conf");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');


const config = require('./config');
const utils = require("./utils");
let resolvePath = utils.resolvePath;
let pagies = utils.pagies();
let pagesAry = [];
let a = () => (
    new HtmlWebpackPlugin({
        template: process.argv[3] === 'prod' ? config.buildProd.htmlTemplate : config.dev.htmlTemplate, // 模版
        filename: config.buildProd.htmlTemplateFileName, // 文件名字
        inject: true,
        hash: true,
        // chunks: ['vendor'],
        minify: {
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
    }))
pagies.forEach(({
    template,
    name
}) => {
    pagesAry.push(new HtmlWebpackPlugin({
        template: template, // 模版
        filename: name + '/index.html', // 文件名字
        inject: true,
        hash: true,
        chunks: ['vendor', name],
        minify: {
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
    }))
});

const createEsLintRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [path.join(__dirname,'../src')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    failOnWarning: true,
    quiet: true,
    emitWarning: false
  }
})

let obj = {
    entry: config.isSingleProject ? path.resolve(__dirname, "../src/main.js") : utils.entries(),
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: resolvePath("/js/[name].[hash].js"),
        publicPath: './'
    },
    resolve: {
        extensions: [".js", ".vue", ".json"],
        alias: {
            vue$: "vue/dist/vue.esm.js",
            // 'vue$': 'vue/dist/vue.common.js',
            "@": path.join(__dirname, "..", "src"),
            "@api": path.join(__dirname, "..", "src/api"),
            "@com": path.join(__dirname, "..", "src/components"),
            "@js": path.join(__dirname, "..", "src/assets/js"),
            "@style": path.join(__dirname, "..", "src/assets/style"),
            "@img": path.join(__dirname, "..", "src/assets/img"),
        },
        // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
        mainFields: ['jsnext:main', 'browser', 'main']
    },
    externals: {
        wx: 'wx'
    },
    module: {
        rules: [
        ...(config.dev.useEslint ? [createEsLintRule()] : []),
        {
            test: /\.vue$/,
            loader: "vue-loader",
            options: vueLoaderConfig
        }, {
            test: /\.js$/,
            loader: "babel-loader",
            // include: [
            //     path.join(projectRoot, 'src')
            // ],
            exclude: file => (
                /node_modules/.test(file) &&
                !/\.vue\.js/.test(file)
            )
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(png|jpe?g|gif|svg|bmp)$/,
            loader: {
                loader: "url-loader",
                options: {
                    limit: 8 * 1024, //配置图片转base64阀值
                    name: resolvePath("images/[name].[hash:7].[ext]")
                }
            }
        }, {
            test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
            loader: {
                loader: "url-loader",
                options: {
                    limit: 8 * 1024,
                    name: resolvePath("webfonts/[name].[hash:7].[ext]"),
                    publicPath: '../../'
                }
            }
        }, {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: "url-loader",
            options: {
                limit: 8 * 1024,
                name: resolvePath("media/[name].[hash:7].[ext]")
            }
        }, {
            test: /\.(html|htm)/,
            loader: "html-withimg-loader"
        }]
    },
    plugins: [
        // 开启 Scope Hoisting
        // Scope Hoisting 可以让 Webpack 打包出来的代码文件更小、运行的更快， 它又译作 "作用域提升"，是在 Webpack3 中新推出的功能。
        new ModuleConcatenationPlugin(),
        new webpack.ProgressPlugin(),
        new VueLoaderPlugin(),
    ],
    node: {
        console: false,
        global: true,
        process: true,
        __filename: "mock",
        __dirname: "mock",
        Buffer: true,
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // 更多选项，请查看“其他 Node.js 核心库”
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}
//合并外部扩展
obj.externals = Object.assign({}, obj.externals, config.externals);
let dll = () => (
    new webpack.DllReferencePlugin({
        //描述动态链接库的文件内容
        manifest: require(config.dllPath + '/vendors.manifest.json'),
        context: path.resolve(__dirname, '..')
    }));
let htmlDll = () => ({
    test: /\.(html|htm)$/,
    use: {
        loader: "html-dll-loader",
        options: {
            url: path.resolve(__dirname, "../src", "index.html"),
            placeholder: "{{__content__}}",
            decorator: 'layout'
        }
    }
})
config.isDll ? (obj.plugins.push(dll()), obj.module.rules.push(htmlDll())) : null;
config.isSingleProject ? obj.plugins.push(a()) : obj.plugins.push(...pagesAry);


module.exports = obj;