/**
 * 根据本项目需求,只有一个自定义参数,各参数互斥
 * 只有retry需要多个参数
 * 所以只需要验证第一个参数是否正确即可
 */
class ConsoleArg {
    constructor(desc, options, action) {
        const helpOption = {
            alias: ['h', 'H'],
            message: 'get help'
        }
        this.desc = desc;
        this.options = Object.assign({ help: helpOption }, options);
        this.action = action
        this.parsedOption = {};
        this.args = process.argv.slice(2)
    }

    getOption() {
        return this.parsedOption
    }

    start() {
        if (this.parse()) {
            this.execute();
        }
    }

    parse() {
        // 解析命令行参数,不赋值的参数赋值为true
        const args = this.args
        for (let i = 0; i < args.length; i++) {
            let value = null;
            const valueList = args[i].split("=");
            const key = valueList[0];

            if (valueList.length === 2) {
                value = valueList[1];
            } else {
                value = true;
            }
            try {
                const newKey = this.getRealKey(key)
                this.parsedOption[newKey] = value;
                // 如果配置了 可接受额外参数,后续参数不在检测且不放入this.parsedOption
                if (this.options[newKey].acceptExtra && i !== args.length - 1) {
                    this.parsedOption["@@extraArgs"] = args.slice(i + 1)
                    return true;
                }
            } catch (e) {
                this.print(`\x1b[31m  \`${key}\` 似乎不是有效的参数,你是不是指 \`${e.message}\` ? \x1b[39m`);
                return false;
            }
        }
        return true
    }

    execute() {
        try {
            if (this.action) {
                if (this.parsedOption.help) {
                    return this.getHelp()
                }
                return this.action(this.parsedOption, this.args)
            }
        } catch (e) {
            this.print('\n\n\x1b[31m  出错啦,请确认后重试 \x1b[39m \n\n')
            this.print(e)
        }
    }

    getRealKey(key) {
        if (this.options.hasOwnProperty(key)) {
            return key
        }
        const correctOption = Object.entries(this.options).find(([k, v]) => {
            const { alias } = v
            if (!Array.isArray(alias) || !alias.includes(key)) {
                return false
            }
            return true
        })
        if (Array.isArray(correctOption) && correctOption.length > 0) {
            return correctOption[0]
        }
        throw new Error(this.getSuggestions(key))
    }

    getSuggestions(input) {
        const options = Object.keys(this.options)
        // 获取建议
        return getSimilarText(input, ...options).join(" ")
    }

    getHelp() {
        const keys = Object.keys(this.options)
        const maxLen = Math.max(...keys.map(v => v.length)) + 5
        const helpText = keys.map(v => `${v.padStart(maxLen, ' ')}: ${this.options[v].message}`)
        this.print(`${this.desc}\n\n${helpText.join('\n')}`)
    }

    print(text) {
        // TODO: error时添加更多的堆栈细节?
        console.log(text)
    }

}

// utils
// 编辑距离算法
function getSimilarDistance(s1, s2) {
    const len1 = s1.length
    const len2 = s2.length
    // 创建矩阵
    const matrix = []
    // 构造二维矩阵
    for (let i = 0; i <= len1; i++) {
        matrix[i] = new Array()
        for (let j = 0; j <= len2; j++) {
            if (Math.min(i, j) === 0) {
                matrix[i][j] = Math.max(i, j)
            } else {
                // 进行最小值分析       
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + Number(s1[i - 1] !== s2[j - 1])
                )
            }
        }
    }
    return matrix[len1][len2] //返回矩阵右下角的值,即编辑距离,值越小,越相似
}

function getSimilarText(text, ...textPool) {
    const similarDistanceMap = textPool.reduce((m, t) => {
        const distance = getSimilarDistance(text, t).toString()
        if (Array.isArray(m[distance])) {
            m[distance].push(t)
        } else {
            m[distance] = [t]
        }
        return m
    }, {})

    return similarDistanceMap[Math.min(...Object.keys(similarDistanceMap)).toString()]
}


module.exports = {
    ConsoleArg
}
