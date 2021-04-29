# Introduction
Msg formatting tool for git-commit based on Commitizen.

And you could check your committing files when pre-commit.

# Installation

1. edit package.json.

**Add content to the relevant location of the file,not replace package.json**

```js
"mantisConfig": { // if you want to use eslint/tslint
    "staticLintCMD": "<tslint ./eslint .>" // lint command,if you want to use
  }
```

2. install or update

```js
npm install
```

3. if you want to use lint-staged create file`.lintstagedrc.json`in `./` and add it.

```js
{
    "src/*.js": [
        "prettier --write", // if use prettier
        "commitmsg",
        "git add"
        // able to add some commands,like jest
        ]
}
```


# Usage
use `mantis` replace `git commit`

![img](./doc/command.jpg)

# Todo List

## pre-commit check

- [X] husky
- [X] commit-lint
- [X] lint-stage
- [X] prettier
- [x] TSLint/ESLint
- [ ] valid input

## multi-language

- [X] Chinese Language Config
- [X] English Language Config


**执行install时，会安装commit-msg勾子，用于强制检测commit message，并推荐mantis，其他的勾子会在执行mantis执行**
