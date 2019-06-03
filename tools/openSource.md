# 开源设计规范
## 1. 设计原则
    * 面向接口编程，接口与实现分离 ，一个接口可以有多种实现。
        * 每个实现必须有对应的接口，定义好接口后再开发。通过定义接口，规避了对单一外部系统的强依赖（例如，权限强依赖Kong；DNotebook强依赖K8s）
        * 便于我们自己针对客户需求定制化开发
        * 通过项目配置文件来选择具体的实现，简单便捷（例如：预留SSO、Docker编排等接口，通过配置文件来适配）
        * 后端实现方案：
            1. 基于python abc module @吴迪 牵头完善
        * 前端实现方案 必要性？ @俊宁 牵头完善（wiki地址：http://wiki.intra.xiaojukeji.com/pages/viewpage.action?pageId=192405534）（未完成）
    * 服务端尽可能通过HTTP API来实现能力的复用和扩展，允许用不同的开发语言来实现功能
        * 统一后端开发语言为Python只是方便我们团队自己开发、维护
        * 便于与客户已有的系统做集成：客户习惯的、已有的系统编程语言是多种多样的，我们无法约束
        * 服务端模块无需打包为pip包（若打包为pip也可以，不强制）：我们尽可能通过微服务/服务网格的形式来开发，而不是限定语言、紧耦合
        * 公共类库，以pip包的形式发布，便于不同模块引用。单独建立repo：woater-backend-common
    * 容器化
        * 前端项目整体作为一个Docker实例来部署（内置Nginx）
        * 后端项目每个模块单独编译为一个Docker实例
        * 配置文件与Docker镜像分离：启动Docker实例时，挂载配置文件
            1. 配置文件要是一个python文件，而不是JSON文件，可以获取Docker环境变量，进而使用不同的配置
        * 前后端都用Docker，方便CI/CD，也方便版本管理、回滚。服务器端编译，速度更快。
    * 模块化、插件化
        * 模块（module）：增减module需要重新编译。项目启动时，根据项目配置文件进行加载和初始化。
            1. 前端模块：
                * 以npm包的形式发布，可供其他前端模块引用。
                    * 可以避免重复造轮子，加快开发速度
                    * 提升维护效率，一些bugfix或者新特性直接在npm packages中更新，项目中只需要更新引用版本号即可，方便快捷。
                    * 每个module（模块化）、每个plugin（插件化）、每个component（组件化）都可以打一个npm包
                * woater官方开发的前端模块放在一个repo中，使用 https://lernajs.io/ 来管理多个packages。为了代码安全和保密性，也可以将个别模块的代码独立为一个repo.
                * 要提供module生成脚手架（脚手架工具打包到Docker开发环境中）
                * module按一级模块拆分
                * module内部的package，如果遇到其他模块需要共享，需要持续往公共库里面迁移（woater_frontend_common）
            2. 后端模块：
                * 同后端插件 （无需打包成pip包，不鼓励后端代码直接复用，这会限定后端开发语言，失去灵活性）
                * 因为后端模块不仅仅是代码，还涉及服务端环境，所以用Docker来将代码和环境一起打包会更好
                * Woater系统内部实现服务网格化改造，各模块尽可能通过HTTP API调用，避免直接import
                * 每个模块的后端部分单独一个git库，该git库可编译为一个Docker镜像。为其他后端服务提供Restful API. 与Docker一起提供的还有packages.json文件，用于描述Docker Http API地址等。
        * 插件（plugin）：增减plugin不需要重新编译。但plugin需要事先部署到服务器上。然后用户选择开启/禁用后，会立即生效。
            1. 前端插件：发布编译好的JS、CSS、图片？供主框架动态引用
                * 实现方案 @晓阳 牵头完善
            2. 后端插件：需要服务发现机制，可动态声明路由 (解决前端跨域访问)
    * 开发、测试环境标准化
        * 用Docker来“分发开发、测试环境”，将传统的本地执行的命令变更为docker run.... 好处有以下几点
            1. 真正跨操作系统，一键拥有相同的“环境”。对于新加入的开发同学非常友好。
            2. 将代码编辑器和环境解耦：让用户在本地只写代码（可使用习惯的IDE）
            3. 使用Docker作为“微开发环境”，很容易管控、审核package，避免每个同学自行增减或修改第三方packages及版本，导致包管理混乱。
            4. 统一前后端各自的开发环境、测试环境、部署环境（前端环境内置Nginx）。一个Docker镜像内置开发、测试、部署环境，通过环境变量来控制，提升CI/CD的效率。 docker run -p 80:80 -e "APP_ENV=dev" my-react-app 
            5. 实现方案
                * 前端Docker环境准备：@晓阳 牵头完善 前端docker
                    * 建立单独的git repo
                * 后端Docker环境准备：@灿军 牵头完善
                    * 建立单独的git repo
    * 前端架构选型&关键设计决定 @俊宁 牵头完善
        * 使用Context，去Redux?  wiki 地址：http://wiki.intra.xiaojukeji.com/pages/viewpage.action?pageId=192405451
    * 后端架构选型&关键设计决定 @吴迪 牵头完善  
