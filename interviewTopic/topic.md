### js面向对象常规写法

```javascript
function Person(name,age){
    this.name=name;
    this.age=age;
}
Person.prototype.say=function(){
    alert('我的名字叫：'+this.name+'我的年龄'+this.age)
    }
var p=new Person('ycy',27);
p.say();
```

### js的继承常规写法

```javascript
function Person(name,age){
    this.name=name;
    this.age=age;
}
Person.prototype.say=function(){
    alert('我的名字叫：'+this.name+'我的年龄'+this.age)
}
    
function Chinese(name,age,aihao){
    this.aihao=aihao;
    Person.call(this,name,age);
    }
Chinese.prototype=new Person();
Chinese.prototype.sayAihao=function(){
    alert('我的爱好是：'+this.aihao)
    }
var c=new Chinese('ycy',27,'gongfu');
c.sayAihao();
```

### 跨域问题

    不在同一个域或者子域下都要跨域，比如你在 www.a.com下面要去访问 www.b.com或者s.a.com都要跨域。
    解决办法：通过js标签加载 如：
    	<script type=”text/javascript” src=”http://act.hi.baidu.com/widget/recommend”><script>
    Jsonp跨域原理：JS虽然不支持跨域，但是js都可以用js标签加载跨域的js，jsonp利用这个原理，相当于将数据封装到了一个js文件里面，用js标签加载过来后解析执行这个js得到数据。
    
### 什么是闭包?    
    
    闭包可以理解为定义在函数里面的函数，闭包可以读取函数内部变量
    
### 作用域问题    
    
    Js无块级作用域，只有函数作用域，函数内部可以访问全局变量，在函数内部定义的变量都有定义，不在乎位置在哪里，但是只有在前面赋值后面才有值
    
### 原型链    
    
    a的原型是b，b的原型是c，那么a继承b和c的属性和方法；如果a重新设置的方法或属性与b和c中的属性重名，那么a的这个属性覆盖原型链中的属性，但是并不改变原型链的属性。
    
### js的GC回收机制

    js会自动进行内存回收，不用的变量会自动抛弃，实际上一般理解为局部变量在函数执行完后即被抛弃，但是也有一些例外。比如：闭包内部返回局部变量就不会被回收。
    
### 写出以下代码的运行结果？
    alert(typeof null) ->	object
    alert(typeof undefined) -> undefined
    alert(typeof NaN) ->	number
    alert(null==undefined) ->	true
    alert(NaN==NaN)  -> false
    var str=’123abc’; 	NaN
    alert(typeof str++);  -> number
    alert(str)  -> NaN
    alert(Number(null))    -> 0
    alert(Number([]))    -> 0
    [] == false; // true空数组本身是对象不是空，但在比较的时候他是false;
    [] == ![];   // true空数组取反转成了boolean，是false;
    
### 如何判断某变量是否为数组数据类型？
    方法一：obj instanceof Array 在某些IE版本中不正确
    方法二：判断其是否具有“数组性质”，如sort
    方法三：在ECMA Script5中定义了新方法Array.isArray()
    
### 正则表达式构造函数var reg=new RegExp(“xxx”)与正则表达字面量var reg=//有什么不同？
    
    当使用RegExp()构造函数的时候，不仅需要转义引号（即\”表示”），并且还需要双反斜杠（即\\表示一个\）。使用正则表达字面量的效率更高。
    
### 实现一个函数clone，可以对JavaScript中的5种主要的数据类型进行值复制（主要是对象和数组赋值与其他类型不一样）
```javascript
Object.prototype.clone = function(){
    var o = this.constructor === Array ? [] : {};
    for(var e in this){
            o[e] = typeof this[e] === "object" ? this[e].clone() : this[e]; }
     return o;
}
       		 
```

### 函数声明与函数表达式的区别？

    在js中，解析器在向执行环境中加载数据时，对函数声明和函数表达式并非是一视同仁的，解析器会率先读取函数声明，
    并使其在执行任何代码之前可用（可以访问），至于函数表达式，则必须等到解析器执行到它所在的代码行，才会真正被解析执行。

### 定义一个log方法，让它可以代理console.log的方法

```javascript
function log(){
    console.log.apply(console, arguments);
  };
```

### 在Javascript中什么是伪数组？如何将伪数组转化为标准数组？

    伪数组（类数组）：无法直接调用数组方法或期望length属性有什么特殊的行为，但仍可以对真正数组遍历方法来遍历它们。典型的是函数的argument参数，
    还有像调用getElementsByTagName,document.childNodes之类的,它们都返回NodeList对象都属于伪数组。
    可以使用Array.prototype.slice.call(fakeArray)将数组转化为真正的Array对象。
    
### 浏览器嗅探:/android/.test(navigation.userAgent)    
    
### 原生JS的window.onload与Jquery的$(document).ready(function(){})有什么不同？如何用原生JS实现Jq的ready方法？

```javascript
function ready(fn){
  if(document.addEventListener) {    
      document.addEventListener('DOMContentLoaded', function() {
          //注销事件, 避免反复触发
          document.removeEventListener('DOMContentLoaded',arguments.callee, false);
          fn();            //执行函数
      }, false);
  }else if(document.attachEvent) {
      document.attachEvent('onreadystatechange', function() {
         if(document.readyState == 'complete') {
             document.detachEvent('onreadystatechange', arguments.callee);
             fn();
         } 
      }); 
  }
};
```








