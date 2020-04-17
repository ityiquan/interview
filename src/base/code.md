### 原生写ajax
```javascript
function json2url(json){	
    json.t = Math.random();
    var arr = [];
    for(var name in json){
        arr.push(name+'='+encodeURIComponent(json[name]));
    }
    return arr.join('&');
}

//url,data,type,timeout,success,error
function ajax(options){
    options = options||{};
    options.data = options.data||{};
    options.type = options.type||'get';
    options.timeout = options.timeout||15000;
    if(window.XMLHttpRequest){
        var oAjax = new XMLHttpRequest();
    }else{
        var oAjax = new ActiveXObject('Microsoft.XMLHTTP');}
    //2.连接
    var sData = json2url(options.data);
    if(options.type.toLowerCase() == 'get'){
        oAjax.open('GET',options.url+'?'+sData,true);
        oAjax.send();
    }else{
        oAjax.open('POST',options.url,true);
        oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        oAjax.send(sData);}	
    oAjax.onreadystatechange = function(){		
        if(oAjax.readyState == 4){
            if(oAjax.status>=200&&oAjax.status<300||oAjax.status==304){
                options.success&&options.success(oAjax.responseText);	
                
            }else{
                options.error&&options.error(oAjax.status);
            }}};	
    var timer = null;
    if(options.timeout){
        clearTimeout(timer);
        timer=setTimeout(function(){
            oAjax.abort();	
        },options.timeout);
    }
}
```

### jsonp封装

```javascript
'use strict'
function jsonp(json){
	//默认值
	json = json||{};
	if(!json.url)return;
	json.data = json.data || {};
	json.cbName = json.cbName || 'cb';
	json.timeout = json.timeout || 15000;
	
	//json2url
	var arr = [];
	json.data[json.cbName] = 'show'+Math.random();
	json.data[json.cbName] = json.data[json.cbName].replace('.','');
	for(var name in json.data){
		arr.push(name+'='+encodeURIComponent(json.data[name]));}
	var str = arr.join('&');
	
	//timeout
	var timer = setTimeout(function(){
		json.error&&json.error('亲，抱歉。您的网络不给力。呵呵');
		window[json.data[json.cbName]] = null;
	},json.timeout);
	
	//创建并插入script标签
	var oH = document.getElementsByTagName('head')[0];
	var oS = document.createElement('script');
	oS.src = json.url+'?'+str;
	oH.appendChild(oS);
	//定义回调函数，删除script
	window[json.data[json.cbName]] = function (result){
		clearTimeout(timer);
		json.success&&json.success(result);
		oH.removeChild(oS);
	}
}
```    

### move框架封装

```javascript
function getStyle(obj,name){
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name];
}
function move(obj,json,options){  
	var start = {};//放初始的样式
	var dis = {};//距离一组
	options = options||{};
	options.duration = options.duration||700;//时间  duration complete easing
	options.easing = options.easing||'ease-out';//运动类型 加速 减速 匀速	
	for(var name in json){
		start[name] = parseFloat(getStyle(obj,name));
		dis[name] = json[name] - start[name];}
	var count = Math.round(options.duration/30);
	var n = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		for(var name in json){
			switch(options.easing){
				case 'linear':
					var cur = start[name] + dis[name]*n/count;
					break;
				case 'ease-in':
					var a = n/count;
					var cur = start[name] + dis[name]*Math.pow(a,3);
					break;
				case 'ease-out':
					var a = 1 - n/count;
					var cur = start[name] + dis[name]*(1-Math.pow(a,3));
					break;};
			if(name == 'opacity'){
				obj.style[name] = cur;
				obj.style.filter = 'alpha(opacity:'+cur*100+')';
			}else{	
				obj.style[name] = cur+'px';}}
		if(n == count){
			clearInterval(obj.timer);
			options.complete&&options.complete();}		
	},30);
}

```

### 鼠标滚动封装


