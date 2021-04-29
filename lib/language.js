module.exports = {
    chinese: {
        choices: {
            feat: {
                description: '产品需求',
                title: '需求'
            },
            fix: {
                description: 'bug修复',
                title: 'bug修复'
            },
            docs: {
                description: '添加/完善文档',
                title: '文档'
            },
            refactor: {
                description: '修改代码结构',
                title: '代码重构'
            },
            test: {
                description: '添加/修改测试用例',
                title: '测试用例'
            },
            build: {
                description: '打包/发布',
                title: '打包'
            },
            revert: {
                description: '撤回一个过往的提交',
                title: '撤回'
            }
        },
        type: '修改类型，从以下选项中选择最符合的一项：\n',
        scope: '本次提交影响的范围 (可选):\n',
        issue: '本次提交影响的issue (可选):\n',
        subject: '主题，简要描述本次提交的内容:\n',
        version: '版本号 (可选):\n',
        body: '本次提交主要内容 (可选) 。使用 "|" 换行:\n',
        confirmCommit: '确认使用上述的message',
        confirmList: ['确认', '取消'],
        usePrevMsg: '是否使用上次commit信息',
        choiceList: ['确认使用', '新建信息']
    },
    english: {
        choices: {
            feat: {
                description: 'A new feature',
                title: 'feature'
            },
            fix: {
                description: 'A bug fix',
                title: 'fix'
            },
            docs: {
                description: 'Documentation only changes',
                title: 'docs'
            },
            refactor: {
                description: 'A code change that neither fixes a bug or adds a feature',
                title: 'refactor'
            },
            test: {
                description: 'Add missing testing',
                title: 'test'
            },
            build: {
                description: 'Build a package',
                title: 'build'
            },
            revert: {
                description: 'Revert a history committed',
                title: 'revert'
            },

        },
        type: 'Select the type of change that you are committing：\n',
        scope: 'What is the scope of this change (please enter to skip):\n',
        issue: 'What is the issue of this change? #issueNo (please enter to skip)\n',
        subject: 'Write a short, imperative tense description of the change:\n',
        version: 'What is the version of this change (please enter to skip):\n',
        body: 'Provide a longer description of the change, use "|" newline (press enter to skip):\n',
        confirmCommit: 'Confirm the above information',
        confirmList: ['Sure', 'Cancel'],
        usePrevMsg: 'Use the last commit message? Y/N',
        choiceList: ['reuse', 'build new message']
    }
};
