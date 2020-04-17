### 移动端
    定宽布局：width:320px;html{font-size:20px;}为基准通过rem(root文字大小)布局，加上 window.onload=window.onresize=function(){document.documentElement.style.fontSize = document.documentElement.clientWidth*(20/320)+'px';};
   
    百分比布局：width:calc(25% - 2px);
   
    响应式布局：@media screen and (max-width:380px){li{width:50%;}}	@media screen and (min-width:381px) and (max-width:800px){li{width:25%;}}  @media screen and (min-width:801px){li{width:12.5%;}}
   
    弹性布局(不能操作行内元素)：父级触发，加display:-webkit-box;	子级 -webkit-box-flex:1;(系数,代表所占比例)	-webkit-box-orient:vertical;(方向,表示垂直弹性)
   
    移动端布局必须加上<meta name="viewport" content="width=device-width,initial-scale=1, user-scalable=no" />
   
    移动端事件touchstart  ev.targetTouches[0]   touchmove  ev.targetTouches[0] 	touchend 离开屏幕ev.changedTouches[0]
   
    translate3d(x,y,z);  rotate3d(x,y,z,d);  scale3d(x,y,z);开启3D加速解决手机拖拽卡顿 
   
    identifier 唯一标识符,属于targetTouch[0]的一个属性
    
### 文件拖拽
    obj.ondragenter 拖进去 obj.ondragleave 拖出来 obj.ondrop (放下) 触发之前先把ondragover的默认事件取消
    ondrop事件的返回值放入的文件组 var oFile = ev.dataTransfer.files[0] 表示放入的第一个文件
    oFile里面有三个属性name 名字  size 大小  type 类型（MIME-TYPE如：mage/jpeg，text/plain）
    通过文本形式读取 reader.readAsText() 通过base文件流读取 reader.readAsDataURL
    
### html5    
    canvas video  audio geolocation localStorage  header   footer section nav datalist    
    获取元素 获取一个document.querySelector  获取一组document.querySelectorAll 
    属性  自定义属性以data-开头(如data-aaa)	obj.dataset.aaa获取自定义属性    
    class操作	obj.classList 	.add() 	添加	.remove() 删除	.contains() 包含  .toggle() 切换    
    本地存储 localStorage	不能跨域 	不能跨浏览器 	没有过期时间	不会随着请求发送到服务器 使用简单	大小5MB(超出的话新加的内容会顶掉最开始的内容，先进先出)    
    设置 localStorage.a = 12;	获取 alert(localStorage.a);	删除:delete localStorage.a; window.onstorage 当localStorage改变的时候触发(模拟多窗口通信 )    
    持久化（序列化）对象->字符串 JSON.stringify(); 反持久化（反序列化）字符串->对象 JSON.parse(); 存入时候要持久化，拿出来得到时候要反持久化    
    delete  删除属性	delete 	obj.value;	var json = {a:1,b:2,c:3};	delete json.c;    
    video  autoplay自动播放  controls控制台  oV.play() 播放  oV.pause() 暂停  oV.muted 是否静音  oV.volume 设置音量 oV.currentTime 当前时间  oV.duration 总时间    
    navigator.geolocation   getCurrentPosition() 获取当前位置 watchPosition()监控实时位置 clearWatch()关闭监控    
    
### canvas
    canvas画布 var gd = oC.getContext('2d');获取绘图上下文   gd.beginPath();  gd.moveTo(x,y);落笔点  gd.lineTo(x,y); gd.stroke();描边  gd.fill();填充  gd.lineWidth 设置线宽
    gd.strokeStyle 描边颜色  gd.fillStyle 	填充颜色  gd.closePath() 闭合路径
    gd.fillRect(x,y,w,h) 填充矩形  gd.strokeRect(x,y,w,h); 描边矩形   清空 gd.clearRect(x,y,w,h);
      
