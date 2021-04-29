const questions = require('./questions')
const getConfig = require('./getConfig')
const { readMsg } = require('./localStorage')
const config = getConfig()

module.exports = {
    prompter: function (cz, commit) {
        const { run } = require('../bin')
        const language = require('./language')
        language.type = config.language
        if (!language.type || !language[language.type] || !language[language.type].choices) {
            language.type = 'english'
        }
        const message = language[language.type];
        const prevCommitMsg = readMsg()
        // 询问是否需要复用commitmsg
        if (prevCommitMsg) {
            cz.prompt(questions.usePrevMsg(message, prevCommitMsg))
                .then((answers) => {
                    if (answers.usePrev === message.choiceList[0]) {
                        commit(prevCommitMsg)
                    } else {
                        // 不复用
                        run()
                    }
                })
                .catch((e) => {
                    console.error("mantis似乎有些问题，请联系leijiang\n", e)
                    run()
                })
        } else {
            console.error("未能找到历史记录！\n")
            run()
        }
    }
}
