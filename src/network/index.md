### 浏览器输入url到整个页面显示出来经历的过程。
    hosts查询映射——>DNS解析——>建立连接——>发起请求——>等待响应——>接受数据——>处理元素——>布局渲染
    http://blog.csdn.net/android1514/article/details/51281494
    http://www.cnblogs.com/SarahLiu/p/5954832.html
    
    简单描述：
    查找浏览器缓存     DNS解析、查找该域名对应的IP地址、重定向（301）、发出第二个GET请求    进行HTTP协议会话    客户端发送报头(请求报头)    服务器回馈报头(响应报头)    html文档开始下载    文档树建立，根据标记请求所需指定MIME类型的文件    
    文件显示  [浏览器这边做的工作大致分为以下几步：    加载：根据请求的URL进行域名解析，向服务器发起请求，接收文件（HTML、JS、CSS、图象等）。    解析：对加载到的资源（HTML、JS、CSS等）进行语法解析，建议相应的内部数据结构（比如HTML的DOM树，JS的（对象）属性表，CSS的样式规则等等)}
   
    详细描述： 
    http是一种基于TCP协议的网络传输协议，工作在应用层，有客户端和服务器。整体通信：
    第一步，创建连接
    域名解析得到网站的ip地址，然后向这个ip地址发送一个连接建立的请求，服务器接收到请求后返回一个确认，客户端得到确认再次发送确认，连接建立成功。
    第二步服务器处理
    建立好连接后，客户端就会发送http请求，请求信息包含一个头部和一个请求体，在请求对象中可以得到path（路径），queryString（查询字符串），body（post请求中提交的数据）等。
    根据path找到客户端想要的文件，读取这个文件，然后通过响应对象把一个响应头和一个响应体返回给客户端。设置响应头就是设置content-type。
    这个处理过程很复杂，有数据的操作，页面的构建，路径的查找匹配，文件的读取等，于是就出现了MVC框架以及各种MV*框架。MVC作用就是解耦和模块化。我认为MVC实现最重要的有两点：
    路由匹配，http请求的path中就不需要指定到具体的视图位置，而是按照我们制定的规则进行匹配，这样就有了很大的灵活性，可编程性。
    模板技术，一般来说我们最后返回给客户端的是一个html字符串，而有时候这个字符需要和数据进行结合，需要拼接。模板技术为解决这个问题带来很大的便利性，同时又能够把视图和数据进行解耦。
        第三步，客户端渲染
    客户端接收到服务器传来的响应对象，从中得到html字符串和MIME，根据MIME知道了要用页面渲染引擎来处理内容即html字符串，于是进入页面渲染阶段：
    从浏览器的角度讲，它包含几大组件，网络功能（比如http的实现），渲染引擎，自己的UI界面，javascript解释器，客户端数据存储等。我们主要关注渲染引擎和javascript解释器。
    我们能够在浏览器中看到一个页面，实际上就是调用底层绘图API给画出来的。不同的渲染引擎，它的实现也不同，主流的引擎包括IE的Trident，chrome和safary的webkit，firefox的Gecko，chrome又出了一个Blink，放弃webkit。所以才有了让人头疼的各种兼容性问题。
    整体上页面渲染的过程大致是这样的：
    渲染引擎得到html字符串作为输入，然后对html进行转换，转化成能够被DOM处理的形式，接着转换成一个dom树，在解析html的过程，解析到<link>,<script>,<img>等一些请求标签时，会发送请求把对应的内容获取到。这时又会同步进行css的解析，构建出css样式规则应用到dom树上，
    然后进行一定的布局处理，比如标记节点块在浏览器中的坐标等形成最终的渲染树，最后根据这棵渲染树在浏览器窗口中进行绘制。最终我们就看到了页面的样子。
    当然在页面渲染过程中还会同步进行javascript的解析，而且这两者是在同一个线程中的，所以一旦javascript死循环，页面的渲染也就进行不下去了。
    以上是我从一个web开发者的角度思考的整个过程。如果从别的角度更细化的去想，还包括比如整个网络通信中协议的封装：
    在本机中，把要传输的内容即请求对象在应用层上加上App首部，传递到传输层加上TCP首部，到网络层加上IP首部，数据链路层加上以太网的首部和尾部，然后转换成bit流进入网络环境中。到达主机后在一层层解封装，最后把内容交给服务器程序。
    再比如这个过程中的认证，加密，安全，编码等问题都会有一定的处理，不过这些内容我就不是很了解。