```
<style>
#box{width:200px;height:200px;background:green;position:absolute;}
</style>
<script>
window.onload = function(){
	var oBox = document.getElementById('root');
	function addMouseEvent(obj,fn){
		var down = false;
		function mouseMove(ev){
			var oEvent = ev||event;
			if(oEvent.wheelDelta){
				if(oEvent.wheelDelta<0){
					down = true;
				}else{
					down = false;}
			}else{
				if(oEvent.detail>0){	
					down = true;
				}else{
					down = false;
					}
				}
			fn(down);		
			oEvent.preventDefault&&oEvent.preventDefault();
			return false;
		}
		obj.onmousewheel = mouseMove;
		obj.addEventListener('DOMMouseScroll',mouseMove,false);};
	addMouseEvent(oBox,function(down){
		if(down){
			oBox.style.height = oBox.offsetHeight + 10+'px';
		}else{
			oBox.style.height = oBox.offsetHeight - 10+'px';
		}
	});
};
</script>
<body>
<div id="root"></div>
</body>
```

### 仿jquery库

```javascript
function ZQuery(arg){
	this.elements = []; 		//存东西
	this.domString = '';
	switch(typeof arg){
		case 'function':
			DOMReady(arg);
			break;
		case 'string':
			if(arg.indexOf('<')!=-1){
				this.domString = arg;
			}else{
				this.elements = getEle(arg);
				this.length = this.elements.length;}
			break;
		default:
			this.elements.push(arg);
			break;
	}
}
ZQuery.prototype.css=function(sName,sValue){
	if(arguments.length==2){
		for(var i=0;i<this.elements.length;i++){
			this.elements[i].style[sName] = sValue;}
	}else{
		if(typeof sName=='string'){
			return getStyle(this.elements[0],sName);
		}else{
			var json = sName;
			for(var i=0;i<this.elements.length;i++){
				for(var name in json){
					this.elements[i].style[name]=json[name];}}}}
	return this;};
ZQuery.prototype.attr=function(sName,sValue){
	if(arguments.length==2){
		for(var i=0;i<this.elements.length;i++){
			this.elements[i].setAttribute(sName,sValue);
		}
	}else{
		if(typeof sName=='string'){
			return this.elements[0].getAttribute(sName);
		}else{
			var json = sName;
			for(var i=0;i<this.elements.length;i++){
				for(var name in json){
					this.elements[i].setAttribute(name,json[name]);}}}}
	return this;};
ZQuery.prototype.addClass = function(sClass){
	for(var i=0;i<this.elements.length;i++){
		addClass(this.elements[i],sClass);}
	return this;};
ZQuery.prototype.removeClass = function(sClass){
	for(var i=0;i<this.elements.length;i++){
		removeClass(this.elements[i],sClass);}
	return this;};
ZQuery.prototype.val=function(str){
	if(str||str==''){
		for(var i=0;i<this.elements.length;i++){
			this.elements[i].value = str;}
	}else{
		return this.elements[0].value;}
	return this;};
ZQuery.prototype.html=function(str){
	if(str||str==''){
		for(var i=0;i<this.elements.length;i++){
			this.elements[i].innerHTML = str;}
	}else{
		return this.elements[0].innerHTML;}
	return this;};
ZQuery.prototype.show=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='block';}
	return this;};
ZQuery.prototype.hide=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='none';}
	return this;};
ZQuery.prototype.animate=function(json,options){
	for(var i=0;i<this.elements.length;i++){
		move(this.elements[i],json,options);}};
ZQuery.prototype.appendTo=function(arg){
	for(var i=0;i<$(arg).elements.length;i++){
		$(arg).elements[i].insertAdjacentHTML('beforeEnd',this.domString);}};
ZQuery.prototype.prependTo=function(arg){
	for(var i=0;i<$(arg).elements.length;i++){
		$(arg).elements[i].insertAdjacentHTML('afterBegin',this.domString);}};
ZQuery.prototype.insertBefore=function(arg){
	for(var i=0;i<$(arg).elements.length;i++){
		$(arg).elements[i].insertAdjacentHTML('beforeBegin',this.domString);}};
ZQuery.prototype.insertAfter=function(arg){
	for(var i=0;i<$(arg).elements.length;i++){
		$(arg).elements[i].insertAdjacentHTML('afterEnd',this.domString);}};
ZQuery.prototype.remove=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].parentNode.removeChild(this.elements[i]);}};
ZQuery.prototype.get = function(n){
	return this.elements[n];};
ZQuery.prototype.eq = function(n){
	return $(this.elements[n]);};
ZQuery.prototype.index = function(){
	var oParent = this.elements[0].parentNode;
	var aChild = oParent.children;
	for(var i=0;i<aChild.length;i++){
		if(this.elements[0]==aChild[i]){
			return i;}}};
;'click mouseover mouseout mousedown mousemove mouseup dblclick contextmenu keyup keydown'.replace(/\w+/g,function(str){
	ZQuery.prototype[str] = function(fn){
		for(var i=0;i<this.elements.length;i++){
			addEvent(this.elements[i],str,fn);}};});
ZQuery.prototype.mouseenter=function(fn){
	for(var i=0;i<this.elements.length;i++){
		var _this = this.elements[i];
		addEvent(this.elements[i],'mouseover',function(ev){
			var oFrom = ev.fromElement||ev.relatedTarget;
			if(_this.contains(oFrom))return;
			fn.call(_this,ev);});}};
ZQuery.prototype.mouseleave=function(fn){
	for(var i=0;i<this.elements.length;i++){
		var _this = this.elements[i];
		addEvent(this.elements[i],'mouseout',function(ev){
			var oTo = ev.toElement||ev.relatedTarget;
			if(_this.contains(oTo))return;
			fn.call(_this,ev);});}};
ZQuery.prototype.hover=function(fn1,fn2){
	this.mouseenter(fn1);
	this.mouseleave(fn2);};
ZQuery.prototype.toggle=function(){
	var args = arguments;
	var _this = this;
	for(var i=0;i<this.elements.length;i++){
		(function(count){
			addEvent(_this.elements[i],'click',function(ev){
				count++;
				args[(count-1)%args.length].call(this,ev);});
		})(0);}};
function $(arg){
	return new ZQuery(arg);}
$.ajax = function(json){
	ajax(json);};
$.jsonp = function(json){
	jsonp(json);};
$.fn = ZQuery.prototype;
$.fn.extend = function(json){
	for(var name in json){
		ZQuery.prototype[name] = json[name];}};
function json2url(json){
	json.t = Math.random();
	var arr = [];
	for(var name in json){
		arr.push(name+'='+encodeURIComponent(json[name]));}
	return arr.join('&');}
function ajax(json){
	json = json || {};
	if(!json.url)return;
	json.data = json.data||{};
	json.type = json.type||'get';
	json.timeout = json.timeout||30000;
	if(window.XMLHttpRequest){
		var oAjax = new XMLHttpRequest();
	}else{
		var oAjax = new ActiveXObject('Microsoft.XMLHTTP');}
	switch(json.type.toLowerCase()){
		case 'get':
			oAjax.open('GET',json.url+'?'+json2url(json.data),true);
			oAjax.send();
			break;
		case 'post':
			oAjax.open('POST',json.url,true);
			oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			oAjax.send(json2url(json.data));
			break;
		default:
			oAjax.open('GET',json.url+'?'+json2url(json.data),true);
			oAjax.send();
			break;}
	var timer = setTimeout(function(){
		oAjax.onreadystatechange=null;
		json.error&&json.error('亲，网络不给力，呵呵');
	},json.timeout);
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			if(oAjax.status>=200&&oAjax.status<300||oAjax.status==304){
				clearTimeout(timer);
				json.success&&json.success(oAjax.responseText);
			}else{
				json.error&&json.error(oAjax.status);}}};}
function jsonp(json){
	json = json || {};
	if(!json.url)return;
	json.data = json.data || {};
	json.cbName = json.cbName || 'cb';
	json.timeout = json.timeout || 15000;
	json.data[json.cbName] = 'show'+Math.random();
	json.data[json.cbName] = json.data[json.cbName].replace('.','');
	var arr = [];
	for(var name in json.data){
		arr.push(name+'='+encodeURIComponent(json.data[name]));}
	var str = arr.join('&');
	var timer = setTimeout(function(){
		window[json.data[json.cbName]] = null;
		json.error&&json.error('网络超时');
	},json.timeout);
	window[json.data[json.cbName]] = function(result){
		clearTimeout(timer);
		oH.removeChild(oS);
		json.success&&json.success(result);};
	var oH = document.getElementsByTagName('head')[0];
	var oS = document.createElement('script');
	oS.src = json.url+'?'+str;
	oH.appendChild(oS);}
function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,function(ev){
			var oEvent = ev||event;
			if(fn.call(this,oEvent)==false){
				oEvent.cancelBubble = true;
				oEvent.preventDefault();}
		},false);
	}else{
		obj.attachEvent('on'+sEv,function(){
			if(fn.apply(this,arguments)==false){
				oEvent.cancelBubble = true;
				return false;}
		});}}
function getStyle(obj,sName){
	return (obj.currentStyle||getComputedStyle(obj,false))[sName];}
function DOMReady(fn){
	if(document.addEventListener){
		addEvent(document,'DOMContentLoaded',fn);
	}else{
		addEvent(document,'onreadystatechange',fn);}}
function getByClass(oParent,sClass){
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}else{
		var aResult = [];
		var re = new RegExp('\\b'+sClass+'\\b','g');
		var aEle = oParent.getElementsByTagName('*');
		for(var i=0;i<aEle.length;i++){
			if(aEle[i].className.search(re)!=-1){
				aResult.push(aEle[i]);}}
		return aResult;}}
function addClass(obj,sClass){
	if(obj.className){
		var re = new RegExp('\\b'+sClass+'\\b');
		if(obj.className.search(re)==-1){
			obj.className+=' '+sClass;}
	}else{
		obj.className=sClass;}
	obj.className = obj.className.replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');}
function removeClass(obj,sClass){
	if(obj.className){
		var re = new RegExp('\\b'+sClass+'\\b','g');
		obj.className = obj.className.replace(re,'').replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
		if(!obj.className){
			obj.removeAttribute('class');}}}
function getStr(aParent,str){
	var aChild = [];
	for(var i=0;i<aParent.length;i++){
		switch(str.charAt(0)){
			case '#':
				var obj = document.getElementById(str.substring(1));
				aChild.push(obj);
				break;
			case '.':
				var aEle = getByClass(aParent[i],str.substring(1));
				for(var j=0;j<aEle.length;j++){
					aChild.push(aEle[j]);}
				break;
			default:
				if(/^\w+\[\w+\=\w+\]$/.test(str)){
					var arr = str.split(/\[|\=|\]/);
					var aEle = aParent[i].getElementsByTagName(arr[0]);
					for(var j=0;j<aEle.length;j++){
						if(aEle[j].getAttribute(arr[1])==arr[2]){
							aChild.push(aEle[j]);}}
				}else if(/^\w+\:\w+(\(\d+\))?$/.test(str)){
					var arr = str.split(/\:|\(|\)/);
					var aEle = aParent[i].getElementsByTagName(arr[0]);
					switch(arr[1]){
						case 'first':
							aChild.push(aEle[0]);
							break;
						case 'last':
							aChild.push(aEle[aEle.length-1]);
							break;
						case 'odd':
							for(var j=1;j<aEle.length;j+=2){
								aChild.push(aEle[j]);}
							break;
						case 'even':
							for(var j=0;j<aEle.length;j+=2){
								aChild.push(aEle[j]);}
							break;
						case 'eq':
							aChild.push(aEle[arr[2]]);
							break;
						case 'lt':
							for(var j=0;j<arr[2];j++){
								aChild.push(aEle[j]);}
							break;
						case 'gt':
							for(var j=arr[2]-0+1;j<aEle.length;j++){
								aChild.push(aEle[j]);}
							break;
						case 'elt':
							for(var j=0;j<=arr[2];j++){
								aChild.push(aEle[j]);}
							break;
						case 'egt':
							for(var j=arr[2];j<aEle.length;j++){
								aChild.push(aEle[j]);}
							break;}
				}else{
					var aEle = aParent[i].getElementsByTagName(str);
					for(var j=0;j<aEle.length;j++){
						aChild.push(aEle[j]);}}
				break;}}
	return aChild;}
function getEle(str){
	var arr = str.replace(/^\s+|\s+$/g,'').split(/\s+/g);
	var aParent = [document];
	var aChild = [];
	for(var i=0;i<arr.length;i++){
		aChild = getStr(aParent,arr[i]);
		aParent = aChild;}
	return aChild;}
var Tween={Linear:function(t,b,c,d){return c*t/d+b},Quad:{easeIn:function(t,b,c,d){return c*(t/=d)*t+b},easeOut:function(t,b,c,d){return -c*(t/=d)*(t-2)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t+b}return -c/2*((--t)*(t-2)-1)+b}}}
function move(obj,json,options){
	options = options||{};
	options.duration = options.duration||700;
	options.easing = options.easing||Tween.Quad.easeInOut;
	var start = {};
	var dis = {};
	for(var name in json){
		start[name] = parseFloat(getStyle(obj,name));
		if(isNaN(start[name])){
			switch(name){
				case 'width':
					start[name] = obj.offsetWidth;
					break;
				case 'height':
					start[name] = obj.offsetHeight;
					break;
				case 'top':
					start[name] = obj.offsetTop;
					break;
				case 'left':
					start[name] = obj.offsetLeft;
					break;
				case 'opacity':
					start[name] = 1;
					break;
				case 'borderWidth':
					start[name] = 0;
					break;}}
		dis[name] = json[name]-start[name];}
	var count = Math.floor(options.duration/30);
	var n = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		for(var name in json){
			var cur = options.easing(n/count*options.duration,start[name],json[name],options.duration);
			if(name=='opacity'){
				obj.style.opacity = cur;
				obj.style.filter = 'alpha(opacity:'+cur*100+')';
			}else{
				obj.style[name] = cur+'px';}}
		if(n==count){
			clearInterval(obj.timer);
			options.complete&&options.complete();}
	},30);}
```

