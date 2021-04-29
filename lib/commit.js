const questions = require('./questions')
const buildCommit = require('./buildCommit')
const getConfig = require('./getConfig')
const config = getConfig()

module.exports = {
    prompter: function (cz, commit) {
        const language = require('./language')
        language.type = config.language
        if (!language.type || !language[language.type] || !language[language.type].choices) {
            language.type = 'english'
        }
        const askForMessage = () => {
            cz.prompt(questions.getQuestions(language[language.type].choices, language[language.type]))
                .then(function (answers) {
                    if (answers.confirmCommit === language[language.type].confirmList[0]) {
                        // 提交
                        commit(buildCommit(answers))
                    } else {
                        console.log('已取消提交!')
                    }
                })
        }
        askForMessage()
    }
}