### http状态码
    301 (SC_MOVED_PERMANENTLY永久重定向),状态是指所请求的文档在别的地方；文档新的URL会在定位响应头信息中给出。浏览器会自动连接到新的URL。
    302 (Found/找到，临时重定向),与301有些类似，只是定位头信息中所给的URL应被理解为临时交换地址而不是永久的 
    304 (Not Modified/为修正),当客户端有一个缓存的文档，通过提供一个 If-Modified-Since 头信息可指出客户端只希望文档在指定日期之后有所修改时才会重载此文档，用这种方式可以进行有条件的请求。
    400 (Bad Request/错误请求),400 (SC_BAD_REQUEST)指出客户端请求中的语法错误。 
    401 (Unauthorized/未授权),401 (SC_UNAUTHORIZED)表示客户端在授权头信息中没有有效的身份信息时访问受到密码保护的页面。这个响应必须包含一个WWW-Authenticate的授权信息头.
    403 (Forbidden/禁止),403 (SC_FORBIDDEN)的意思是除非拥有授权否则服务器拒绝提供所请求的资源。
    405 (Method Not Allowed/方法未允许),405 (SC_METHOD_NOT_ALLOWED)指出请求方法(GET, POST, HEAD, PUT, DELETE, 等)对某些特定的资源不允许使用。
    406 (Not Acceptable/无法访问),406 (SC_NOT_ACCEPTABLE)表示请求资源的MIME类型与客户端中Accept头信息中指定的类型不一致。
    408 (Request Timeout/请求超时),408 (SC_REQUEST_TIMEOUT)是指服务端等待客户端发送请求的时间过长。
    410 (Gone/已经不存在),410 (SC_GONE)告诉客户端所请求的文档已经不存在并且没有更新的地址。    
    414 (Request URI Too Long/请求URI过长),414 (SC_REQUEST_URI_TOO_LONG)状态用于在URI过长的情况时。这里所指的“URI”是指URL中主机、域名及端口号之后的内容。例如：在URL--http://www.y2k-disaster.com:8080/we/look/silly/now/中URI是指/we/look/silly/now/。
    415 (Unsupported Media Type/不支持的媒体格式),415 (SC_UNSUPPORTED_MEDIA_TYPE)意味着请求所带的附件的格式类型服务器不知道如何处理。
    500 (Internal Server Error/内部服务器错误),500 (SC_INTERNAL_SERVER_ERROR) 是常用的“服务器错误”状态。
    501 (Not Implemented/未实现),501 (SC_NOT_IMPLEMENTED)状态告诉客户端服务器不支持请求中要求的功能。
    502 (Bad Gateway/错误的网关),被用于充当代理或网关的服务器,该状态指出接收服务器接收到远端服务器的错误响应。 
    503 (Service Unavailable/服务无法获得)状态码503 (SC_SERVICE_UNAVAILABLE)表示服务器由于在维护或已经超载而无法响应。例如，如果某些线程或数据库连接池已经没有空闲则servlet会返回这个头信息。服务器可提供一个Retry-After头信息告诉客户端什么时候可以在试一次。   
    504 (Gateway Timeout/网关超时)该状态也用于充当代理或网关的服务器；它指出接收服务器没有从远端服务器得到及时的响应。  
    505 (HTTP Version Not Supported/不支持的 HTTP 版本),505 (SC_HTTP_VERSION_NOT_SUPPORTED)状态码是说服务器并不支持在请求中所标明 HTTP 版本。

