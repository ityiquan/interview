### js关于this的隐式丢失问题

```javascript
function foo(){
    console.log(this.a)
}

var obj = {
    a:1,
    foo:foo
}
var a = 2;
var bar =  obj.foo;

bar()  // 2 虽然bar是obj.foo的一个引用，但只是引用了foo本身
obj.foo()   // 1 
```

### this绑定

    1.默认绑定（默认绑定到window上）
    2.隐式绑定，绑定到调用对象上（对象或dom对象的事件调用）
    3.显式绑定，通过call，apply,bind等进行绑定
    4.new绑定，new做的事情
        创建（或者说构造）一个全新的对象
        这个新对象会被执行[[Prototype]]连接
        这个新对象会绑定函数调用的this
        如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象
        
### 判断this
    
    1.函数是否在new中调用（new绑定）?如果是的话，this绑定的是新创建的对象
        var bar = new Foo();
    2.函数是否通过call,apply,bind调用？如果是的话，this绑定的是指定的对象
        var bar = foo.call(obj)
    3.函数是否在某个上下文对象中调用？如果是的话，this绑定的是那个上下文对象
        var bar = obj.foo()
    4.如果都不是的话，使用默认绑定，严格模式下绑定到undefined,否则绑定到全局对象上
        决定this绑定对象的不是调用位置是否处于严格模式，而是函数体是否处于严格模式，如果函数体处于严格模式，
        this会被绑定到undefined,否则绑定到全局对象上
### this取值特殊的情况
    
    如果把null或者undefined作为this的绑定对象传入call,apply或者bind，
    这些在调用时会被忽略，实际应用的还是默认绑定
        这种情况会在用apply展开一个数组作为入参时使用
            foo.apply(null, [1,2])
        使用bind进行函数柯里化的时候使用
            var bar = foo.bind(null, 1);
            bar(2)  // 相当于调用foo(1,2)
            
    所以更安全的调用方式是传入一个空的对象，
        var kong = Object.vreate(null);
        foo.apply(kong, [1, 2]);


### 如何判断一个对象什么有某个属性
    
    因为myOBject.a得到undefined的时候，有可能是a不存在也有可能a存储的值就是undefined,
    通过 'a' in myObject 操作符来判断的话会检查属性是否在对象及其[[prototype]]原型链中，
    通过 myObject.hasOwnProperty('a')判断的话， 如果myObject是通过Object.create(null)创建的，则该对象无法通过Object.prototype来访问hasOwnproperty
    这是可以通过Object.prototpye.hasOwnproperty.call(myObject, 'a'),来判断。
    
### 如果foo不直接存在于myObject中而是存在于原型链上层时，myObject.foo = 'bar',会出现三中情况
    
    1.如果在[[prototype]]链上层存在名为foo的普通数据访问属性并且没有被标记为只读(writable:false),
    那就会直接在myObject中添加一个名为foo的新属性，它是屏蔽属性。
    2.如果在[[prototype]]链上层存在foo，但是它被标记为只读(writable:false),那么无法修改已有属性或者在myObject上创建屏蔽属性，如果运行在严格模式下，代码会抛出错误，否则
    这条赋值语句会被忽略，总之不会发生屏蔽。
    3.如果在[[prototype]]链上层存在foo并且它是一个setter,那就一定会调用这个setter.foo不会被添加到myObject,
    也不会重新定义foo这个setter.
    
    
    
    
    
    
    
    
    

    
    
    
    
    
    