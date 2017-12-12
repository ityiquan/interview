## 状态管理mobx
    mobx 是一个库 (library)，不是一个框架 (framework)。他不限制如何组织代码，在哪里保存 state 、如何处理事件，怎么发异步请求等等,可以和任意类库组合使用。
   
### 为什么要用Mobx
    简单, 方便的状态管理库,没有 connect，没有 cursor，没有 Immutable Data ... 总之感觉会少很多代码。同时概念也更少。
    对于组织复杂的领域模型, 可以用 class 来组织和修改数据
    Mobx 会建立虚拟推导图 (virtual derivation graph)，保证最少的推导依赖, 性能相比 redux 有优势. dan_abramov 亲自操刀为 todoMVC 做了极致的优化才和 mobx 打成平手
    
    
### 与Mobx相关的几个概念 Observable State, Derivations, Actions和 Reactions。
    
    Observable State: 驱动应用的数据. 当前用的最多的是 state change -> view change
    Derivations: 任何因为state的改变而改变的东西. 分为两类:Computed values 和 Reactions
    Actions: 一系列修改state的行为, 包括事件, 后台数据填充等。
    
    形象类比. Mobx == Excel 表格
        state，它可以是一个object，array，primitives等等任何组成你程序的部分。你可以把这个想象应用程序的“单元格”。
        Derivations，一般它是指可以从 state 中直接计算的来的结果。比如未完成的任务的数量，这个比较简单，也可以稍复杂一些比如渲染你的任务显示的html。它类似于应用程序中的“公式和图表”。
        Reactions 和 Derivations 很像，主的区别在于 Reactions 并不产生数据结果，而是自动完成一些任务，一般是和 I/O 相关的。他们保证了 DOM 和 网络请求会自动适时地出发。
        Actions。Actions 指的是所有会改变 State 的事情，MobX 保证所有 Actions 都会有对应的 Derivations 和 Reactions 相伴，保证同步。
        
### 解决 state 到 view 的数据更新问题。

### 坑

    1.mobx obserable 一个对象, 如果这个对象后面新增了的属性, 该属性不会被监控到, 要监控, 需要使用extendObserable 方法
    2.被 computed 包装过的对象或者值， 每一次里面有值变了，只要返回出来的结果不变，就不会触发 rerender
    3.已知的问题 : Mobx 的 Array 过不了 PropTypes.Array
    
### Mobx 槽点   

    需要了解 What does MobX react to 否则可能踩坑
    浏览器兼容性，不支持 IE8
    mobx-react 的组件, 尽可能不要定义 componentShouldUpdate 的生命周期检查
    
    
    
    
    
    