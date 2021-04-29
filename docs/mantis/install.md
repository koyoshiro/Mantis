# 安装
**目前安装只支持`linux`/`mac os`**

执行命令`
curl 10.32.164.25:9527/setCICD.sh > setCICD.sh && curl 10.32.164.25:9527/modifyPackageJson.js > modifyPackageJson.js && sh setCICD.sh`
此命令会快速创建`ci/cd`和`mantis`配置

执行完之后根据需要修改以下内容
```json
{
    "script":{
      "cicdtest": "", // 一般为 jest --coverage --silent -w 1
      "cicdlint": "" // 一般为 eslint './src/**/*.{ts,tsx,js,jsx}
    },
    "devCIConfig": {
      "appType": "trip" // 主板的名称 <trip|ctrip|wx> 分别为 <trip主板｜携程中文主板｜微信小程序>
    },
    "mantisConfig": {
      "staticLintCMD": "<lint command>" | ['<lint command>','ut command'] // commit之前执行,支持工具链
    }
}


```
下面为仅使用`mantis`不使用`ci/cd`时，手动配置方式
1. `npm i -D @ctrip/mantis`
2. 在项目的`package.json`中写入（可选，比如你需要在commit之前code lint、ut）
```json
{
    "mantisConfig": {
      "staticLintCMD": "<lint command>" | ['<lint command>','ut command'] // 支持工具链
    }
}
```
