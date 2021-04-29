const fs = require('fs')
const findConfig = require('find-config')

function readMsg() {
    try {
        const message = fs.readFileSync(findConfig("COMMIT_EDITMSG", { dir: '.git' })).toString()
        return message
    } catch (e) {
        return null
    }
}

module.exports = {
    readMsg
}