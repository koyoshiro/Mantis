#!/usr/bin/env node
const execSync = require('child_process').execSync
const path = require('path')
const fs = require('fs')
const bootstrap = require('commitizen/dist/cli/git-cz').bootstrap
const checkMessage = require('../lib/checkMessage')
const getConfig = require('../lib/getConfig')
const initMantis = require('../lib/configMantis')
const config = getConfig()
const staticLint = config['staticLintCMD']
const { ConsoleArg } = require('../lib/consoleArg')


// 不可将run放置在retry后，retry中引用了run，详情搜索require循环引用
// TODO: 后续可改为mjs
function run() {
    if (staticLint && typeof staticLint === 'string') {
        runCommand(staticLint)
    } else if (Array.isArray(staticLint)) {
        for (let command of staticLint) {
            runCommand(command)
        }
    }
    cz()
}

module.exports = { run }

function cz() {
    const commitizenPath = fs.existsSync(
        path.join(__dirname, '../node_modules/commitizen')) ?
        path.join(__dirname, '../node_modules/commitizen') :
        path.join(__dirname, '../../../commitizen')
    bootstrap({
        cliPath: commitizenPath,
        config: {
            'path': path.resolve(__dirname, '../lib/commit')
        }
    })
}

function retry(args) {
    if (Array.isArray(args) && args.length > 1) {
        args = [0, 1, ...args]
    } else {
        args = []
    }
    const commitizenPath = fs.existsSync(
        path.join(__dirname, '../node_modules/commitizen')) ?
        path.join(__dirname, '../node_modules/commitizen') :
        path.join(__dirname, '../../../commitizen')
    bootstrap({
        cliPath: commitizenPath,
        config: {
            'path': path.resolve(__dirname, '../lib/retry')
        }
    }, args)
}

function runCommand(command) {
    try {
        console.log('\x1b[31m %s \x1b[39m', command)
        execSync(command, { stdio: [0, 1, 2] })
    } catch (error) {
        console.error('\x1b[31m 指令%s出错，请确认后重试 \x1b[39m', command)
        process.exit(1)
    }
}


function check(fromRetry) {
    const message = fs.readFileSync(process.cwd() + '/.git/COMMIT_EDITMSG').toString().split('\n')[0]
    checkMessage(message, fromRetry)
}


function entry(options) {
    if (options.init) {
        return initMantis()
    }
    if (options.check) {
        return check();
    }
    if (options.retry) {
        check()
        retry(options['@@extraArgs'])
        return
    }
    run()
}

const consoleArgs = new ConsoleArg(
    "git commit message生成及commit前代码检测工具",
    {
        init: {
            alias: ['i', 'I'],
            message: '在此项目中初始化mantis'
        },
        check: {
            alias: ['c', 'C'],
            message: '检查commit message是否符合规定'
        },
        retry: {
            alias: ['r', 'R'],
            message: '使用上次生成/手写的commit message',
            acceptExtra: true // 后续可以接未配置的参数,retry支持git原生自带的一些参数
        }
    },
    entry
)
consoleArgs.start();