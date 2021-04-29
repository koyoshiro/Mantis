# CI/CD
    
1. 从个人仓库merge到组仓库的业务分支
    - ut 
    - tslint/eslint
    - 自动发布
    
2. 仓库的业务分支merge到dev分支
    - ui test
    - ut 
    - tslint/eslint
    - 自动发布
    
3. dev分支merge到pre分支
    - ui test
    - ut 
    - tslint/eslint
    - 自动发布
    
4. pre分支merge到prod分支
    - ui test
    - ut 
    - tslint/eslint
    - 检测新版本并新建新版本的dev、pre、prod分支
    - 自动发布

**注：自动发布是由mcd触发，如果在发布单没有设置自动发布，是不会自动发布** 
