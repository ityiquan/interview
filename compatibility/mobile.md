
## meta标签

### Meta标签优化
	
	主要包括主题（Title)，网站描述(Description)，和关键词（Keywords）。还有一些其它的隐藏文字比如Author（作者），Category（目录），Language（编码语种）等。

### 1. 忽略将页面中的数字识别为电话号码

    <meta name="format-detection" content="telephone=no" />

### 2. 忽略Android平台中对邮箱地址的识别

    <meta name="format-detection" content="email=no" />

### 3. 当网站添加到主屏幕快速启动方式，可隐藏地址栏，仅针对ios的safari(ios7.0版本以后，safari上已看不到效果)

    <meta name="apple-mobile-web-app-capable" content="yes" />

### 4. 将网站添加到主屏幕快速启动方式，仅针对ios的safari顶端状态条的样式
    
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />

### 5. H5页面窗口自动调整到设备宽度，并禁止用户缩放页面
    
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">

## 移动端如何定义字体font-family

    说明：各个手机系统有自己的默认字体，且都不支持微软雅黑
    
    解决方案：英文字体和数字字体可使用Helvetica,ios,android,winphone三种系统都支持body{font-family:Helvetica;}
    
### 移动端click事件，屏幕产生200-300 ms的延迟响应。

    说明：因为设备要识别是单机事件还是双击缩放事件，双击缩放是指用手指在屏幕上快速点击两次，iOS自带的 Safari 浏览器会将网页缩放。
    
    解决方案：通过绑定ontouchstart事件，加快对事件的响应 zepto的touch模块，tap事件也是为了解决在click的延迟问题，fastclick可以解决在手机上点击事件的300ms延迟.
    
### 什么是Retina 显示屏，带来了什么问题
    
    说明：retina是一种具备超高像素密度的液晶屏,图片会变得模糊，因此移动端的视觉稿通常需要设计为传统PC的2倍
    .window.devicePixelRatio是设备上物理像素和设备独立像素(device-independent pixels (dips))的比例。
    无视网膜设备devicePixelRatio值为1，视网膜设备为2. 因为实际的像素个数是双倍。
    
    解决方案：设计稿切出来的图片长宽保证为偶数，并使用backgroud-size把图片缩小为原来的1/2
    
### ios系统中元素被触摸时产生的半透明灰色遮罩,部分android系统中元素被点击时产生的边框怎么去掉
    
    说明：android/ios用户点击一个链接，会出现一个边框或者半透明灰色遮罩
    
    解决方案(小米2去不了)：a,button,input,textarea{-webkit-tap-highlight-color: rgba(0,0,0,0;)}
    对于按钮类还有个办法，不使用a或者input标签，直接用div标签。
    
### webkit表单元素的默认外观怎么重置    
    
    .css{-webkit-appearance:none;}
    
### webkit表单输入框placeholder改变颜色值
    
    input::-webkit-input-placeholder{color:#AAAAAA;}
    input:focus::-webkit-input-placeholder{color:#EEEEEE;}
    
### webkit表单输入框placeholder的文字能换行么
    
    ios可以，android不行~	在textarea标签下都可以换
    
### 屏幕旋转的事件和样式
       
    window.onorientationchange事件触发的window.orientation属性取值：ipad  90或者-90横屏，0或者180竖屏    Andriod  0或者180横屏，90或者-90竖屏

```
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
    
    var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("ipad") > 0) {
            alert('是ipad');
         } else if(ua.indexOf("android">0){
            alert('是android');
         } else if(ua.indexOf("iphone") > 0){
            alert('是iphone')
         }
    
    
### audio元素和video元素在ios和andriod中无法自动播放
   
    应对方案：触屏即播，$('html').one('touchstart',function(){	audio.play() })
    
 ### 手机拍照和上传图片
    
    input type="file">的accept 属性,使用总结：ios 有拍照、录像、选取本地图片功能，
    部分android只有选取本地图片功能;winphone不支持;input控件默认外观丑陋
        <!-- 选择照片 -->
    <input type=file accept="image/*">
        <!-- 选择视频 -->
    <input type=file accept="video/*">
        
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
        
### 设计高性能CSS3动画的几个要素
                
    尽可能地使用合成属性transform和opacity来设计CSS3动画，
    不使用position的left和top来定位利用translate3D开启GPU加速。  
      
### position:fixed问题

    ios下fixed元素容易定位出错，软键盘弹出时，影响fixed元素定位。
    android下fixed表现要比iOS更好，软键盘弹出时，不会影响fixed元素定位。
    ios3.2~4.3，ios4下，魅族MX2/自带浏览器不支持position:fixed。
    解决方案1：可用isroll.js。
    解决方案2：使用userAgent检测，如果是魅族MX2自带浏览器则禁用 position:fixed，使用 position:relative 代替。
    总结：不要在 fixed 元素中使用 input / textarea 元素。是保留之前的态度，依然不推荐在 Android下使用 iScroll。在开发项目时，
    可以考虑分为两个版本：iOS下使用 iScroll的解决方案，Android下使用 position:fixed。
    
### 关于flex弹性布局
    
    flex下的子元素必须为块级元素，非块级元素在android2.3机器下flex失效
    flex下的子元素宽度和高度不能超过父元素，否则会导致子元素定位错误，例如水平垂直居中
    当你设置了一个元素为伸缩容器的时候，它只会影响他的子元素，而不会进一步的影响他的后代元素。
    
### video标签脱离文档流
    
    video标签的父元素(祖辈元素)设置transform样式后，<video>标签会脱离文档流。
    测试环境：UC浏览器 8.7/8.6 + Android 2.3/4.0 。
    Demo：http://t.cn/zj3xiyu
    解决方案：不使用transform属性。translate用top、margin等属性替代。
    
### 移动端目前遇到的挑战

    设备更新换代快——低端机遗留下问题、高端机带来新挑战
    浏览器厂商不统一——兼容问题多
    网络更复杂——弱网络，页面打开慢
    低端机性能差——页面操作卡顿
    HTML5新技术多——学习成本不低
    未知问题——坑多
    文档不够全面详细
    