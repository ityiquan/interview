
### 单体模式
    
#### 解决的问题：针对一个类只创建一个对象。

#### 实现：第一次调用，创建一个私有instance指向的对象，以后调用，返回该私有变量

```javascript
var Universe
(function(){
    var instance;
    
    Universe = function Universe(){
        if(instance){
            return instance;
        }
        
        instance = this;
        
        //添加所有功能
        this.name = Mr.Wang';
        this.age = 18
    }
}))()
```
### 工厂模式

##### 解决的问题：根据字符串指定的类型在运行时创建对象的方法

##### 方案：通过工厂方法（或类）创建的对象在设计上都继承了相同的父对象这个思想，它们都是实现专门功能的特定子类。

```javascript
// 父构造函数
function CarMaker(){
    // 父函数公共方法
    CarMaker.prototype.drive = function(){
        return "Vroom, I have '+this.doors+' doors"
    }
    // 静态工厂方法
    CarMaker.factory = function(type){
        var constr = type,
            newcar;
        // 如果构造函数不存在，抛错
        if(typeof CarMaker[constr] !== 'function'){
            throw{
                name: 'Error',
                message: constr + 'does not exist'
            }
        };
        // 使用子类原型继承父类原型,该if判断表示只继承一次
        if(typeof CarMaker[constr].prototype.drive !== 'function'){
            CarMaker[constr].prototype = new CarMaker();
        }
        // 创建并返回一个实例
        newcar = new CarMaker[constr]();
        return newcar;
    }
    // 定义特定的子类
    CarMaker.a = function(){
        this.doors = 1;
    }
    CarMaker.b = function(){
        this.doors = 2;
    }
    CarMaker.c = function(){
        this.doors = 3;
    }
}
// 调用
var a = CarMaker.factory('a');
```

### 迭代器模式

##### 解决的问题：提供一个api来遍历或操纵复杂的数据结构

##### 思想：迭代器模式对象提供next()方法，调用返回当前指针元素并指针增加指定位数，hasNext()方法，判断是否到底，是否还有下一个。current()返回当前指针元素，不增加指针位。rewind()重置指针到初始位置。

```javascript
var Iterator = (function(){
    var index = 0,    // 指针
        data = [1,2,3,4,5],   // 复杂数据结构
        length = data.length;

        return {
            next: function(){
                var element;
                if(!this.hasNext()){
                    return null;
                }
                element = data[index];
                index = index + 1;
                return element;
            },
            hasNext(): function(){
                return index < length;
            },
            rewind: function(){
                index = 0;
            },
            current: function(){
                return data[index];
            }
        }
})();

```

### 装饰者模式

##### 解决的问题： 通过从预定义装饰者对象中添加功能，从而在运行时调整对象。

##### 方案：附加功能的可定制和可配置特性，可以从只有最基本的功能的普通对象开始，然后从可用的装饰资源池中选择需要用到的附加功能，并按添加顺序进行装饰（如果装饰顺序很重要的话）。

```javascript
function Sale(price){
    this.price = (price > 0) || 100;
    this.decoratorList = []; 
}
// 可用的装饰资源池
Sale.decorators = {};
Sale.decorators.fedtax = {
    getPrice:function(price){
        return price+ price*5/100;
    }
}
Sale.decorators.quebec = {
    getPrice:function(price){
        return price+ price*7.5/100;
    }
}
Sale.decorators.money = {
    getPrice:function(price){
        return '$' + price.toFixed(2);
    }
}
Sale.prototype.decorate = function(decorator){
    this.decoratorList.push(decorator)
};
// 调用getPrice并作为参数传给下一个装饰器
Sale.prototype.getPrice = function(){
    var price = this.price,
    i,
    max = this.decoratorList.length(),
    name;

    for(i=0; i<max; i +=1){
        name = this.decoratorList[i];
        price = Sale.decorators[name].getPrice(price);
    }
    return price;
 }

```

