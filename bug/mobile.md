##css部分

### 有时候，我们并未给图片（img标签）设置margin-bottom值，在有一些浏览器里也会出现底部留白

    方案1：把图片设为块级元素， 如：img{display:block;}
    方案2：设置图片的垂直对齐方式， 如：img{vertical-align:top;}(vartical-align的值可选，text-top，bottom，text-bottom等，视情况而定。)
    方案3：设置父对象的文字大小为0px
    方案4： 改变父对象的属性，如果父对象的高宽固定，图片大小随父对象而定，则可以设置父对象：overflow:hidden;
    方案5： 设置图片的浮动属性， 如：img{float:left;}
    方案6：取消图片标签和其父对象的最后一个结束标签间的空格，  这个实现起来有些困难，我们往往会为了使页面代码层次清晰而加上一些空白缩进。

### 移动端如何定义字体font-family

    说明：各个手机系统有自己的默认字体，且都不支持微软雅黑
    
    解决方案：英文字体和数字字体可使用Helvetica,ios,android,winphone三种系统都支持body{font-family:Helvetica;}
    
### 如何将px标注图转化为rem布局
    
    方案1：使用sass函数和混合宏,sass文件中的px 直接使用px 经过编译和postcss会生成rem的css供页面使用
    @function px2rem($px, $base-font-size: 75px) {
      @if (unitless($px)) {
        @warn "Assuming #{$px} to be in pixels, attempting to convert it into pixels for you";
        @return px2rem($px + 0px);
      } @else if (unit($px) == rem) {
        @return $px;
      }
      @return ($px / $base-font-size) * 1rem;
    }
    
    方案2：使用npm插件px2rem
    
    方案3：比较流行Font-size=62.5%，而后1rem=10px的这种方法，
    
### rem布局中，rem取值问题
    1.1rem=16px；这个是默认的大小。
    
    2.1rem= 75px；这个是手淘团队在flexible方案中在iphone6中的显示结果。flexible方案核心就是根据屏幕的dpr和尺寸，动态算出当前页的rem大小，
    动态的修改meta标签。该方案目前也被应用在手淘首页中.(最出名，应用最广)
    
    3.1rem=100px；这个是阿里旗下的蚂蚁金服在Ant-mobile中的方案；（当然很多公司 也才用也采用此方案，因为100px比较好运算）ant-mobile也有自己高清解决方案，
    其核心跟flexible类似。现应用于ant-mobile中。
    
### 什么是Retina 显示屏，带来了什么问题
    
    说明：retina是一种具备超高像素密度的液晶屏,图片会变得模糊，因此移动端的视觉稿通常需要设计为传统PC的2倍
    .window.devicePixelRatio是设备上物理像素和设备独立像素(device-independent pixels (dips))的比例。
    无视网膜设备devicePixelRatio值为1，视网膜设备为2. 因为实际的像素个数是双倍。
    设备像素：设备硬件的物理像素
    设备分辨率：设备硬件所能支持的分辨率 每个数字代表每个设备像素
    逻辑像素：软件所支持的像素
    逻辑分辨率：软件所能支持的分辨率 每个数字代表了每个逻辑像素
    CSS像素：在css文件中使用的px是一个相对单位 比如css中的1px 控制显示的是1逻辑像素 每个逻辑像素则由不同的物理像素控制
    dpr（Device Pixel Ratio: Number of device pixels per CSS Pixel）: 设备像素比 也叫dppx 就是一个css像素控制几个物理像素
    ppi: 像素密度 （Pixel Per Inch）单位面积含有的物理像素个数
    Math.sqrt(750750 + 13341334) / 4.7 = 326ppi
    dpi:含义相同于ppi 表示单位面积上 含有的逻辑像素个数

    方案1：设计稿切出来的图片长宽保证为偶数，并使用backgroud-size把图片缩小为原来的1/2
    
    方案2：sasa中使用：
    @mixin font-dpr($font-size){
      font-size: $font-size * 1px;
    
      [data-dpr="1"] & {
        font-size: $font-size * .5px;
      }
    
      [data-dpr="2"] & {
        font-size: $font-size * 1px;
      }
    
      [data-dpr="3"] & {
        font-size: $font-size * 1.5px;
      }
    }
    
    方案3：flexible的px2rem会自动处理,
    div {
        width: 1rem;
        height: 0.4rem;
        font-size: 12px; // 默认写上dpr为1的fontSize
    }
    
    [data-dpr="2"] div {
        font-size: 24px;
    }
    
    [data-dpr="3"] div {
        font-size: 36px;
    }
    
### ios系统中元素被触摸时产生的半透明灰色遮罩,部分android系统中元素被点击时产生的边框怎么去掉
    
    说明：android/ios用户点击一个链接，会出现一个边框或者半透明灰色遮罩
    
    解决方案(小米2去不了)：a,button,input,textarea{-webkit-tap-highlight-color: rgba(0,0,0,0;)}
    对于按钮类还有个办法，不使用a或者input标签，直接用div标签。
    
### webkit表单元素的默认外观怎么重置    
    
    .css{-webkit-appearance:none;}
    
