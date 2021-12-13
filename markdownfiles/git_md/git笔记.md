# git
## 查看git版本
- windows鼠标右键选择 Git Bash Here
- git version

## 使用前配置
1. 配置提交人姓名 `git config --global user.name 提交人姓名`
2. 配置提交人姓名 `git config --global user.email 提交人邮箱`
3. 查看git配置信息 `git config --list`  

**注意**
1. 如果对配置信息进行修改，重复命令
2. 配置只需要执行一次
3. windows下查看配置信息 `C:/Users/xx用户/.gitconfig`

## 提交步骤
1. `git init` 初始化git仓库
2. `git status` 查看文件状态
3. `git add 文件列表` 追踪文件
4. `git commit -m 提交信息` 向仓库中提交代码
5. `git log` 查看提交记录

## 撤销
- 用暂存区中的文件覆盖工作目录中的文件 `git checkout 文件名称`
- 将文件从暂存区删除 `git rm --cached 文件名称`
- 将git仓库中的指定的记录恢复出来，饼覆盖暂存区和工作目录 `git rest --hard 提交生成的id` 
**注意**
提交生成的id可以通过`git log`查看

## 分支
- `git branch` 查看分支
- `git branch 分支名称` 创建分支
- `git checkout 分支名称` 切换分支
- `git merge 分支名称` 合并分支
- `git branch -d` 删除分支
- `git branch -D` 强制删除

**注意**
- 创建分支时,在该分支上添加的文件只能在该分支显示;合并主分支后才在主分支可以看到
- 合并分支时，切换主分支master在合并分支
- 分支未合并,删除分支默认是不允许的
- 合并分支后,在删除分支,合并的提交文件是存在的
- 分支未合并，使用强制删除是可以的删除的，但是该分支的所有文件也都删除


# github
## git推送到github

### 直接推送
- 新建github仓库
- `git push 远程仓库地址 分支名称` 推送到仓库

**注意**
- 第一次推送,输入用户名密码，windows会自动记住。凭据在`控制面板\所有控制面板项\凭据管理器`查看

### 使用别名推送
- 新建github仓库
- `git remote add 别名 远程仓库地址` 为远程仓库添加别名
- `git push 别名 分支名称` 使用别名推送

### 使用git push推送
- 新建github仓库
- `git remote add 别名 远程仓库地址` 为远程仓库添加别名
- `git push -u 别名 分支名称` 记住当前别名和分支,并且推送
- 下次只需要使用`git push`就可推送到仓库

**注意**
- 别名可以取origin

## 克隆github仓库
- `git clone 远程仓库地址`

## github添加成员开发


## 拉取代码
- `git pull 远程仓库地址 分支名称`
**注意**
- 远程仓库版本比本地高,无法提交代码,必须先拉取代码，在提交

## 解决冲突
- 程序员B先拉取A程序员代码,然后在修改提交

## git忽略清单
- 在项目中新建.gitignore文件
- 在.gitignore文件中写上你要忽略的文件名称
- `git status`查看下文件状态
- `git add .` 工作目录中全部文件添加到暂存区

# github添加注释
- 添加readme.md文件



