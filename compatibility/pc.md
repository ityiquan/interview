
## meta标签

### child问题
 
    firstChild兼容 IE6-8	  firstElementChild  兼容高级浏览器
    lastChild兼容IE6-8  	 lastElementChild  兼容高级浏览器

### 3. previousElementSibling||previousSibling   nextElementSibling||nextSibling(前后语句交换会有问题，因为高级浏览器会找到第一个空文本节点)

### 4. 浏览器滚动距离document.body.scrollTop兼容chrome, document.documentElement.scrollTop兼容IE和firefox
    
### 5. pageX   pageY兼容高级浏览器  低级浏览器使用scrollLeft+clientX   scrollTop+clientY
    
## var oEvent = ev||event，火狐只能用传参，chrome可以用传参也可以用event,低版本IE只能用event

### setCapture设置捕获  releaseCapture取消捕获，只低版本的IE可用，只捕获的鼠标操作

### 鼠标滚轮事件 IE chrome    onmousewheel 滚动方向  wheelDelta 向下<0   FF DOMMouseScroll  滚动方向  detail  向下>0
    
### 网页第一行不加<!doctype html>就是怪异模式，怪异模式下很多东西不一样，如盒模型等(只IE下有怪异模式)   
    
### 高级浏览器有冒泡+捕获，低版本IE只有冒泡，obj.setCapture();	obj.releaseCapture()
    
### mouseover和mouseout事件中获取元素

    分别对应chrome、IE||火狐 var oFrom = oEvent.fromElement||oEvent.relatedTarget;  var oTo = oEvent.toElement||oEvent.relatedTarget; 
    
### 事件委托
    
    分别对应chrome、IE||火狐   var oSrc = oEvent.srcElement||oEvent.target;


### ready事件

    ready事件FF，chrome使用 DOMContentLoaded   IE6-8使用onreadystatechange（当通信状态改变时）包括两种通信状态：interactive/complete(交互/完成)
    
### 输入字数统计I

    输入字数统计IE下onpropertychange，只要当前对象属性发生改变，就会触发事件；  FF chrome  使用oninput，只在对象的value值改变时奏效；
    
### 事件绑定

    作用：解决事件冲突 高级浏览器用addEventListener(sEv,fn,false);  低级浏览器用obj.attachEvent('on'+sEv,fn);
    解除绑定，高级浏览器用removeEventListener;低级浏览器用detachevet

### css3标签浏览器兼容问题-webkit-transition兼容chrome,safari,opera   -moz-transition 兼容firefox   -ms-transition 兼容ie   -o-transition 兼容旧版opera  transition 最终目标不加前缀
    
### 获取非行间样式，高级浏览器用getComputedStyle(obj,false)[attr]，低级用obj.getCurrentStyle[attr]
     
### 关于ajax对象，高级浏览器用XMLHttpRequest，低级浏览器用ActiveXObject('Mircorsoft.XMLHttp')

    
    
    
    
    
    
    
    
    
    
    
    