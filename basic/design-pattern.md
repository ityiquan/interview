
### 单体模式
    
#### 解决的问题：保证一个特定的类仅有一个实例

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

##### 解决的问题：创建一些有相似功能的对象

##### 思想：通过工厂方法（或类）创建的对象在设计上都继承了相同的父对象这个思想，它们都是实现专门功能的特定子类。

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
        // 使用子类原型继承父类原型,改if判断表示只继承一次
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

##### 解决的问题：提供一种简单的访问一个复杂数据结构的内部每个元素的方法。

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

##### 解决的问题： 可运行时动态添加附加功能到创建的子对象中。

##### 实现：附加功能的可定制和可配置特性，可以从只有最基本的功能的普通对象开始，然后从可用的装饰资源池中选择需要用到的附加功能，并按添加顺序进行装饰（如果装饰顺序很重要的话）。

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

#####  解决的问题：校验

##### 实现：创建一个具有validate()方法的校验证器（validator）对象，验证器将选择最佳策略（strategy）以处理任务，并将具体的数据验证交给适当的算法（函数）。

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
        return this.messages.length !==0;
    }
}
```
### 外观模式

##### 解决问题:可用于代码重构,也非常适合浏览器兼容性处理，据此可将浏览器之间的差异隐藏在外观函数内。

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
            
### 代理模式

#### 