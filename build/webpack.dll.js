const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require("clean-webpack-plugin");
const config = require('./config');
const utils = require("./utils");
let pagies = utils.pagies();
let pagesAry = [];
pagies.forEach(({template,name}) => {
    pagesAry.push(new HtmlWebpackPlugin({
        template: template,
        filename: name + '/index.html',
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
let obj = {
  // JS 执行入口文件
  entry: {
    // vendors: ['']
    // Put in a library that doesn't change much 把不怎么变化的库放进去
    vendors: ['vue', 'vue-router']
  },
  output: {
    // The file name of the output dynamic link library, [name] represents the name of the current dynamic link library,
    // That is, vue or vue-router configured in entry
    // 输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称，
    // 也就是 entry 中配置的 vue 和 vue-router
    filename: '[name].dll.[hash:7].js',
    // The output files are placed in the dist directory. 输出的文件都放到 dist 目录下
    path: config.dllPath,
    // The name of the global variable that holds the dynamic link library, for example, _dll_vue for vue
    // The reason for adding _dll_ in front is to prevent global variable conflicts.
    // 存放动态链接库的全局变量名称，例如对应 vue 来说就是 _dll_vue
    // 之所以在前面加上 _dll_ 是为了防止全局变量冲突
    library: '_dll_[name]',
  },
  mode: 'production',
  plugins: [
    // 接入 DllPlugin
    new webpack.DllPlugin({
      //The global variable name of the dynamic link library, which needs to be consistent with the output.library
      //The value of this field is also the value of the name field in the output manifest.json file.
      //For example, in vue.manifest.json there is "name": "_dll_vue"
      // 动态链接库的全局变量名称，需要和 output.library 中保持一致
      // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
      // 例如 vue.manifest.json 中就有 "name": "_dll_vue"
      name: '_dll_[name]',
      context: path.resolve(__dirname, '..'),
      //The name of the file describing the output of the manifest.json file of the dynamic link library
      // 描述动态链接库的 manifest.json 文件输出时的文件名称
      path: config.dllPath + '/[name].manifest.json'
    }),
    // new HtmlWebpackPlugin({
    //   filename: '../index.html',
    //   template: path.resolve(__dirname, '../src/index.html'),
    //   inject: true
    // }),
    new CleanWebpackPlugin([path.resolve(__dirname, "../dist/dll"), config.dllPath], {
      root: path.resolve(__dirname, "..")
    }),
  ],
};
if(config.dev.isMultipleProjects){
  obj.plugins.push(...pagesAry)
}
module.exports = obj
