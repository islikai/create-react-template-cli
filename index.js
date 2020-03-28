#!/usr/bin/env node
// 告诉操作系统用node来解释这个脚本

const fs = require('fs');

// 终端输入处理包
const program = require('commander');
// 获取package文件
const package = require('./package.json');

program
  .version(package.version)
  .option('-v, --version', '查看版本')
  .option('init', '创建模版')
  .command('init <name>')
  .action(name => {
    console.log(name);
  })

program.parse(process.argv);
