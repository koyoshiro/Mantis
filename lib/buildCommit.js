'use strict'
const wrap = require('word-wrap')
const getConfig = require('./getConfig')

module.exports = function buildCommit(answers) {
    const config = getConfig()
    const maxLineWidth = 100
    const wrapOptions = {
        trim: true,
        newline: '\n',
        indent: '',
        width: maxLineWidth
    }

    function addSubject(subject) {
        return subject.trim()
    }

    function addIssueNo(issueNo) {
        if (!issueNo) {
            return ''
        }
        const pmProject = config.pmProject || '';
        if (issueNo.substr(0, 1) === '#') {
            return `(${pmProject}${issueNo.trim()})`
        }
        return `(${pmProject}#${issueNo.trim()})`
    }

    function escapeSpecialChars(result) {
        const specialChars = ['`']
        specialChars.map(function (item) {
            result = result.replace(new RegExp(item, 'g'), '\\\\`')
        })
        return result
    }

    function generateKeyInfo(answers) {
        return `Scope Version:${answers.version || 'unknown'} \n Scope:${answers.scope || 'unknown'} \n`
    }

    const head = `${answers.type}${addIssueNo(answers.issue)}: ${addSubject(answers.subject)}\n`
    // Wrap these lines at 100 characters
    let body = wrap(answers.body, wrapOptions) || ''
    body = body.split('|').join('\n')

    let result = head
    if (body) {
        result += `\n ${generateKeyInfo(answers)} \n ${body}`
    }
    return escapeSpecialChars(result)
}
