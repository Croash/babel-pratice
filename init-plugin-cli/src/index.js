#!/usr/bin/env node
const commander = require('commander')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')

commander.option('--name <name>', '项目名称');
commander.option('--out-dir <outDir>', '输出目录');

commander.parse(process.argv);

if (process.argv.length <=2 ) {
  commander.outputHelp();
  process.exit(0);
}

const cliOpts = commander.opts();
const name = cliOpts.name
const cwd = process.cwd()

if (typeof name !== 'string') {
  console.log('请输入项目名称')
  return
}

function mkdir() {
  if (fs.existsSync(cwd+ `/${name}`)) {
    console.log(`已存在路径: ${name}`);
    process.exit(1);
  }
  fs.mkdirSync(cwd+ `/${name}`)
  fs.mkdirSync(cwd+ `/${name}/src`)
  return true
}

function exportFile() {
  const indexJs = fs.readFileSync(path.join(__dirname, './template/index.js'), {
    encoding: 'utf-8'
  });
  const pluginJs = fs.readFileSync(path.join(__dirname, './template/plugin.js'), {
    encoding: 'utf-8'
  });
  const sourceCode = fs.readFileSync(path.join(__dirname, './template/sourceCode.js'), {
    encoding: 'utf-8'
  })
  const buildPacakgeJson = require('./template/buildPacakgeJson')
  fs.writeFile(path.resolve(cwd,`./${name}/src/index.js`), indexJs, {}, () => {}
  )
  fs.writeFile(path.resolve(cwd, `./${name}/src/plugin.js`), pluginJs, {}, () => {})
  fs.writeFile(path.resolve(cwd, `./${name}/src/sourceCode.js`), sourceCode, {}, () => {})
  fs.writeFile(path.resolve(cwd, `./${name}/package.json`), JSON.stringify(buildPacakgeJson({name}), null, 2),  {}, () => {})
}

mkdir()
exportFile()
console.log(`${name}初始化完成`)
