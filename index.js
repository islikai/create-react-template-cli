#!/usr/bin/env node
// 告诉操作系统用node来解释这个脚本

const fs = require('fs');

const commander = require('commander'); // 终端输入处理
const downloadGitRepo = require('download-git-repo'); //下载模版文件
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const ora = require('ora');
let inquirer = require('inquirer');
const handlebars = require('handlebars');

const package = require('./package.json'); // 获取package文件

const {
  templateTypes,
  tmpStatus,
  checkName,
} = require('./bin/config');

commander
  .version(package.version)
  .option('-v, --version', '查看版本')
  .option('init', '创建模版')
  .command('init <name>')
  .action((name) => {
    // 判断名称是否合法
    if (!checkName(name)) {
      console.log(logSymbols.error, chalk.red('创建文件名称请使用英文名称，开头大写；如(Home)'));
      return;
    }
    // 检查项目中是否已存在文件
    if (fs.existsSync(name)) {
      console.log(logSymbols.error, chalk.red('文件名已存在'));
      return;
    }
    inquirer
      .prompt(templateTypes)
      .then((answers) => {
        // 选择模版类型后处理
        console.log(logSymbols.success,chalk.green('开始创建...'));
        const spinner = ora('正在下载模板...');
        spinner.start();
        downloadGitRepo(`github:islikai/react-template/#/${tmpStatus[answers.type]}`, name, (err) => {
          if (err) {
            return spinner.fail(chalk.red('下载模板错误********'));
          }
          spinner.succeed();
          var files = fs.readdirSync(name);
          for (let i = 0; i < files.length; i++) {
            let fileName = `${name}/${files[i]}`;
            // 处理模版文件，删除其他文件
            if (fileName === `${name}/index.js`) {
              // 读取模版文件内容
              const content = fs.readFileSync(fileName).toString();
              // 处理模版文件内容
              const result = handlebars.compile(content)({ template: name, });
              // 写入文件
              fs.writeFileSync(fileName, result);
            } else {
              fs.unlink(fileName, (err) => {
                err && console.log(logSymbols.error, chalk.red('文件删除错误'));
              })
            }
          }
          console.log(logSymbols.success, chalk.green('模版创建成功'));
        })
      })
  })

commander.parse(process.argv);
