#!/usr/bin/env node

module.exports = (message, fromRetry) => {
    const PATTERN = /^\w+(\([a-zA-Z1-9\/]*#\d+\))?:\s.+/
    const MERGE_COMMIT_PATTERN = /^Merge /
    if (message.match(MERGE_COMMIT_PATTERN) || message.match(PATTERN)) {
        return
    }
    if (fromRetry) {
        console.error('\x1b[31m 存储的message格式有误,建议使用`npx mantis/npx mt`重新提交 \x1b[39m')
    } else {
        console.error('\x1b[31m message格式有误,建议使用`npx mantis/npx mt`提交 \x1b[39m')
    }
    process.exit(1)
}

