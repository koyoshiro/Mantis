const findConfig = require('find-config')

function f() {
    let config = {}
    return function () {
        if (!config || Object.keys(config).length === 0) {
            const pkg = findConfig('package.json', {home: false})
            config = require(pkg)['mantisConfig'] || {}
        }
        return config
    }
}

module.exports = f()