### css3   
    css3标签 -webkit-mask(蒙版)
    浏览器兼容问题-webkit-transition兼容chrome,safari,opera   -moz-transition 兼容firefox   -ms-transition 兼容ie   -o-transition 兼容旧版opera  transition 最终目标不加前缀
    transform不会引起重排。因为不改变盒子模型。平移 translate   旋转rotate 	缩放scale  扭曲skew
    translateX垂直向偏移	translateY水平向偏移	translateZ纵向偏移
    -webkit-transform-origin 改变transform运动的原点
    3D(加给父级) -webkit-transform-style:preserve-3d; 把2d变成3d 
    rotateX 垂直向旋转	rotateY水平向旋转(从上往下看顺时针是负的)  (旋转与透视搭配使用效果明显，透视 perspective(px);(一般使用800px~1200px)，加给父级)
    蒙版(只要有颜色的地方就会透出来。) -webkit-mask:url() no-repeat x y;(可用gif动态图) -webkit-mask:-webkit-linear-gradient(rgba(0,0,0,0) 20%,rgba(0,0,0,1));
    文字蒙版   -webkit-background-clip:text;只有透明的文字才能透出颜色。
    阴影box-shadow:[inset] x偏移 y偏移 blur [扩展边框] color;   box-shadow:5px 0 5px 5px red , 0 5px 5px 5px green, -5px 0 5px 5px orange, 0 -5px 5px 5px black;
    文字阴影  text-shadow:x偏移 y偏移 blur color;   text-shadow:5px 5px 5px #fff,10px 10px 5px #F60;
   
