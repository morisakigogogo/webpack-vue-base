const webpack = require('webpack');
const webPackConfig = require('./webpack.config.js');
const chalk = require('chalk');
const compiler = webpack(webPackConfig);
compiler.run((err,stats)=>{
    if (err) throw err;
    // console.log(stats)
        process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
})
// webpack(webPackConfig,(err,stats)=>{
//     if (err) throw err;
//     // console.log(stats)
//         process.stdout.write(stats.toString({
//       colors: true,
//       modules: false,
//       children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
//       chunks: false,
//       chunkModules: false
//     }) + '\n\n')

//     if (stats.hasErrors()) {
//       console.log(chalk.red('  Build failed with errors.\n'))
//       process.exit(1)
//     }

//     console.log(chalk.cyan('  Build complete.\n'))
//     console.log(chalk.yellow(
//       '  Tip: built files are meant to be served over an HTTP server.\n' +
//       '  Opening index.html over file:// won\'t work.\n'
//     ))
// })