### 仿jquery选择器(Id,类，标签，属性,伪类)

```
html部分
<div class="box" id="box">
	<ul>
		<li><input type="button" value="aaa" /></li>
		<li class="on"><input type="text" value="abc" /></li>
		<li><input type="button" value="aaa" /></li>
		<li class="on"><input type="text" value="abc" /></li>
	</ul>
	<ol>
		<li><input type="button" value="aaa" /></li>
		<li class="on"><input type="text" value="abc" /></li>
		<li><input type="button" value="aaa" /></li>
		<li class="on"><input type="text" value="abc" /></li>
	</ol>
</div>
```
```javascript
window.onload=function(){
	var aEle = getEle('li:egt(3)');
	for(var i=0;i<aEle.length;i++){
		aEle[i].style.background = 'red';}};
function getEle(str){
	var arr = str.replace(/^\s+|\s+$/g,'').split(/\s+/g);
	var aParent = [document];
	var aChild = [];
	for(var i=0;i<arr.length;i++){
		aChild = getStr(aParent,arr[i]);
		aParent = aChild;}
	return aChild;}
function getStr(aParent,str){
	var aChild = [];
	for(var i=0;i<aParent.length;i++){
		switch(str.charAt(0)){
			case '#':
				var obj = document.getElementById(str.substring(1));
				aChild.push(obj);
				break;
			case '.':
				var aEle = getByClass(aParent[i],str.substring(1));
				for(var j=0;j<aEle.length;j++){
					aChild.push(aEle[j]);
				}
				break;
			default:
				if(/^\w+\[\w+\=\w+\]$/.test(str)){
					var arr = str.split(/\[|\=|\]/);
					//arr[0]标签名	arr[1]属性名		arr[2]属性值
					var aEle = aParent[i].getElementsByTagName(arr[0]);
					for(var j=0;j<aEle.length;j++){
						if(aEle[j].getAttribute(arr[1])==arr[2]){
							aChild.push(aEle[j]);}
					}
				}else if(/^\w+\:\w+(\(\d+\))?$/.test(str)){
					var arr = str.split(/\:|\(|\)/);
					//arr[0]标签名	arr[1]伪类名		arr[2]下标(如果有)
					var aEle = aParent[i].getElementsByTagName(arr[0]);
					switch(arr[1]){
						case 'first':
							aChild.push(aEle[0]);
							break;
						case 'last':
							aChild.push(aEle[aEle.length-1]);
							break;
						case 'odd':
							for(var j=1;j<aEle.length;j+=2){
								aChild.push(aEle[j]);
							}
							break;
						case 'even':
							for(var j=0;j<aEle.length;j+=2){
								aChild.push(aEle[j]);
							}
							break;
						case 'eq':
							aChild.push(aEle[arr[2]]);
							break;
						case 'lt':
							for(var j=0;j<arr[2];j++){
								aChild.push(aEle[j]);
							}
							break;
						case 'gt':
							for(var j=arr[2]-0+1;j<aEle.length;j++){
								aChild.push(aEle[j]);
							}
							break;
						case 'elt':
							for(var j=0;j<=arr[2];j++){
								aChild.push(aEle[j]);
							}
							break;
						case 'egt':
							for(var j=arr[2];j<aEle.length;j++){
								aChild.push(aEle[j]);
							}
							break;
					}
				}else{
					var aEle = aParent[i].getElementsByTagName(str);
					for(var j=0;j<aEle.length;j++){
						aChild.push(aEle[j]);}
				}
				break;}
	}
	return aChild;}
function getByClass(oParent,sClass){
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}else{
		var aResult = [];
		var re = new RegExp('\\b'+sClass+'\\b','g');
		var aEle = oParent.getElementsByTagName('*');
		for(var i=0;i<aEle.length;i++){
			if(aEle[i].className.search(re)!=-1){
				aResult.push(aEle[i]);}}
		return aResult;
	}
}
```
### cookie设置获取删除函数封装