### 运动
    -webkit-transition:1s(运动花费的时间) all(需要运动的样式，写all 表示所有样式) ease(运动方式可以放ease/ease-in/ease-out/linear);
    线性渐变 background:-webkit-repeating-linear-gradient(-45deg[left top],green 0%, green 33%, #fff 33%,#fff 66%,red 66%);
    径向渐变 background:-webkit-radial-gradient(left top[50px 50px],black 50%,#fff 50%);(默认从最中心点开始变)
    transitionend事件  当transition结束的时候触发(DOM3事件必须用事件绑定)
     
    高级运动 @-webkit-keyframes test{0%{background: red; width:200px;}	50%  {background: blue; width:600px;}	100% {background: green; width:1000px;}}
    -webkit-animation-name:text(运动名字)  -duration:1s; 时间  -timing-function:ease; 运动类型  -iteration-count:infinite(无限);次数(默认是1次)  
    -direction:alternate(交替); 走向(默认是normal)  -delay: 2s; 默认延迟多久后开始

### 正则
    正则表达式(规则表达式),操作字符串  正则对象 var re = new RegExp('规则','选项');	简写：re=/规则/选项
    选项 i忽略大小写(ignore)   g全局匹配(global)    m多行模式(muti-line)通过enter检测(行首行尾默认是单行模式，只有一个^和$)
    修饰^行首   $行尾   查找:search(re);返回值是对应下表位置或者-1	匹配:match(re);返回值是一个数组    检测:re.text(str)返回值是boolean,使用test时，
    正则必须加行首和行尾	replace(str|re,str|fn);返回值是一个字符串
    
    方括号[]表示任选一个或范围或者排除
    1.任选一个  表达式：a[abc]c		aac(√)		abc(√)		acc(√)		aabcc(×)
    表达式：a[ab+]c		abbbbbbc(√)	aaaaaaaac(×)
    表达式：a[(ab)+]c	aabababababc(√)	aababac(×)
    2.范围   [0-9]表示的范围是0-9的所有整数    [3-7]表示的范围是3-7的所有整数    [14-79]表示的范围是1,4,5,6,7,9
    [a-z]所有的小写字母   [A-Z]所有的大写字母   [a-zA-Z]所有的英文字母
    [0-9a-zA-Z]所有的数字和英文字母
    3.排除  [^0-9]除了数字我都要   [^0-9a-z]不要数字不要小写字母
     
    量词 {n} 有n个   {n,m} 最少有n个，最多有m个    {n,} 最少n个，最多不限
    ?{0,1} 有一次或者一次都没有   *{0,} 没有，或者有，有多少都不管    +{1,} 出现一次或者多次。(推荐)
     
    转义  \ 转义符   \d [0-9]所有数字    \w [0-9a-zA-Z_]	所有数字所有字母下划线   \s 所有空白符号(包括enter 空格tab等)
    \D [^0-9] 除了数字   \W 除了数字字母下划线   \S 除了空白符号
    . 表示所有  \. 表示字符点   \\表示字符\	(alert('a\\b');)弹出a\b
    \-表示字符-   \b 表示单词边界(boundary)  \bred\b表示 red 这个单词（以单词两边的空格来识别）
    \t 制表符(是转义但不是正则中的转义，出现空格)    \n 换行(是转义但不是正则中的转义)	(alert('a\nb');)弹出a下一行一个b
     
    邮箱校验：a_a@b-b.com.cn     eMailRe = /^\w+@[0-9a-zA-Z\-]+(\.[a-zA-Z]{2,8}){1,2}$/;
    固定电话校验：010-4847474第一位必须是0,第二位必须不是0;   eMailRe = /^0[1-9]\d{1,2}\-[1-9]\d{6,7}$/;
    年龄校验：最小18岁,最大100岁;     yearOldRe = /^((1[89])|([2-9]\d)|(100))$/;如果不加括号2-9开头的两位数以上的都可以取到
    手机校验:11位数字,第一位必须是1,第二位3|4|5|7|8;     phoneRe = /^1[3-578]\d{9}$/;
    身份证号校验:15位或者18位，最后一位可能是x|X;     re = /^(\d{14}[\dxX]|\d{17}[\dxX])$/;
    
### dom方面
    obj.tagName 标签名 obj.nodeType 节点类型  obj.parentNode 结构上的父级 最大是document  obj.offsetParent 定位上的父级 最大是body
    可视区宽高document.documentElement.clientWidth/Height   滚动距离 document.documentElement.scrollTop/Left||document.body.scrollTop/Left;
    创建document.createElement(标签名)或者用innerHTML  添加appendChild(要插入的) insertBefore(要插入的,要插入谁之前); 删除 removeChild(要删除的元素)  深度克隆cloneNode(true)(克隆后必须干掉id)
    事件对象：保存了事件的详细信息,常用的是，获取鼠标和键盘的信息 var oEvent = ev||event; 
    clientX/Y 获取鼠标在可视区中的位置信息 srcElement 获取触发事件的源头  target 获取触发事件的源头
    keyCode 获取到键盘编码 ctrlKey,shiftKey,altKey  preventDefault() 阻止默认事件  fromElement 鼠标从哪来的  toElement 鼠标去哪儿   relatedTarget 	解决over和out的
    cancelBubble  控制冒泡    wheelDelta	鼠标滚轮事件(chrome/IE)   detail  鼠标滚轮事件(FF)   oEvent.pageX/Y 	获取鼠标在页面中的位置(只兼容高级浏览器)
    oDate.toGMTString() 转成GMT格式(格林威治时间)  oDate.toLocalString() 转成GMT格式
    缓存问题 t = Math.random()	t = new Date().getTime();   编码一定要统一：gb2312 中国大陆编码(政府网站常用)	utf-8 国际编码
    
### 事件
    创建图片 document.createElement('img');  var oImg = new Image(); oImg.src = '';
    图片事件oImg.onload = function(){};   oImg.onerror = function(){};
    取消冒泡 oEvent.cancelBubble = true;
    oEvent.keyCode获取键码 	 功能键oEvent.ctrlKey  	oEvent.shiftKey	 oEvent.altKey  如果按下返回true
    右键事件：oncontextmenu  window.location.reload();刷新功能
    双击事件：ondblclick当双击的时候出发的事件
    document.body.scrollHeight 表示内容的高度
    addEventListener不能用oEvent.preventDefault() 阻止默认事件
        
### ECMA基础
    Math常用方法 Max  Min  PI  random   ceil向上取整   floor   round  abs pow()  sqrt  sin cos atan2
    数组常用方法 push  pop  reverse unshift   shift     concat join  sort  splice 删除，添加，替换
    字符串常用方法 replase(被替换的字符，替换的内容)  substring()截取字符串    charAt()查找某一位置的字符    split()字符串转数组	toLowerCase()	toUpperCase()	lastIndexOf()  charCodeAt(下标) 返回指定位置字符的编码  String.fromCharCode(字符编码) 返回指定编码的字符
    indexOf 查找一个字符（字符串）在字符串中是否存在，如果存在返回字符所在位置，如果不存在，返回-1
    检测一个浏览器是不是IE6	  window.navigator.userAgent.indexOf('MSIE 6.0')!=-1
    检测一个问题件的类型avi	  str.substring(str.lastIndexOf('.')+1) == 'avi'	
    0x开头表示是16进制，unicode中汉字范围0x4e00 ------ 0x9fa5一共20901个汉字 字节长度 1KB  = 1024B，在utf-8中1个英文字符是1个字节，1个汉字是3个字节
    字符串的length只能获取，不能设置；数组的length可以设置也可以获取
    