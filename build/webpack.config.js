const merge = require('webpack-merge');
const base = require('./webpack.base');
const utils = require('./utils');
const chalk = require("chalk");
let NODE_ENV = utils.getNodeEnv();

let cur;

switch(NODE_ENV){
    case 'dev':
    cur = require('./webpack.dev');
    console.log(chalk.magenta(' Development, just a moment, please.'))
    console.log(chalk.magenta(`... ...\r\n\r\n`))
    break;
    case 'test':
    console.log(chalk.magenta(`${NODE_ENV} building, just a moment, please.`))
    console.log(chalk.magenta(`... ...\r\n\r\n`))
    cur = merge(require('./webpack.prod'), require('./webpack.test'));
    break;
    case 'local':
    console.log(chalk.magenta(`${NODE_ENV} local building, just a moment, please.`))
    console.log(chalk.magenta(`... ...\r\n\r\n`))
    cur = require('./webpack.prod');
    break;
    case 'prod':
    console.log(chalk.magenta(`${NODE_ENV} building, just a moment, please.`))
    console.log(chalk.magenta(`... ...\r\n\r\n`))
    cur = require('./webpack.prod');
    default:
    break;
}
console.log(cur.output)
module.exports = merge(base, cur);