```javascript
function setCookie(sName,sValue,iDay){
	if(iDay){
		var oDate = new Date();
		oDate.setDate(oDate.getDate()+iDay);
		oDate.setHours(0,0,0,0);
		document.cookie = sName+'='+sValue+'; PATH=/; EXPIRES='+oDate.toGMTString();
	}else{
		document.cookie = sName+'='+sValue+'; PATH=/';
	}
}
function getCookie(sName){
	var arr = document.cookie.split('; ');
	for(var i=0;i<arr.length;i++){
		var arr2 = arr[i].split('=');
		if(arr2[0]==sName){
			return arr2[1];
		}
	}
	return null;
}
function removeCookie(sName){
	setCookie(sName,1,-1);
}
```

### 只能输入数字的输入框
```javascript
window.onload = function(){
	var oT = document.getElementById('text');
	oT.onkeydown = function(ev){
		var oEvent = ev||event;
		if((oEvent.keyCode<48||oEvent.keyCode>57)&&(oEvent.keyCode != 8)&&(oEvent.keyCode !=37)&&(oEvent.keyCode !=39)){
			return false;
		}
	};
};
```

### 瀑布流

```
<style>
*{margin:0;padding:0;}
body{border:1px solid red;}
#box{width:966px;margin:0 auto;}
li{ list-style:none;}
ul{width:300px; float:left; margin:0 10px; border:1px solid red;}
li{width:100%;height:200px; background:#ccc;margin:10px 0;}
</style>
<script>
window.onload = function(){
	var oBox = document.getElementById('box');
	var aUl = oBox.children;
	function rnd(m,n){
		return parseInt(m+Math.random()*(n-m));}
	function createLi(){
		var oLi = document.createElement('li');
		oLi.style.background = 'rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')';
		oLi.style.height = rnd(100,351)+'px';	
		return oLi;}
	function createLis(){
		for(var i = 0;i<20;i++){
			var oLi = createLi();
			var arr = [];	
			for(var j = 0;j<aUl.length;j++){
				arr.push(aUl[j]);}
			arr.sort(function(ul1,ul2){
				return ul1.offsetHeight - ul2.offsetHeight;});
			arr[0].appendChild(oLi);}}
	createLis();
	window.onscroll = function(){
		var sT = document.documentElement.scrollTop||document.body.scrollTop;
		var cH = document.documentElement.clientHeight;
		if(sT+1 >= (document.body.scrollHeight - cH)){			
			createLis();}};};
</script>
</head>
<body>
<div id="box">
   <ul></ul>
   <ul></ul>
   <ul></ul>
</div>
</body>
```

