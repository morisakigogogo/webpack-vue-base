const utils = require('./utils');
const config = require('./config');
var isProduction = utils.getNodeEnv() === 'prod' || utils.getNodeEnv() === 'test' || utils.getNodeEnv() === 'mytest';
module.exports = {
    // Solve the image before the require is passed to a variable and then passed to the component
    // 解决把图片提前 require 传给一个变量再传给组件
    transformAssetUrls: {
        avatar: ['default-src'],
        video: ['src', 'poster'],
        source: 'src',
        img: 'src',
        image: 'xlink:href'
    },
    // cssModules:{
    //     localIdentName: '[path][name]---[local]---[hash:base64:5]',
    //     camelCase: true
    // },
    // In order to remove spaces between elements 为了去掉元素间的空格
    preserveWhitespace: false,
    autoprefixer: {
        browsers: ["Android >= 2.3", "iOS >= 4"], //, "ChromeAndroid > 1%"
        cascade: false // Not beautify the output css 不美化输出 css
    },
    loaders: utils.cssLoaders({
        sourceMap: isProduction ?
            config.buildProd.productionSourceMap :
            config.dev.cssSourceMap,
        extract: isProduction
    })
}