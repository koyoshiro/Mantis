const findConfig = require('find-config')
const fs = require('fs')
module.exports = () => {
    const pkg = findConfig('package.json')
    if (pkg === null) {
        console.error('\x1b[31m 项目中未能发现package.json，请确认路径是否正确 \x1b[39m')
        return
    }
    let configContent = {}
    try {
        configContent = require(pkg)
    } catch (e) {
        //
    }
    if (configContent.mantisConfig) {
        // return
    } else {
        configContent.mantisConfig = {
            pmProject: '',
            language: '',
            staticLintCMD: ''
        }
    }
    fs.writeFile(pkg, JSON.stringify(configContent, null, 2), () => console.log(' package.json 模板写入完成,但仍需要配置信息,稍后请到package.json进行填写'))

    const hsy = findConfig('.huskyrc.json')
    if (hsy === null) {
        // 做个兼容,如果没有husky,自动添加git hook,主要是commit-msg
        try {
            const commitMsgHookPath = findConfig('.git/hooks/commit-msg')
            if (commitMsgHookPath === null) {
                // 写入
                let hooksPath = findConfig('.git/hooks')
                if (hooksPath === null) {
                    const gitPath = findConfig('.git')
                    if (!gitPath) {
                        console.error('\x1b[31m 此项目似乎不是一个受git管理的项目 \x1b[39m')
                    } else {
                        hooksPath = gitPath + '/hooks'
                        fs.mkdirSync(hooksPath)
                    }
                }
                fs.writeFile(
                    hooksPath + '/commit-msg',
                    'npx mantis c',
                    { mode: 0755 },
                    () => console.log(' git hooks 已配置'),
                )
            } else {
                fs.appendFile(commitMsgHookPath, 'npx mantis c', () => console.log(' git hooks 已配置'))
            }
        } catch (e) {
            console.log('\x1b[31m 无法添加hook，建议使用.huskyrc.json来配置,或者手动添加 \x1b[39m')
        }
        return
    }
    let content = {}
    try {
        content = require(hsy)
    } catch (e) {
        //
    }
    if (!content.hooks) {
        content.hooks = {}
    }
    if (!content.hooks['commit-msg']) {
        content.hooks['commit-msg'] = 'npx mantis c'
    } else if (!~content.hooks['commit-msg'].indexOf('npx mantis c')) {
        content.hooks['commit-msg'] = `${content.hooks['commit-msg']} && npx mantis c`
    } else {
        return
    }
    fs.writeFile(hsy, JSON.stringify(content, null, 2), () => console.log(' Husky 配置完成'))
}