## 2. 开发规范
    * 原则：规范要用工具来保证执行, 依靠工具让开发者来养成习惯，而不是依靠文档，可以将规范工具化的尽可能工具化。
    * 依赖规范（规定相关依赖及其版本）
        * 后端（软件/库/框架）@中强 牵头完善
            1. Python 3.7.2
            2. Tornado 5.1.1
            3. mysql-connector-python 8.0.13
            4. redis-3.2.0
            5. Kong 0.15.1
            6. python requirements.txt
            7. 教全的异步库： https://www.jianshu.com/p/4f667ecae64f
            8. IO-bound场景：Python异步使用trio https://github.com/python-trio/trio
        * 前端（库/框架）@俊宁 牵头完善
            1. React 0.18
            2. packages.json里面的 dependancy/devDependancy wiki地址：http://wiki.intra.xiaojukeji.com/pages/viewpage.action?pageId=192405091
    * Code Style
        * 前端： 需要确定最终的工具配置 @晓阳 牵头完善 前端CodeStyle工具
            1. 统一前端编程语言：TypeScript 3.2
            2. 使用TSLint检测
            3. VSCode配置
        * 后端：需要确定最终的工具配置 @中强 牵头完善   后端CodeStyle 规范工具
            1. 统一后端编程语言 Python 3.7.2
            2. 遵循PEP8 使用flake8(tornado也用它) 来检查
            3. PyCharm配置
        * 命名规范
            1. 不要以com.didi或者didi之类的公司名来命名包名、变量名，若需要组织名称来冠名，可统一用woater
            2. 前后端的变量名尽可能使用相同的翻译，具有统一化语义 （通过code review和代码分享会来把关、落实）
            3. 前端代码命名规范 
                * @义全 牵头完善 http://wiki.intra.xiaojukeji.com/pages/viewpage.action?pageId=190867612
            4. 后端代码命名规范
                * @吴迪 牵头完善
        * 注释规范
            1. 目标：规范代码注释，根据代码注释生成API文档
            2. 前后端通用：
                * Woater每个代码文件里面也要保护License声明: Copyright 2019 The Woater Authors.
            3. 前端代码注释规范 
                * @义全 牵头完善 http://wiki.intra.xiaojukeji.com/pages/viewpage.action?pageId=190867622
                    * 单行注释能否生成API文档？
            4. 后端代码注释规范
                * @吴迪 牵头完善
        * 异常处理规范
            1. 原则：
                * 要特别重视对于异常的捕获：尽可能降低局部错误，对整体的影响 （通过code review和代码分享会来把关、落实）
                * 错误码、错误消息统一 （通过code review和代码分享会来把关、落实）
    * 代码库管理方案
        * woater_docs ：包含每个模块的设计文档、二次开发文档（对可扩展点举例说明）、API/SDK文档、部署文档、使用文档 @中强 完善
            1. ￼
        * woater_backend_{module} 后端模块。初步限定为以下这些模块APIService、Alarm、init、sso、rbac、DCube、DFace、DMeta、DNotebook、DSQL、DStreaming 。分模块主要是为了保证代码安全，为实习生或新入职同学开放最小代码库权限。 @吴迪 源代码src目录规范完善   ￼
        * y
        * woater_frontend_{module} 本着最小权限原则，各个模块也分开代码库。在每个模块的内部可以管理多个packages。
        * woater_backend_common 后端公共类库，以pip包的形式发布，便于不同模块引用 @灿军 牵头完善
            * 公共类库的定位是一些工具类，对底层存储、计算、网络的处理逻辑抽象（相当于Paas层，对Iaas层进行封装；而各个模块则相当于saas层，实现具体的业务逻辑），通常不涉及具体的业务逻辑
        * woater_frontend_common 前端公共库，以npm包形式发布，便于不同模块引用 @俊宁 牵头完善（wiki：http://wiki.intra.xiaojukeji.com/pages/viewpage.action?pageId=192405091）
        * projectA_woater_frontend_deploy 项目A前端部署库（包含项目A定制化的配置文件、编译及部署脚本、及Docker生成目录）
            * 交付版本：要固定代码，不能和标准库同步。
            * 多个package在一个repo中
        * projectA_woater_backend_deploy 项目A后端部署库（包含项目A定制化的配置文件、编译及部署脚本、及Docker生成目录）
            * 交付版本：要固定代码，不能和标准库同步。
            * 多个package在一个repo中
        * projectA_woater_docs 针对项目A的定制化文档
