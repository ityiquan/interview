# 学习 - git
	用git reflog查看命令历史，以便确定要回到未来的哪个版本。
	场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令git checkout -- file。
	场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令git reset HEAD file，就回到了场景1，第二步按场景1操作。
	git merge命令用于合并指定分支到当前分支。
	当手头工作没有完成时，先把工作现场git stash一下，然后去修复bug，修复后，再git stash pop，回到工作现场。

	关于tag
		命令git tag <name>用于新建一个标签，默认为HEAD，也可以指定一个commit id；
		git tag -a <tagname> -m "blablabla..."可以指定标签信息； 		命令git tag可以查看所有标签。
		命令git push origin <tagname>可以推送一个本地标签； 		命令git push origin --tags可以推送全部未推送过的本地标签； 		命令git tag -d <tagname>可以删除一个本地标签； 		命令git push origin :refs/tags/<tagname>可以删除一个远程标签。 
 

## 1.常用命令
	git status 查看当前分支(或主干)内有哪些文件
	git add (filename或者用.表示全部) 将文件从工作区提交到暂存区(staged)
	[master] 主干  
	红色的表示工作区，绿色的表示暂存区
	git commit -m ‘添加注释’将文件从暂存区提交到版本库
	git commit -a -m ’添加注释’ 直接把工作区的文件添加到版本库
	git log 查看提交历史(按回车查看更多log，按Q退出log)
	git reset HEAD filename 将文件从暂存区撤回工作区
	git checkout - - filename 将工作区的修改还原回之前版本区状态
	git commit -m ’添加注释’   - -amend 撤销上次的提交

## 2.文件删除操作	
	git rm filename 工作区内文件已经删除时，该命令可删除暂存区内对应文件 
	git rm -f filename 删除工作区和暂存区内对应文件
	 git rm - -cached filename 只删除暂存区不删除工作区内的盖文件

## 3.文件(版本)恢复操作
	文件还原－先通过git log找到commit后面跟着的commit id，输入git checkout +commit id就可恢复到该id对应的文件
	版本还原－git reset - -head +commit id 还原到commit id对应的版本
	HEAD指针操作回到上一个或下一个版本
		git reset - -hard HEAD~2 回退两个版本
		git reset - -hard HEAD^回到上一个版本
		git reflog 记录每次的操作行为，找到想回到的对应版本的commit id，再通过git reset - -hard +commit id回到该版本

### 3.1 
	git diff 查看文件差异(工作区和暂存区文件的差异对比)	
	git diff - -cached(- -staged) 查看暂存区与版本库之间的文件差异
	git diff master(分支名字) 查看工作区和版本库之前的文件差异
	

## 4.同步到远程仓库
 	git push origin master上传到远程仓库
	git config - -global user.name ‘输入名字’  
	git config - -global user.email ‘输入email’  修改git工具下的登录人
	git remote 查看远端名字(如origin)
	git push (远端名字) master 提交到对应远端的主分支 

## 5.多人协作解决冲突	
	同步更新远端代码，
		git fetch 拉取远端代码
			git diff master origin/master查看远端代码雨本地代码到冲突(即差异)
			git merge合并到本地分支	
		之后再通过 git commit -a -m ‘添加注释’提交到代码库，再git push origin master 提交到远端
	或者通过git pull 直接拉取远端代码并合并到本地代码

### 5.1因本地修改导致代码git pull失败的时候错误提示：
	Your local changes to the following files would be overwritten by merge，Please, commit your changes or stash them before you can merge
	如果希望保留生产服务器上所做的改动,仅仅并入新配置项, 处理方法如下:	
	git stash
	git pull
	git stash pop
然后可以使用Git diff -w +文件名 来确认代码自动合并的情况.
反过来,如果希望用代码库中的文件完全覆盖本地工作版本. 方法如下:
	git reset --hard
	git pull
其中git reset是针对版本,如果想针对文件回退本地修改,使用
	
## 6.分支
	git branch 查看当前分支，当前属于那个分支，那个分支前面带个＊
	git branch +name 创建一个分支
	git checkout +name 切换到name分支
	git checkout master 切换回主分支
	
	git checkout -b name 创建一个name分支并且切换到name分支
	

### 常用命令
	git status
	git commit -a -m ‘添加注释’
	git merge name 将name分支合并的master分支上
	
	git branch - -merged
		查看主分支下已经合并了的分支
	git branch - -no-merged
		查看主分支下还未合并的分支
	git branch -d name
		删除name分支(如果name分支还未合并到主分支，不允许删除)
	git branch -D name
		删除name分支(不管分支是否已经合并，直接删除)
	
## 7.分支合并(处理冲突)
	git merge 
		如果有存在冲突的文件，会有merge conflict in name提示，也可以通过git status查看冲突
	打开文件看到冲突部分不同版本的代码，删除一种解决冲突后，再通过 git commit -a -m ‘添加注释’提交代码

## 8.打标签
	git tag 查看当前所有的标签
	git tag name(v1.0) 添加一个标签


## 9.fork镜像项目，修改后 pull request 发修改和表述给原来的项目

## 10.
	git checkout 进入到分支模式
	mkdir name 创建name文件夹
	notepad hello.txt 创建并打开txt
	安装vim本地编辑器，代替记事本
	安tab键自动补全
	git config —global alias.co checkout 给checkout设置别名为co
	git config —list 打印出所有设置的别名

## 11.百度代码提交流程
	git pull origin dev 从code上的dev分支拉下origin项目(origin为默认名字)
	本地开发完成后 git add . 提交到暂存区
	通过 git commit -m ’添加注释’ 提交到本地代码库
	然后再git pull origin dev 拉一下线上代码避免冲突
	然后 git push origin HEAD:refs/for/dev 将项目上传到icode上
	进入icode.baidu.com进入项目，进入评审，查看代码是否有问题，有问题的话，对应修改后再重新从git add .  开始走流程
		
	
	
	