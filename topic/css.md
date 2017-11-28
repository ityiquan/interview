### Quirks模式是什么？它和Standards模式有什么区别？

    如果写了<!document http>，就是标准模式，如果没有写，就是Quirks模式（诡异模式，怪异模式）。
    区别：总体会有布局、样式解析和脚本执行三个方面的区别。
    盒模型：在W3C标准中，如果设置一个元素的宽度和高度，指的是元素内容的宽度和高度，而在Quirks 模式下，IE的宽度和高度还包含了padding和border。
    设置行内元素的高宽：在Standards模式下，给<span>等行内元素设置wdith和height都不会生效，而在quirks模式下，则会生效。
    设置水平居中：使用margin:0 auto在standards模式下可以使元素水平居中，但在quirks模式下却会失效。

### 简述一下src与href的区别。
    src用于替换当前元素，href用于在当前文档和引用资源之间确立联系。
    当浏览器解析到<script src =”js.js”></script>时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。
    这也是为什么将js脚本放在底部而不是头部。
    href指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，
    那么浏览器会识别<link href=”common.css” rel=”stylesheet”/>为css文件，就会并行下载资源并且不会停止对当前文档的处理。这也是为什么建议使用link方式来加载css，而不是使用@import方式。

### 清除浮动的几种方式，各自的优缺点
    使用空标签清除浮动 clear:both（理论上能清楚任何标签，，，增加无意义的标签）
    使用overflow:auto（空标签元素清除浮动而不得不增加无意代码的弊端,,使用zoom:1用于兼容IE）
    是用afert伪元素清除浮动(用于非IE浏览器)
    
### 什么是CSS Hack？ie6,7,8的hack分别是什么？

```
针对不同的浏览器写不同的CSS code的过程，就是CSS hack。如
_marging \\IE 6
+margin \\IE 7
Marging:0 auto \9 所有Ie
Margin \0 \\IE 8

```

### 么是外边距重叠？重叠的结果是什么？
    答案：外边距重叠就是margin-collapse。
    在CSS当中，相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。这种合并外边距的方式被称为折叠，并且因而所结合成的外边距称为折叠外边距。
    折叠结果遵循下列计算规则：
        两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。
        两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。
        两个外边距一正一负时，折叠结果是两者的相加的和。

### rgba()和opacity的透明效果有什么不同？
    答案：rgba()和opacity都能实现透明效果，但最大的不同是opacity作用于元素，以及元素内的所有内容的透明度，
    而rgba()只作用于元素的颜色或其背景色。（设置rgba透明的元素的子元素不会继承透明效果！）
    
###  如何垂直居中一个浮动元素？
     	方法一：已知元素的高宽（父元素需要相对定位）
     	    #div1{background-color:#6699FF;width:200px;height:200px;position: absolute;top: 50%;left: 50%;margin-top:-100px ;   //二分之一的height，widthmargin-left: -100px;}
        方法二:未知元素的高宽（父元素需要相对定位）
            #div1{width: 200px; height: 200px; background-color: #6699FF;margin:auto;position: absolute;left: 0;top: 0; right: 0;bottom:0;}

### 如何垂直居中一个<img>?（用更简便的方法。<img>的容器设置如下）
    #container{display:table-cell;text-align:center;vertical-align:middle;} 
              
            
                
    

        





