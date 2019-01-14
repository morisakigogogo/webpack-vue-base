const webpack = require('webpack')
const config = require('./config');

let testConfig = {
    output: {
        publicPath: config.test.publicPath
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: 'test'
            }
        })
    ]
};
if (config.buildProd.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    testConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = testConfig;


