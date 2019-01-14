const path = require('path');
let productName = process.argv[3];
if (productName === 'build/webpack.config.js' || productName === 'build/webpack.dll.js' && process.argv.length > 6) {
  productName = process.argv[7];
} else if (productName === 'build/webpack.config.js' && process.argv.length == 6) {
  productName = './';
} else if (productName === 'build/webpack.dll.js') {
  productName = process.argv[4];
} else if (process.argv[2] === 'local') {
  productName = ''
}
console.log('product name: ' + productName)
module.exports = {
  productName,
  //是否单项目,如果不是，需要在src目录下创建projects目录，目录里面是以项目名称区分目录
  //例：src/projects/a/main.js App.vue index.html,src/projects/b/main.js App.vue index.html
  isSingleProject: 0,
  //Whether to enable the DLL dynamic link library, if you start running npm run dll first 是否启用DLL动态链接库，如果启动先运行npm run dll
  isDll: 0,
  //Create a dll path 创建dll的路径
  dllPath: path.resolve(__dirname, '../src/dll'),
  //External extension 外部扩展
  externals: {
    Vue: 'vue'
  },
  dev: {
    //Whether to use code checking
    useEslint: 0,
    //The base path of the resource file CDN  资源文件的base路径
    publicPath: '/',
    //Resource file directory 资源文件目录
    assetsDir: 'static',
    // Output html template 制定产出的html模版
    htmlTemplate: './src/index.html',
    // Output html file name 产出的HTML文件名
    htmlTemplateFileName: 'index.html',
    dllSubDirectory: 'dll',
    devServer: {
      host: "0.0.0.0",
      port: 8000,
      noInfo: false
    },
    cssSourceMap: true,
    proxyTable: {
      // '/api': { // api表示当前项目请求的key
      //   target: 'http://target', // 代理服务器路径
      //   pathRewrite: { '^/api': '/' }, // 重写路径
      //   changeOrigin: true
      // }
    }
  },
  test: {
    publicPath: ``
  },
  buildProd: {
    //The base path of the resource file CDN 资源文件的base路径
    publicPath: ``,
    //Resource file directory 资源文件目录
    assetsDir: 'static',
    dllSubDirectory: 'dll',
    // sourceMap
    productionSourceMap: false,
    // Output html template 制定产出的html模版
    htmlTemplate: './src/index.html',
    // Output html file name 产出的HTML文件名
    htmlTemplateFileName: path.resolve(__dirname, '../dist/index.html'),
    //View the compressed state after building, npm run build <project name> --report
    //查看打包后压缩状态，npm run build <项目名称> --report
    bundleAnalyzerReport: process.env.npm_config_report
  }
}