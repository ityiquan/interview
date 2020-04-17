### 经典Gitflow协作流程
#分支部署
    * 生产服务器：部署production分支
    * 开发服务器：部署master分支
    * 测试服务器：部署release分支
    production 分支
        production 永远处于稳定状态，这个分支代码可以随时用来部署。不允许在该分支直接提交代码。
    master 分支
        开发分支，包含了项目最新的功能和代码，所有开发都在 master 上进行。一般情况下小的修改直接在这个分支上提交代码。
    feature 分支(用于功能模块或新版本的开发)
        如果要改的一个东西会有比较多的修改，或者改的东西影响会比较大，请从 master 分支开出一个 feature 分支，分支名约定为feature/xxx（可以是模块名称），开发完成后合并回 master 分支，相应的操作如下：
        ```
        $ git checkout -b feature/xxx master
        ```
## 写代码，提交，写代码，提交。。。
## feature 开发完成，合并回 master
    ```
    $ git checkout master
    ```
## 务必加上 --no-ff，以保持分支的合并历史
    $ git merge --no-ff feature/xxx 
    如果想要当前分支能保持与 master 的更新，请用 rebase，操作如下：
## 假设当前在 feature/xxx 分支
$ git rebase master
rebase 会修改历史，如果你的 feature 分支是跟人合作开发的，请互相做好协调。
release 分支
当 master 上的功能和 bug 修得差不多的时候，我们就要发布新版本了，这个时候从 master 分支上开出一个 release 分支，来做发布前的准备，分支名约定为release/v1，主要是测试有没有什么 bug，如果有 bug 就直接在这个分支上修复，确定没有问题后就会合并到 production 分支。相应操作如下：
$ git checkout -b release/v1 master
## 修复 bug、检查没问题后合并到 production 分支并删除
    ```
    $ git checkout production
    $ git merge --no-ff release/v1
    为了让 release 分支上 bug 修改作用到 master 分支，我们还需要把这个 release 分支合并回 master 分支：
    $ git checkout master
    $ git merge --no-ff release/v1
    ```
## 到此，这个 release 分支完成了它的使命，可以被删除了
    ```
    $ git branch -d release/v1
    hotfix 分支
    如果我们发现线上的代码（也就是 production）有 bug，但是这个时候我们的 master 上的有些功能还没完成，还不能发布，这个时候我们可以从 production 分支上开出一个 hotfix 分支（记住：直接在 production 上提交代码是不允许的！），分支名约定为hotfix/xxx，在这个分支上修改完 bug 后需要把这个分支同时合并到 production 和 master 分支。相应操作如下：
    $ git checkout -b hotfix/xxx production
    ```
## 修完 bug 后
    ```
    $ git checkout production
    $ git merge --no-ff hotfix/xxx
    $ git checkout master
    $ git merge --no-ff hotfix/xxx
    ```
## hotfix 分支完成使命
    $ git branch -d hotfix/xxx
    例外：当 hotfix 分支完成，这个时候如果有 release 分支存在，那么这个 hotfix 就应该合并到 release，而不是 master 分支。

## 经典Gitflow
    ```
    (1) master分支存储了正式发布的历史（master分支上的所有提交都会分配一个版本号）
    (2) develop分支作为功能的集成分支
    (3) 每个新功能位于一个自己的Feature分支，该分支使用develop分支作为父分支。当新功能完成时，合并回develop分支。新功能提交应该从不直接与master分支交互
    (4) 一旦develop分支上有了做一次发布（或者说快到了既定的发布日）的足够功能，就从develop分支上fork一个release分支。
    新建的分支用于开始发布循环，所以从这个时间点开始之后新的功能不能再加到这个分支上。 这个分支只应该做Bug修复、文档生成和其它面向发布任务。
    对外发布的工作完成后，发布分支会合并到master分支并分配一个版本号打好Tag。另外，这些从新建发布分支以来的做的修改要合并回develop分支。
    (5) hotfix分支用于生成快速给产品发布版本（production releases）打补丁，修复完成，修改应该马上合并回master分支（打好Tag）和develop分支（当前的发布分支）。
    ```

 git pull完后，你发现这次pull下来的修改不满意，想要回滚到pull之前的状态，我们可以执行git reset --hard ORIG_HEAD，但是这个命令有个副作用就是清空你的工作区，即丢弃你的本地未add的那些改变。
为了避免丢弃工作区中的内容，可以使用git reset --merge ORIG_HEAD，注意其中的--hard 换成了 --merge，这样就可以避免在回滚时清除工作区。