### 策略模式（校验）

#####  解决的问题：在选择最佳策略以处理特定任务（上下文）的时候仍然保持相同的接口

##### 方案：创建一个具有validate()方法的校验证器（validator）对象，验证器将选择最佳策略（strategy）以处理任务，并将具体的数据验证交给适当的算法（函数）。

```javascript
// 待校验的数据
var data = {
    name: 'aa',
    age: 18,
}
// 核心validator对象
var validator = {
    // 所有可用的检查
    types:{ 
        isNoEmpty: {
            validate: function(value){
                return value !== '';
            },
            instructions: 'the value cannot be empty'
        },
        isNumber: {
            validate: function(value){
                return !isNaN(value)
            },
            instructions: 'the value can only be a valid number, eg:1,2,3'
        }
    },
    // 校验失败的错误信息
    messages: [],

    // 当前验证的配置
    config: {
        name: 'isNoEmpty',
        age: 'isNumber',
    },
    // 校验核心方法
    validate: function(data){
        var i, msg, type, checker, result_ok;
        // 重置错误提示信息
        this.messages = [];
        for( i in data){
            if(data.hasOwnProperty(i)){
                type = this.config[i];
                checker = this.types[type];
                if(!type){
                    continue // 不需要验证
                }
                if(!checker){ // 无该类型校验算法
                    throw {
                        name: 'validationError',
                        message: 'No handler to validate type' + type
                    };
                }
                result_ok = checker.validate(data[i]);
                if(!result_ok){
                    msg = "Invalid value for * ' + i + '*" + checker.instructions;
                    this.messages.push(msg); 
                }
            }
        }
        return this.hasErrors();
    },
    // 帮助程序
    hasErrors: function(){
        return this.messages.length !== 0;
    }
}
```
### 外观模式

##### 解决问题:通过把常用方法包装到新方法中，从而提供一个更有利的api.可用于代码重构,也非常适合浏览器兼容性处理，据此可将浏览器之间的差异隐藏在外观函数内。

#####  实现:创建方法包装重复调用的方法，并处理兼容性
 
```javascript
var myEvent = {
    stop: function(e){
        // Chrome FF
        if(typeof e.preventDefault === 'function'){
            e.preventDefault();
        }
        if(typeof e.stopPropagation === 'function'){
            e.stopPropagation();
        }
        // IE
        if(typeof e.cancelBubble === 'boolean'){
            e.cancelBubble = true;
        }
    }
}
```   
            
### 代理模式(http与客户端之间增加代理对象,延迟初始化)

#### 通过包装一个对象以控制对它的访问，其主要方法是将访问聚集为组或仅当真正必要的时候才执行访问，从而避免高昂的操作开销

#### 代理对象介于对象的客户端和对象本体之间，充当守护对象并对该对象的访问进行保护，试图使本体对象做尽可能少的工作

```javascript
var proxy = {
    ids: [],
    delay: 50,
    timeout: null,
    callback: null,
    context: null,
    makeRequest: function(id, callback, context){
        
        // 加入到队列中
        this.ids.push(id);
        
        this.callback = callback;
        this.context = context;
        
        // 设置超时时间
        if(!this.timeout){
            this.timeout = setTimeout(function(){
                proxy.flush();
            }, this.delay);
        }
    },
    flush:function(){
        
        http.makeRequest(this.ids, 'proxy handler');
        
        //清楚超时设置和队列
        this.timeout = null;
        this.ids = [];
    },
    handler: function(data){
        var i, max;
        
        // 单个视频
        if(parseInt(data.query.count, 10) === 1){
            proxy.callback.call(proxy.context, data.query.results.video);
            return
        }
        
        // 多个视频
        for(i = 0, max = data.query.results.video.length; i< max; i+= 1){
            proxy.callback.call(proxy.context, data.query.results.video[i]);
        }
    }
}
```

### 中介者模式（降低对象或函数间的耦合）

