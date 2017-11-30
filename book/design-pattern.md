### 当已new操作符调用构造函数时，函数内部将发生什么？

- 创建一个空对象并且this变量引用该对象，同时继承该函数的原型。
- 属性和方法被加入到this引用的对象中。
- 新创建的对象由this所引用，并且最后隐式返回this(如果没有显式的返回其他对象的话)。

### 如果在调用构造函数的时候加不加this都得到相同的效果

- 自调用构造函数，在构造函数中检查this是否为构造函数的一个实例，如果不是则再次使用new调用自身 
```javascript
function Waffle(){
   if(!(this instanceof Waffle)){
       return new Waffle();
   }
}
```
- 将this与arguments.callee比较，而不是在代码中硬编码构造函数名称
```javascript
if(!(this instanceof arguments.callee)){
    return new arguments.callee();
}
```
### 判断一个变量是数组的方法（使用兼容方式调用es5的isArray方法）
   
```javascript
if(typeof Array.isArray === 'undefined'){
    Array.isArray = function(arg){
        return Object.prototype.toString.call(arg) === '[object Array]';
    }
}
```