### 上移下移

```
html部分
<body>
<ul id="ul1">
	<li>aaaa
		<a href="javascript:;" class="up">上移</a>
		<a href="javascript:;" class="down">下移</a>
	</li>
	<li>bbbb
		<a href="javascript:;" class="up">上移</a>
		<a href="javascript:;" class="down">下移</a>
	</li>
	<li>cccc
		<a href="javascript:;" class="up">上移</a>
		<a href="javascript:;" class="down">下移</a>
	</li>
	<li>dddd
		<a href="javascript:;" class="up">上移</a>
		<a href="javascript:;" class="down">下移</a>
	</li>
</ul>
</body>
```
```javascript
window.onload = function(){
	function findInArr(str,arr){
		for(var i=0;i<arr.length;i++){
			if(str = arr[i]){
				return true;
			}
		}
		return false;
	}
	function getByClass(oParent,sClass){
		if(oParent.getElementsByClassName){
			return oParent.getElementsByClassName(sClass);
		}else{
			aEle = oParent.getElementsByTagName('*');
			var result = 0;
			for(var i=0;i<aEle.length;i++){
				var arr = aEle[i].split(' ');
				if(findInArr(sClass,arr)){
					result.push(aEle[i]);
				}
			}
			return result;
		}
	};
	var oUl = document.getElementById('ul1');
	var aUp = getByClass(oUl,'up');
	var aDown = getByClass(oUl,'down');
	for(var i=0;i<aUp.length;i++){
		aUp[i].onclick = function(){
			this.parentNode=oUl.children[0]?alert('到头了'):oUl.insertBefore(this.parentNode,this.parentNode.previousElementSibling);
		};
		aDown[i].onclick = function(){
			this.parentNode=oUl.children[oUl.children.length-1]?alert('到底了'):oUl.insertBefore(this.parentNode,this.parentNode.nextElementSibling.nextElementSibling);
		};
	}
};

```

### select用法
```javascript
window.onload = function(){
	var oS = document.getElementById('sel');
	oS.onchange = function(){
		//alert(this.value);
		//alert((oS.options.selectedIndex));	
		//alert(oS.options.length)
		alert(oS.options[oS.options.selectedIndex].text)
	}; 
};
```

### select添加和删除所有项
```
html部分
<body>
<input type="button" value="添加" id="add" />
<input type="button" value="删除" id="cancel" />
<select id = "sel">
	<option>北京</option>
	<option>上海</option>
	<option>广州</option>
	<option>深圳</option>
	<option>天津</option>
</body>
```
```javascript
window.onload = function(){
	var oAdd = document.getElementById('add');
	var oCancel = document.getElementById('cancel');
	var oS = document.getElementById('sel');
	oAdd.onclick = function(){
		var newOption = new Option('东莞');
		oS.options.add(newOption);};
	oCancel.onclick = function(){
		for(var i=0;i<oS.options.length;i++){
			oS.options.remove(i--);
		}
	};
};
```