* Git规范
    1. commit规范 @晓阳 牵头完善 http://wiki.intra.xiaojukeji.com/pages/viewpage.action?pageId=188297606
        * 统一用英文作为commit和注释 (英文不好的同学，写完中文后，用baidu翻译下)
    2. git协作流程要针对新的代码库管理规范进行修改
        * 前端Git协作流程 @晓阳 牵头完善
        * 后端Git协作流程 @吴迪 牵头完善
    3. 合并分支的管理制度：master分支由专人负责合并、回滚、上线
    4. 规范版本号和release记录
        * 根据commit信息自动生成changelog记录 @晓阳 牵头完善
* Web API规范
    1. @灿军 牵头完善 http://wiki.intra.xiaojukeji.com/pages/viewpage.action?pageId=190339943
* 日志规范
    1. log位置：Log默认输出到./log目录下，在启动配置中允许用户自定义
    2. Python的 logging 模块
    3. 以JSON形式写log
## 3.国际化方案
        * 原则：前后端各自实现国际化
        * 方案
            * 前端国际化方案：
                1. @晓阳 http://wiki.intra.xiaojukeji.com/pages/viewpage.action?pageId=190872988
            * 后端国际化方案：
                1. @中强 后端国际化方案
## 4.测试
        * 原则：
            * 添加测试，是实践CI的基础条件，也是提升代码质量的必要措施
            * 测试不是一蹴而就、一应俱全的，而是动态、持续的不断根据实际使用时发现的bug，慢慢集成进来的。类似复盘机制。——这是一个动态过程。
            * 平衡测试和开发的效率，只对关键类、方法写单测，不追求高"代码覆盖率"
        * 功能测试
            * 单元测试
                1. 前端：@义全 牵头完善
                    * 前端单元测试框架对比篇
                    * 前端单元测试操作篇
                2. 后端：@灿军 牵头完善
                    * python测试方案：使用Pytest  https://docs.pytest.org/en/latest/
                    * tornado测试：https://github.com/eugeniy/pytest-tornado
            * 集成测试
                1. API接口功能测试 @婷婷 牵头完善
                    * 实现方案：
                2. E2E自动化测试 @晓阳 牵头完善
                    * 目标：
                        * 研发环境，持续测试服务: 针对核心主流程，模拟用户真实的交互，减少重复工作
                        * 线上环境，核心功能巡检服务：可用于上线后的回归测试，提升测试效能、保障产品质量
                        * 私有部署环境，自动化验收工具
                    * 实现方案：https://github.com/alibaba/uirecorder + Docker
        * 性能测试
            * API接口性能测试 @中强 牵头完善
                1. 实现方案： 接口性能测试
            * 前端性能测试：@俊宁 牵头完善
                1. 实现方案：http://wiki.intra.xiaojukeji.com/pages/viewpage.action?pageId=192405761（未完成）
        * 安全测试（暂不考虑）
## 5.代码可维护性、可扩展性：
        * 原则:
            * 合理的组织，让开发者很容易可以找到他想要的功能对应的代码
            * 面向对象编程（避免函数式脚本文件）：使用公共可重载的父类，实现对应功能，便于用户自己进行二次开发
## 6.如何贡献
        * 目标：让开发者愿意贡献、容易上手
        * 贡献者指南 CONTRIBUTING.md 贡献者公约 http://contributor-covenant.org/  
## 7.设计规范 （视觉和交互设计）
    1. 各个模块都是在不同时期由不同UI设计师来设计的，开源需要提供统一风格的UI和交互体验
## 8.里程碑
    * 大家预估重构时间。只有预估时间，大家才会真的认真去思考很多细节问题。
    * 总体目标：8月底完成重构