#### 通过使您的对象之间相互并不直接'通话'，而是仅通过中介者对象进行通信，从而促进形成松散耦合。
 
```javascript
//记分板
//player对象
function Player(name){
    this.points = 0;
    this.name = name;
}
Player.prototype.play = function(){
    this.points += 1;
    mediator.played();
}
//记分板对象
var soreboard = {
    // 带更新的html元素
    element: document.getElementById('results'),
    
    // 更新得分显示
    update: function(score){
        var i,msg = '';
        for(i in score){
            if(score.hasOwnProperty(i)){
                msg += '<p>'+i;
                meg += score[i];
                msg += '</p>'
            }
        }
        this.element.innerHTML = msg;
    }
};

// 中介者函数
var mediator = {
    // 所有玩家（player对象）
    players: {},
    
    // 初始化
    setup: function(){
        var players = this.players;
        players.home = new Player('HOME');
        players.guest = new Player('Guest');
        
    },
    
    //如果有人玩，则更新得分值
    played: function(){
        var players = this.players,
        score = {
            Home: players.home.points,
            Guest: players.guest.points
        };
        scoreboard.update(score);
    },
    
    // 处理用户交互
    keypress: function(e){
        e = e || window.event;  // IE浏览器
        if(e.which === 49) {  // 按键'1'
            mediator.players.home.play();
            return
        }
        if(e..which === 48) {  // 按键'0'
            mediator.players.play();
            return;
        }        
    }
}

//运行
mediator.setup();
window.onkeypress = mediator.keypress;

// 游戏在30秒内结束
setTimeout(function(){
    window.onkeypress = null;
    alert('game over');
},30000)

```

### 观察者模式(订阅、发布模式)

#### 通过创建'可观察的'对象，当发生一个感兴趣的事件时可将该事件通告给所有观察者，从而形成松散耦合
  
```javascript
// 继续使用上例，键盘按键游戏
// 新的publisher对象
var publisher = {
    subscribers:{
        any:[]
    },
    on: function(type, fn, context){
        type = type || 'any';
        fn = typeof fn === 'function' ? fn : context[fn];
        
        if(typeof this.subscribers[type] === 'undefined'){
            this.subscribers[type] =[];
        }
        this.subscribers[type].push({fn:fn,context: context||this});
        
    },
    remove: function(type, fn, context){
        this.visitSubscribers('unsubscribe', type, fn, context);
    },
    fire: function(type, publication){
        this.visitSubscribers('publish', type, publication);
    },
    visitSubscribers: function(action, type, arg, context){
        var pubtype = type || 'ang';
        subscribers = this.subscribers[pubtype],
        i,
        max = subscribers ? subscribers.length : 0;
        
        for(i = 0; i< max; i +=1){
            if(action === 'publish'){
                subscribers[i].fn.call(subscribers[i].context, arg);
            }else{
                if(subscribers[i].fn === arg && subscribers[i].context === context){
                    subscribers.splice(i, 1);
                }
            }
        }
    }
}

// 新的Player构造函数
function Player(name, key){
    this.points = 0;
    this.name = name;
    this.key = key;
    
    this.fire('newplayer', this);
}
Player.prototype.play = function(){
    this.points += 1;
    this.fire('play', this);
}

// 新的game对象代替原来的mediator对象，作为发布者
var game = {
    keys: {},
    addPlayer: function(player){
        var key = player.key.toString().charCOdeAt(0);
        this.keys[key] = player;
    },
    handleKeypress: function(e){
        e = e || window.event;
        if(game.keys[e.which]){
            game.keys[e.which].play();
        }
    },
    handlePlay: function(player){
        var i,
            players = this.keys,
            score = {};
        for(i in players){
            if(players.hasOwnProperty(i)){
                score[players[i].name] = players[i].points;
            }
        }
        this.fire('scorechange',score);
    }
}
// scoreboard函数保持不变
```