### 性能优化
    -.页面架构方面    
        1.将CSS和JS放到外部文件中引用，CSS放头，JS放尾，用<link>代替@import，因为@import相当于将css放在网页内容底部。
        2.延迟加载，提高首屏加载速度
        3.优化加载方案， 提前加载：当前网页加载完成后，马上去下载一些其他的内容。例如google会在页面加载成功之后马上去下载一个所有结果中会用到的image sprite。按需加载：根据用户的输入推断需要加载的内容。预加载：比如轮播图加载左右两张图片。
    -. 缓存方面
        4.根据域名划分内容，静态内容和动态内容非别放在不同的domain下，静态域可避免使用cookie，减少cookie大小，利于缓存和proxy缓存（有些proxy拒绝缓存cookie），但域不可太多，2~4个合适，不然增加DNS查询时间
        5.通过设置Expires 或Cache-Control报文头来利用浏览器缓存
    -.请求方面
        6.减少HTTP请求，及图片优化处理
            文件打包，图片合并，图片懒加载，使用雪碧图或者base64，避免在HTML中缩放图片
        7.减少DNS查询
            如果我们的网页内容来自各个不同的domain (比如嵌入了开放广告，引用了外部图片或脚本)，那么客户端首次解析这些domain也需要消耗一定的时间。
        8.使用CDN，通过DNS负载均衡的技术，判断用户来源就近访问cache服务器取得所需的内容
        9.上线代码压缩，Gzip压缩HTTP请求,Gzip的思想就是把文件先在服务器端进行压缩，然后再传输(一般压缩率为85%).
        10.避免重定向，404，空的img src，避免无效请求    
    -.代码方面
        11.减少DOM元素数量，避免频繁DOM访问，多次访问时采取变量存储方式，减少Reflow和Repaint
        12.减少作用域链查找，减少闭包，优化循环和递归算法，避免内存泄露
        13.事件委托
        14.避免重定向
        15.合理利用css选择器匹配规则，因大多时候，一个DOM树中，符合匹配条件的节点（如.mod-nav h3 span）远远远远少于不符合条件的节点，CSS选择器的读取顺序是从右向左更加高效，所以最后的选择器更精确匹配查找更高效
    -. 移动端方面
        16.移动端单个文件解压后大小控制在25k左右，因为iphone，他只能缓存小于25K，注意这是解压后的大小。
    
### 页面渲染过程
    1.HTML代码转化成DOM
    2.CSS代码转化成CSSOM（CSS Object Model）
    3.结合DOM和CSSOM，生成一棵渲染树（包含每个节点的视觉信息）
    4.生成布局（layout），即将所有渲染树的所有节点进行平面合成（ 可引起重排）
    5.将布局绘制（paint）在屏幕上（可引起重绘）。
    "生成布局"（flow）和"绘制"（paint）这两步，合称为"渲染"（render）。
    
### 减少重排重绘技巧
    1.DOM 的多个读操作（或多个写操作），应该放在一起。不要两个读操作之间，加入一个写操作。
    2.如果某个样式是通过重排得到的，那么最好缓存结果。避免下一次用到的时候，浏览器又要重排。
    3.不要一条条地改变样式，而要通过改变class，或者csstext属性，一次性地改变样式。
    4.尽量使用离线DOM，而不是真实的网面DOM，来改变元素样式。比如，操作Document Fragment对象，完成后再把这个对象加入DOM。再比如，使用 cloneNode() 方法，在克隆的节点上进行操作，然后再用克隆的节点替换原始节点。
    5.先将元素设为display: none（需要1次重排和重绘），然后对这个节点进行100次操作，最后再恢复显示（需要1次重排和重绘）。这样一来，你就用两次重新渲染，取代了可能高达100次的重新渲染。
    6.position属性为absolute或fixed的元素，重排的开销会比较小，因为不用考虑它对其他元素的影响。
    7.只在必要的时候，才将元素的display属性为可见，因为不可见的元素不影响重排和重绘。另外，visibility : hidden的元素只对重绘有影响，不影响重排。
    8.使用虚拟DOM的脚本库，比如React等。
    9.使用 window.requestAnimationFrame()、window.requestIdleCallback() 这两个方法调节重新渲染,requestAnimationFrame可以做到这一帧做好所有的读操作, 下一帧统一做写的操作，requestIdleCallback只有当前帧的运行时间小于16.66ms时(如果网页动画能够做到每秒60帧，
    就会跟显示器同步刷新，达到最佳的视觉效果。这意味着，一秒之内进行60次重新渲染，所以每次重新渲染的时间不能超过16.66毫秒)，函数fn才会执行。否则，就推迟到下一帧，如果下一帧也没有空闲时间，它还可以接受第二个参数，表示指定的毫秒数。如果在指定 的这段时间之内，每一帧都没有空闲时间，
    那么函数fn将会强制执行。就推迟到下下一帧或者用对以上两个方法的封装插件fastdom。   
    
### cors
    阮一峰的网络日志 http://www.ruanyifeng.com/blog/2016/04/cors.html

### XSS
    攻击类型主要有两种：反射型和存储型
    如何防御: 转义, DOM解析白名单, 第三方库, CSP
    网络攻击类型: XSS,CSRF,点击劫持，Cookie安全，HTTP窃听篡改，密码安全，SQL注入，社会工程学
























