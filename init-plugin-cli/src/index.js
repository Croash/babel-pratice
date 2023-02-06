#!/usr/bin/env node
const commander = require('commander')
const chalk = require('chalk')


commander.option('--name <name>', '项目名称');
commander.option('--out-dir <outDir>', '输出目录');

commander.parse(process.argv);

const cliOpts = commander.opts();
console.log(cliOpts)
console.log('commander.args', commander.args)

const name = opts.name

if (!name) {}

// const {  }
