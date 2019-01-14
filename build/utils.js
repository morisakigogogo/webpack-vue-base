const path = require('path')
const config = require('./config')
const glob = require('glob')
const productName = config.productName

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
let pagePaths = path.resolve(__dirname, '../src/projects')
let entryFiles = glob.sync(pagePaths + '/**/main.js')
const pages = glob.sync(pagePaths + '/**/index.html')
// console.log('pages ------------------------')
// console.log(pages);
// console.log('pages ------------------------')
exports.entries = function () {
    if (typeof productName !== 'undefined' && productName !== './') {
        let obj = {};
        obj[productName] = pagePaths + '/' + productName + '/main.js';
        return obj;
    }

    let map = {}
    entryFiles.forEach((filePath) => {
        let filePathTemp = filePath.slice(0, -8);
        let filename = filePathTemp.substring(filePathTemp.lastIndexOf('\/') + 1)
        map[filename] = filePath
    })
    return map
}

exports.pagies = function () {
    if (typeof productName !== 'undefined' && productName !== './') {
        return [{
            filename: path.resolve(__dirname, '../dist') + '/' + productName + '/index.html',
            template: pagePaths + '/' + productName + '/index.html',
            name: productName
        }]
    }
    let maps = [];
    pages.forEach(filePath => {
        let map = {}
        let filePathTemp = filePath.slice(0, -11);
        let filename = filePathTemp.substring(filePathTemp.lastIndexOf('\/') + 1)
        map.filename = path.resolve(__dirname, '../dist') + '/' + filename + '/index.html'
        map.template = filePath
        map.name = filename
        maps.push(map)
    })
    return maps;
}

exports.resolvePath = function (_path) {
    const assetsDir = process.env.NODE_ENV === 'production' ?
        config.buildProd.assetsDir:
        config.dev.assetsDir
    if (typeof productName === 'undefined' || productName === './') {
        return path.posix.join(assetsDir, _path)
    } else {
        return path.posix.join(productName, assetsDir, _path)
    }
};
exports.cssLoaders = function (options) {
    options = options || {}

    var cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: exports.getNodeEnv() === 'prod' || exports.getNodeEnv() === 'test' || exports.getNodeEnv() === 'mytest',
            sourceMap: options.sourceMap
        }
    }

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        var loaders = [cssLoader]
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            // return ExtractTextPlugin.extract({
            //     use: loaders,
            //     fallback: 'vue-style-loader'
            // })
             return [MiniCssExtractPlugin.loader].concat(loaders)
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less')
    }
}
// is prodution
exports.getNodeEnv = function () {
    let NODE_ENV = process.argv[2];
    if (NODE_ENV !== 'local' && NODE_ENV !== 'test' && NODE_ENV !== 'prod' && NODE_ENV !== 'mytest') {
        NODE_ENV = 'dev'
    }
    return NODE_ENV;
}