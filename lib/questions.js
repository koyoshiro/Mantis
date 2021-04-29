'use strict';
const buildCommit = require('./buildCommit');

module.exports = {
    usePrevMsg: function (language, msg) {
        const questions = [
            {
                type: 'list',
                name: 'usePrev',
                choices: language.choiceList,
                message: function () {
                    const SEP = '###--------------------------------------------------------###';
                    console.log('\n' + SEP + '\n\n' + msg + '\n' + SEP + '\n');
                    return language.usePrevMsg;
                }
            }
        ]
        return questions;
    },
    getQuestions: function (choices, language) {
        // normalize config optional options
        const messages = {};
        messages.type = language.type;
        messages.scope = language.scope;
        messages.issue = language.issue;
        messages.subject = language.subject;
        messages.version = language.version;
        messages.body = language.body;
        messages.confirmCommit = language.confirmCommit;
        messages.confirmList = language.confirmList;

        const TagChoiceArray = Object.keys(choices).map(function (key) {
            return {
                name: `${choices[key].title}(${choices[key].description})`,
                value: key
            };
        });

        const questions = [
            {
                type: 'list',
                name: 'type',
                message: messages.type,
                choices: TagChoiceArray
            },
            {
                type: 'input',
                name: 'scope',
                message: messages.scope
            },
            {
                type: 'input',
                name: 'issue',
                message: messages.issue
            },
            {
                type: 'input',
                name: 'subject',
                message: messages.subject,
                validate: function (value) {
                    return !!value;
                },
                filter: function (value) {
                    return value.charAt(0).toLowerCase() + value.slice(1);
                }
            },
            // {
            //     type: 'input',
            //     name: 'version',
            //     message: messages.version
            // },
            {
                type: 'input',
                name: 'body',
                message: messages.body
            },
            {
                type: 'list',
                name: 'confirmCommit',
                choices: messages.confirmList,
                message: function (answers) {
                    const SEP = '###--------------------------------------------------------###';
                    console.log('\n' + SEP + '\n\n' + buildCommit(answers) + '\n' + SEP + '\n');
                    return messages.confirmCommit;
                }
            }
        ];

        return questions;
    }
};