### webkit表单输入框placeholder改变颜色值
    
    input::-webkit-input-placeholder{color:#AAAAAA;}
    input:focus::-webkit-input-placeholder{color:#EEEEEE;}
    

 ### 手机拍照和上传图片
    
    input type="file"的accept 属性,使用总结：ios 有拍照、录像、选取本地图片功能，
    部分android只有选取本地图片功能;winphone不支持;input控件默认外观丑陋
        <!-- 选择照片 -->
    <input type=file accept="image/*" multiple>
        <!-- 选择视频 -->
    <input type=file accept="video/*" multiple>
        
### 阻止用户调整字体大小
    
    ios下，body{-webkit-text-size-adjust: 100%!important;}
    解决方案：整个页面用rem或者百分比布局
        
### 桌面端和移动端用CSS开启硬件加速(即使GPU (Graphics Processing Unit)发挥功能)，作用：解决页面闪白，保证动画流畅(注意：硬件加速增加内存占用)
        
    方案一：元素的3D变换
        .cube { 
            -webkit-transform: translate3d(250px,250px,250px)   rotate3d(250px,250px,250px,-120deg)   scale3d(0.5, 0.5, 0.5);
        }
        
    方案二：用transform: translateZ(0); 来开启硬件加速(在不需要3D效果的时候使用)
        .cube {
            -webkit-transform: translateZ(0);  
            -moz-transform: translateZ(0);  
            -ms-transform: translateZ(0);  
            -o-transform: translateZ(0);  
            transform: translateZ(0);
        }
        
### 取消input在ios下，输入的时候英文首字母的默认大写

    在iOS中，当虚拟键盘弹出时，默认情况下键盘是开启首字母大写的功能的,以下是关闭该功能方式
    <input autocapitalize="off" autocorrect="off" />
    
### android 上去掉语音输入按钮

    input::-webkit-input-speech-button {display: none}
    
### iOS中如何彻底禁止用户在新窗口打开页面
        
    有时我们可能需要禁止用户在新窗口打开页面，我们可以使用a标签的target=”_self“来指定用户在新窗口打开，或者target属性保持空，
    但是你会发现iOS的用户在这个链接的上方长按3秒钟后，iOS会弹出一个列表按钮，用户通过这些按钮仍然可以在新窗口打开页面，这样的话，
    开发者指定的target属性就失效了，但是可以通过指定当前元素的-webkit-touch-callout样式属性为none来禁止iOS弹出这些按钮。这个技巧仅适用iOS对于Android平台则无效。    
        
### 关于border-radius的兼容问题
    
    问题2：Android 2.3 自带浏览器不支持%
    解决方案：使用一个较大值，比如border-radius: 999px;
    
    问题1：当 img 元素有border 时设置border-radius 会导致圆角变形
    解决方案：在img 外面嵌套一个元素并设置border 和border-radius。
        
    问题3：Android 4.2.x 背景色溢出
    解决方案：在 Android 4.2.x系统自带浏览器中，同时设置border-radius和背景色的时候，背景色会溢出到圆角以外部分，需要是使用background-clip: padding-box;
        
    问题4：Android 4.2.x 不支持border-radius缩写
    解决方案：使用border-radius的四个扩写属性，缩写属性放到最后。代码实现：
        border: 5px solid blue;
        border-top-left-radius: 999px; //左上角
        border-top-right-radius: 999px; //右上角
        border-bottom-right-radius: 999px; //右下角
        border-bottom-left-radius: 999px; //左下角
        border-radius: 999px;
    说明：影响到 Android 4.2.x内核的系统以及在其基础上定制的系统的自带浏览器，比如：红米，小米3，阿里云OS 等，安卓版 Chrome 不受影响。
        
### 关于flex弹性布局
    
    flex下的子元素必须为块级元素，非块级元素在android2.3机器下flex失效
    flex下的子元素宽度和高度不能超过父元素，否则会导致子元素定位错误，例如水平垂直居中
    当你设置了一个元素为伸缩容器的时候，它只会影响他的子元素，而不会进一步的影响他的后代元素。
    
### video标签脱离文档流
    
    video标签的父元素(祖辈元素)设置transform样式后，<video>标签会脱离文档流。
    测试环境：UC浏览器 8.7/8.6 + Android 2.3/4.0 。
    Demo：http://t.cn/zj3xiyu
    解决方案：不使用transform属性。translate用top、margin等属性替代。
    
### body如果设置height:100%;overflow:hidden是依然可以滑动的，

    如果需禁止，要再加一层div设置 height:100%加overflow：hidden（html,body加height:100%） ，这样元素超出body的高度也不能滑动了。或者同时给html，body加height:100%;overflow:hidden 
    
### u图尺寸    
    做全屏显示的图片时，一般为了兼容大部分的手机，图片尺寸一般设为640*960（我是觉得这个尺寸好，也看不少的图片也是这个尺寸，视情况而定）
    
### 去除webkit的滚动条   
    
    element::-webkit-scrollbar{
       display: none;
    }
    
### 去除button在ios上的默认样式     
    
    -webkit-appearance: none;
    border-radius: 0 
    
### 不想让按钮touch时有蓝色的边框

     -webkit-tap-highlight-color:rgba(0,0,0,0);
     
### input为fixed定位在ios下的bug问题:input固定定位在顶部或者底部，在页面滚动一些距离后，点击input(弹出键盘)，input位置会出现在中间位置。
    android下fixed表现要比iOS更好，软键盘弹出时，不会影响fixed元素定位。
    ios3.2~4.3，ios4下，魅族MX2/自带浏览器不支持position:fixed。
    方案1：可用isroll.js。
    方案2: 我是当focus时就把它设为absolute。
    方案3：使用userAgent检测，如果是魅族MX2自带浏览器则禁用 position:fixed，使用 position:relative 代替。
    总结：不要在 fixed 元素中使用 input / textarea 元素。是保留之前的态度，依然不推荐在 Android下使用 iScroll。在开发项目时，
    可以考虑分为两个版本：iOS下使用 iScroll的解决方案，Android下使用 position:fixed。  
    方案4：如果要用到fixed譬如导航等，可以用absolute达到一样的效果，把body设为100%；将元素absolute到body上即可，
    不过这样不能让body滚动，如果需要有滚动的地方，就放在div中滚动
    方案5：可以使用内容列表框也是fixed定位,这样不会出现fixed错位的问题
     
### 移动端动画问题
    在移动端做动画效果的话，如果通过改变绝对定位的top，或者margin的话做出来的效果很差，很不流畅，而使用css3的transition或者animation的效果将会非常棒（这一方面IOS比android又要好不少）。
    如果用translate3d来实现动画，会开启GPU加速，硬件配置差的安卓用起来会耗性能，需慎用     
     
### 使用 a 标签的话，尽量让 a 标签 block ，尽量让用户可点击区域最大化

### 禁止用户选中文字   -webkit-user-select:none

### 做一个方向箭头比如  “>” 时，可以用一个正方形的div，设置border:1px 1px 0 0；然后rotate(45deg)

### 使用rem时，设某个div比如的height:3rem;line-height:1.5rem;overflow:hidden;时，在某些android手机上可能会出现显示不止两行,第三行会显示点头部。
    方案：利用js获取文字line-height再去设置div高度

### ios下input设置type=button属性disabled设置true,会出现样式文字和背景异常问题
    方案：使用opacity=1来解决

### 一些情况下对非可点击元素如(label,span)监听click事件，ios下不会触发
    方案;css增加cursor:pointer就搞定了
    
### 移动端字体小于12px使用四周边框或者背景色块，安卓文字偏上bug问题，可以使用整体放大1倍再缩放，而且字体尽量不要是奇数
    
### 

##js部分

### 点击一个元素时，使用touchstart会立即触发，而使用click则用有大概0.3s的延迟

    说明：因为设备要识别是单机事件还是双击缩放事件，双击缩放是指用手指在屏幕上快速点击两次，iOS自带的 Safari 浏览器会将网页缩放。
    
    解决方案：通过绑定ontouchstart事件，加快对事件的响应 zepto的touch模块，tap事件也是为了解决在click的延迟问题，fastclick可以解决在手机上点击事件的300ms延迟.

### audio元素和video元素在某些版本的ios和andriod中无法自动播放
   
    应对方案：触屏即播，$('html').one('touchstart',function(){	audio.play() })
    
### 屏幕旋转的事件和样式
       
    window.onorientationchange事件触发的window.orientation属性取值：ipad  90或者-90横屏，0或者180竖屏    Andriod  0或者180横屏，90或者-90竖屏

### 在h5嵌入app中，ios如果出现垂直滚动条时，手指滑动页面滚动之后，滚动很快停下来，好像踩着刹车在开车，有“滚动很吃力”的感觉.
    self.webView.scrollView.decelerationRate = UIScrollViewDecelerationRateNormal;对webview设置了更低的“减速率”

### input 有placeholder情况下不要设置行高，否则会placeholder文字会偏上

```javascript
window.onorientationchange = function(){
    switch(window.orientation){
            case -90:
            case 90:
                  alert("横屏:" + window.orientation);
             case 0:
             case 180:
                 alert("竖屏:" + window.orientation);
         break;
    }
}  
```
### 横屏和竖屏使用不同的样式
    
    竖屏时使用的样式: @media all and (orientation:portrait) { .css{}	}
    横屏时使用的样式: @media all and (orientation:landscape) { .css{} }
    
### 如何判断自己的设备是ios还是安卓(ua检测)

```javascript
 var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf("ipad") > 0) {
    alert('是ipad');
} else if(ua.indexOf("android">0){
    alert('是android');
} else if(ua.indexOf("iphone") > 0){
    alert('是iphone')
}
```
   
## 微信部分
    
### 判断是否来自微信浏览器
    
```javascript
function isFromWeiXin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    }
    return false;
}
```
 
### 微信浏览器里均不能打开下载的链接，需在浏览器打开

### 果在网页里嵌套一个iframe，src为其他的网址等，当在微信浏览器打开时，如果irame里的页面过大，则iframe的src不能加载（具体多大不知道，只是遇到过）

### 
    