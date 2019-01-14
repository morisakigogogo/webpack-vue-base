const webpack = require('webpack');
const path = require('path');
const config = require('./config');
const CopyWebpackPlugin = require("copy-webpack-plugin");

let devConfig = {
  mode: 'development',
  output: {
    publicPath: config.dev.publicPath
  },
  module: {
    rules: [{
      test: /\.less$/,
      use: [
        'vue-style-loader', {
          loader: 'css-loader',
          options: {
            minimize: true,
            sourceMap: config.dev.cssSourceMap
          }
        }, {
          loader: 'less-loader'
        },
        // 'postcss-loader'
      ]
    }, {
      test: /\.css$/,
      use: [
        'vue-style-loader', {
          loader: 'css-loader',
          options: {
            modules: true, //css模块化 CSS Modules
            importLoaders: 1,
            minimize: true,
            sourceMap: config.dev.cssSourceMap
          }
        },
        'postcss-loader'
      ]
    }]
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    // new webpack.HotModuleReplacementPlugin({
    //   // Options...
    // }),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, "..", "static"),
      to: 'static',
      ignore: [".*"]
    }]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"dev"'
      }
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: config.dev.devServer.host,
    port: config.dev.devServer.port,
    // publicPath: '/',
    noInfo: config.dev.noInfo,
    compress: true,
    proxy: config.dev.proxyTable,
    open: true,
    hot: true,
    inline: true,
    openPage: config.productName
  }
}

if (config.dev.useEslint) {
  const createEsLintRule = {
    test: /\.(js|vue)$/,
    loader: "eslint-loader",
    enforce: "pre",
    include: [path.join(__dirname, "../src")],
    options: {
      formatter: require("eslint-friendly-formatter"),
      failOnWarning: true,
      quiet: true,
      emitWarning: false
    }
  };
  devConfig.module.rules.unshift(createEsLintRule)
}
let dll = () => (
  new CopyWebpackPlugin([{
    from: config.dllPath + '/',
    to: config.dev.dllSubDirectory,
    ignore: ['.*']
  }]));
config.isDll ? devConfig.plugins.push(dll()) : null;
module.exports = devConfig;