# Node 第七天课程笔记

---

## Table of Contents

<!-- MarkdownTOC -->

  - [0. 反馈](#0-反馈)
  - [1. 复习](#1-复习)
  - [2. HTTP](#2-http)
    - [2.1 请求和响应](#21-请求和响应)
    - [2.2 HTTP 发展概览](#22-http-发展概览)
      - [HTTP/0.9](#http09)
      - [HTTP/1.0](#http10)
        - [Content-Type](#content-type)
        - [HTTP/1.0 缺点](#http10-缺点)
      - [HTTP/1.1](#http11)
        - [持久连接](#持久连接)
        - [HTTP/1.1 缺点](#http11-缺点)
      - [HTTP/2](#http2)
    - [2.3 CURL 工具](#23-curl-工具)
    - [2.4 分析 HTTP 请求和响应报文](#24-分析-http-请求和响应报文)
    - [2.5 浏览器的本质](#25-浏览器的本质)
    - [2.6 经典面试题（当用户在浏览器地址输入了一个地址敲回车之后发生的事情）](#26-经典面试题（当用户在浏览器地址输入了一个地址敲回车之后发生的事情）)
    - [2.7 HTTP 学习资源](#27-http-学习资源)
  - [3. 使用 http 核心模块构建 HTTP 服务](#3-使用-http-核心模块构建-http-服务)
    - [3.1 API](#31-api)
    - [3.2 根据不同的请求路径发送不同的响应内容](#32-根据不同的请求路径发送不同的响应内容)
    - [3.3 搭建一个终端下的静态资源服务器](#33-搭建一个终端下的静态资源服务器)
- [我的音乐](#我的音乐)
  - [1. 项目结构搭建](#1-项目结构搭建)
  - [2. 路由设计](#2-路由设计)
  - [3. 功能开发](#3-功能开发)
    - [3.1 首页音乐列表展示](#31-首页音乐列表展示)
    - [3.2 添加音乐](#32-添加音乐)
    - [3.3 删除音乐](#33-删除音乐)
    - [3.4 编辑音乐](#34-编辑音乐)
  - [在 node 中使用模板引擎](#在-node-中使用模板引擎)
  - [在node中处理表单提交](#在node中处理表单提交)
    - [处理 GET 请求](#处理-get-请求)
    - [处理普通表单 POST 请求（没有文件）](#处理普通表单-post-请求（没有文件）)
    - [处理有文件的表单提交](#处理有文件的表单提交)
  - [扩展](#扩展)
    - [ECMAScript Class](#ecmascript-class)
  - [目标](#目标)

<!-- /MarkdownTOC -->


## 0. 反馈

- 终端聊天程序
  + 掌握 **请求和响应** 的编程思维
    * 由客户端发出一个请求（具有一定格式的数据）
    * 服务器拿到客户端发出的请求内容，按照越好好的协议，将数据解析出来
    * 服务器按照不同的请求内容，做不同的处理逻辑
    * 服务器再次按照越约定好的数据协议将要发送的数据包装完毕之后响应给客户端
  + 数据协议的制定

- 使用nodejs做后台能不能部署到阿里云服务器上
  + 可以，可以部署到任何计算机上（虚拟IP地址映射：花生壳）
  + 国内的服务器都需要备案
  + 买一个域名 -> 将该域名的DNS解析地址指向到 阿里云 公网IP地址

## 1. 复习

## 2. HTTP

![HTTP请求和响应](img/请求和响应.png)

- TCP/IP
  + 传输层协议
  + 传输数据
  + 负责根据ip地址+端口定位到具体的计算机上的一个具体的应用程序
  + 负责数据的传输
  + 点对点的传输
  + 在传输之前，要通过三次握手建立连接
  + **传输层只负责传输数据，不关心数据的格式**

HTTP 是基于 `TCP/IP` 协议的应用层协议。

它不涉及数据包（packet）传输（不管数据的发送和接收），
主要规定了客户端和服务器之间的 **数据通信格式** ，默认使用 `80` 端口。

- 协议
  + 协议就是最少由双方互相约定好的一个规范、全是套路
- 超文本传输协议
  + HTTP
- HTTP 就是一个具有一定格式的字符串而已，属于应用层协议
  + 客户端在和服务器进行通信的时候
  + 按照 HTTP 协议对收发的数据进行解析和包装

### 2.1 请求和响应

HTTP 永远以一问一答的形式进行沟通。

- 请求
- 响应

一个请求对应一个响应，结束响应之后，不能继续向该请求发出响应。

### 2.2 HTTP 发展概览

HTTP 诞生的目的就是知识共享而诞生的，最初的时候，是为了实现文本共享。

#### HTTP/0.9

HTTP 协议最早版本是1991年发布的0.9版。该版本及其简单，只有一个命令 `GET`。

example.com/index.html

```
GET /index.html
```

上面命令表示，TCP 连接（connection）建立后，客户端向服务器请求（request）网页index.html。

协议规定，服务器只能回应HTML格式的字符串，不能回应别的格式。

```
<html>
  <body>Hello World</body>
</html>
```

服务器发送完毕，就关闭TCP连接。

#### HTTP/1.0

1996年5月，HTTP/1.0 版本发布，内容大大增加。

首先，任何格式的内容都可以发送。这使得互联网不仅可以传输文字，
还能传输图像、视频、二进制文件。这为互联网的大发展奠定了基础。

其次，除了 `GET` 命令，还引入了`POST` 命令和`HEAD` 命令，丰富了浏览器与服务器的互动手段。

再次，HTTP请求和回应的格式也变了。
除了数据部分，每次通信都必须包括头信息（HTTP header），用来描述一些元数据。

其他的新增功能还包括状态码（status code）、多字符集支持、多部分发送（multi-part type）、
权限（authorization）、缓存（cache）、内容编码（content encoding）等。

下面是一个1.0版的HTTP请求的例子。

```
GET / HTTP/1.0
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5)
Accept: */*
```

可以看到，这个格式与0.9版有很大变化。
第一行是请求命令，必须在尾部添加协议版本（HTTP/1.0）。后面就是多行头信息，描述客户端的情况。

服务器的回应如下。

```
HTTP/1.0 200 OK 
Content-Type: text/html
Content-Length: 137582
Expires: Thu, 05 Dec 1997 16:00:00 GMT
Last-Modified: Wed, 5 August 1996 15:55:28 GMT
Server: Apache 0.84

<html>
  <body>Hello World</body>
</html>
```

回应的格式是"头信息 + 一个空行（\r\n） + 数据"。
其中，第一行是"协议版本 + 状态码（status code） + 状态描述"。

##### Content-Type

关于字符的编码，1.0版规定，头信息必须是 ASCII 码，后面的数据可以是任何格式。
因此，服务器回应的时候，必须告诉客户端，数据是什么格式，这就是Content-Type字段的作用。

下面是一些常见的Content-Type字段的值。

```
text/plain
text/html
text/css
image/jpeg
image/png
audio/mp4
video/mp4
application/javascript
```

这些数据类型总称为 `MIME type` ，每个值包括一级类型和二级类型，之间用斜杠分隔。

`MIME type` 还可以在尾部使用分号，添加参数。

```
Content-Type: text/html; charset=utf-8
```

上面的类型表明，发送的是网页，而且编码是UTF-8。

##### HTTP/1.0 缺点

HTTP/1.0 版的主要缺点是，每个TCP连接只能发送一个请求。
发送数据完毕，连接就关闭，如果还要请求其他资源，就必须再新建一个连接。

TCP连接的新建成本很高，因为需要客户端和服务器三次握手，并且开始时发送速率较慢（slow start）。
所以，HTTP 1.0版本的性能比较差。随着网页加载的外部资源越来越多，这个问题就愈发突出了。

为了解决这个问题，有些浏览器在请求时，用了一个非标准的 `Connection` 字段。

```
Connection: keep-alive
```

这个字段要求服务器不要关闭TCP连接，以便其他请求复用。服务器同样回应这个字段。

```
Connection: keep-alive
```

一个可以复用的TCP连接就建立了，直到客户端或服务器主动关闭连接。
但是，这不是标准字段，不同实现的行为可能不一致，因此不是根本的解决办法。

#### HTTP/1.1

1997年1月，HTTP/1.1 版本发布，只比 1.0 版本晚了半年。
它进一步完善了 HTTP 协议，一直用到了20年后的今天，直到现在还是最流行的版本。

##### 持久连接

1.1 版的最大变化，就是引入了持久连接（persistent connection），
即TCP连接默认不关闭，可以被多个请求复用，不用声明 `Connection: keep-alive` 。

客户端和服务器发现对方一段时间没有活动，就可以主动关闭连接。
不过，规范的做法是，客户端在最后一个请求时，发送Connection: close，明确要求服务器关闭TCP连接。

```
Connection: close
```

##### HTTP/1.1 缺点

虽然1.1版允许复用TCP连接，但是同一个TCP连接里面，所有的数据通信是按次序进行的。
服务器只有处理完一个回应，才会进行下一个回应。
要是前面的回应特别慢，后面就会有许多请求排队等着。
这称为"队头堵塞"（Head-of-line blocking）。

为了避免这个问题，只有两种方法：一是减少请求数，二是同时多开持久连接。
这导致了很多的网页优化技巧，比如合并脚本和样式表、将图片嵌入CSS代码等等。
如果HTTP协议设计得更好一些，这些额外的工作是可以避免的。

#### HTTP/2

2015年，HTTP/2 发布。

它不叫 HTTP/2.0，是因为标准委员会不打算再发布子版本了，下一个新版本将是 HTTP/3。


### 2.3 CURL 工具

CURL 是一个基于终端下的 HTTP 客户端。

它可以帮你发出HTTP请求。

[CURL](https://curl.haxx.se/)

### 2.4 分析 HTTP 请求和响应报文

```


- curl -v 127.0.0.1:3000

* Rebuilt URL to: 127.0.0.1:3000/
* About to connect() to 127.0.0.1 port 3000 (#0)
*   Trying 127.0.0.1...
* Adding handle: conn: 0x2604810  第一个握手发送的一个信号
* Adding handle: send: 0 第二个发送的信号
* Adding handle: recv: 0 接收到的信号
* Curl_addHandleToPipeline: length: 1
* - Conn 0 (0x2604810) send_pipe: 1, recv_pipe: 0
* Connected to 127.0.0.1 (127.0.0.1) port 3000 (#0)

星号部分表示就通过 TCP/IP 三次握手建立连接

curl 工具将你输入的 url 地址按照 HTTP 协议，将 url 地址包装成 HTTP 请求报文，
然后通过 TCP/IP 传输层 将请求报文数据发送给服务器

> GET / HTTP/1.1
> User-Agent: curl/7.33.0
> Host: 127.0.0.1:3000
> Accept: */*
>


大于号开头部分都是请求报文内容：

- 请求报文
  + 请求头
    * 请求首行
      - 请求方法：GET POST DELETE PUT
      - 请求路径：/ /index.html /main.css 所有的请求路径都以 / 开头
      - 协议版本：HTTP/1.1
    * 请求首部字段
  + 回车换行
  + 请求体
    * 只有 POST 请求才有请求体
    * 请求体中一般用于上传提交大量的数据
    * 请求体一定是在请求头的回车换行之后
  

=====================请求报文=======================
GET / HTTP/1.1
User-Agent: curl/7.33.0
Host: 127.0.0.1:3000
Accept: */*
\r\n
====================/请求报文=======================

HTTP 客户端将以上包装好的请求报文内容，通过 TCP/IP 传输层，将该内容发送到具体的服务器计算机。

当后台服务器拿到请求报文内容之后：

将请求报文按照 HTTP 协议（约定好的数据格式）解析出来。

然后根据不同的请求报文内容，作不同的处理。

最后，将要发送的数据内容按照 HTTP 协议包装成 HTTP响应报文。
通过 TCP/IP 传输层 将该内容发送到客户端。

< HTTP/1.1 200 OK
< Content-Type: text/html; charset=utf-8
< Date: Tue, 13 Sep 2016 01:53:01 GMT
< Connection: keep-alive
< Content-Length: 20
<
<h1>hello world</h1>


- 响应报文
  + 响应头
    * 响应首行
      - 协议版本：HTTP/1.1
      - 状态码
        + 2xx：表示成功
        + 3xx：表示重定向
        + 4xx：表示找不到，属于客户端错误
        + 5xx：表示服务器错误
      - 状态短语：例如OK ，给程序员看的，没有实际意义
    * 响应首部字段
      - Content-Type：告诉客户端本次响应的数据内容是什么类型
      - Date：告诉客户端本次响应的时间
      - Connection：保持连接
      - Content-Length：告诉客户端我给你发送的数据字节是多大
  + 回车换行
  + 响应体
    * 响应体中就要真正的数据

=====================响应报文=======================
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Date: Tue, 13 Sep 2016 01:53:01 GMT
Connection: keep-alive
Content-Length: 20
\r\n
<h1>hello world</h1>
====================/响应报文=======================

客户端会拿到响应报文数据之后，按照 HTTP 协议解析出来，
然后做相应的处理。
```

### 2.5 浏览器的本质

- Socket客户端：
  + 将用户输入的域名去 DNS 服务器查询出对方的 ip地址
  + 自动开启一个端口号与用户输入的域名（ip地址+端口号，http默认是80）建立连接（通过三次握手）
  + 通过 Socket 收发数据
  + 发送数据的时候，将请求数据，按照 HTTP 协议包装成请求报文 发送给服务器
  + 对于接收到的数据，也是通过 HTTP 协议将响应报文解析出来

- 渲染html、css，解析和执行 JavaScript
  + 使用渲染引擎渲染HTML DOM结构，渲染CSS样式 Webkit
  + 使用 JavaScript 解析引擎 解析和执行 JavaScript 代码 V8
  + 在解析和执行的过程中，如果碰到 link、img、script 等有 src  属性的标签
  + 浏览器会自动的重新对这个地址发起请求

### 2.6 经典面试题（当用户在浏览器地址输入了一个地址敲回车之后发生的事情）

**面试必考**

1. 用户在浏览器地址栏中输入网站域名
2. 浏览器拿到该域名自动去请求 **DNS服务器查询** 用户输入的域名对应的 `ip` 地址
3. 浏览器拿到 `ip` 地址之后，通过ip地址+端口号（HTTP默认80）和服务器建立连接（通过 **三次握手** ）
2. 三次握手建立连接成功之后
5. 浏览器将用户输入的 `url` 地址通过 `HTTP` 协议包装成 **请求报文** ，然后通过 `Socket（服务器ip地址和端口号）` 发送到服务器
6. 当HTTP服务器接收到客户端浏览器发送过来的请求报文时候，按照 `HTTP` 协议将请求报文解析出来
7. 然后服务器拿到请求报文中的请求信息（例如请求路径url），做相应的业务逻辑处理操作
8. 当业务逻辑处理完毕之后，服务器将要发送给客户端的数据按照 `HTTP` 协议包装成 **响应报文**
9. 然后服务器通过 `Socket（客户端的ip地址+端口号）` 将响应报文数据发送给客户端浏览器
10. 当浏览器接收到服务器发送给自己的响应报文数据的时候，浏览器根据 `HTTP` 协议将报文内容解析出来
11. 浏览器拿到响应报文体中的数据开始 **解析渲染html、css，执行 JavaScript**
12. 如果在解析的过程（从上到下）中，发现有外链的标签（link、css、img）
13. 浏览器会自动对该标签指向的 路径地址 发起新的请求（还是通过 `Socket` ）。

所以浏览器的本质就是：

1. **Socket 客户端**
2. **包装和解析 HTTP 格式数据**
3. **渲染html、css，执行 JavaScript**

### 2.7 HTTP 学习资源

- [图解 HTTP](http://item.jd.com/11449491.html)

## 3. 使用 http 核心模块构建 HTTP 服务

### 3.1 API

- http.createServer([requestListener])
  + Event: 'close'
  + Event: 'request'
  + server.close([callback])
  + server.listen([port][, hostname][, backlog][, callback])

- Class: http.IncomingMessage(Request请求对象，里面保存的是客户端发送过来的数据)
  + Event: 'data'
  + Event: 'end'
  + data 和 end 事件用来接收 POST 请求体中的数据的
  + message.url
  + message.headers
  + message.httpVersion
  + message.method

- Class: http.ServerResponse（Response响应对象，可以使用该对象发送响应数据）
  + response.write(chunk[, encoding][, callback])
  + response.end([data][, encoding][, callback])
  + response.setHeader(name, value)
    * 通过 setHeader 可以向响应报中写入响应头部字段
  + response.statusCode
    * 可以通过 statusCode 属性指定本次响应的状态码
    * response.statusCode = 200
  + response.statusMessage
    * 可以用来设定状态短语 OK
  + response.writeHead(statusCode[, statusMessage][, headers])
    * 状态码
    * 状态短语，可以省略
    * 是一个对象：{ 字段名: 字段值, 字段名: 字段值 }
  + response.sendDate
    * 表示发送日期，默认为 true

### 3.2 根据不同的请求路径发送不同的响应内容

### 3.3 搭建一个终端下的静态资源服务器

# 我的音乐

## 1. 项目结构搭建

- 初始化 package.json 文件
  + `npm init -y` 直接生成 package.json 文件
- 安装一些必要的依赖包
  + `npm install --save bootstrap jquery`
  + `--save` 表示把安装的依赖项保存到 package.json 文件中的 dependencies 依赖字段中
  + 一般上传代码的时候，不会上传第三方的东西
  + 别人拿到项目的时候，先去自己执行 npm install 命令安装依赖包 
  + npm install 就会自动读取 package.json 文件中的 dependencies 字符中的内容，然后依次下载
- npm start
  + npm 会自动找到 package.json 文件中 scripts 字段 中的 start 属性，然后执行里面的值

## 2. 路由设计

## 3. 功能开发

### 3.1 首页音乐列表展示

### 3.2 添加音乐

### 3.3 删除音乐

### 3.4 编辑音乐

## 在 node 中使用模板引擎

## 在node中处理表单提交

### 处理 GET 请求

因为 GET 请求是通过 url 地址传递数据的，
所有可以直接解析 url 地址中的查询字符串就可以取到 GET 提交的数据。

### 处理普通表单 POST 请求（没有文件）

对于普通表单 POST 提交，表单还是将表单元素解析为标准格式的查询字符串，
然后把查询字符串放到请求报文体中，因为 POST 提交一般用于大量数据，
所以客户端在进行提交数据的时候，是使用流的方式发送数据（一点儿一点儿的发送）

在 node 的 http 核心模块中，request 请求对象就是一个 可读流，
可以通过监听 request 请求对象的 `data` 和 `end` 事件，以流的方式解析数据。

所以，具体的解析使用方式如下：

```js
// 1. 在外部定义一个变量 data
// 2. 监听 request 请求对象的 data 事件
//      因为表单POST提交一般是传输大量的数据，所以是以流的方式进行传递
//      在解析的时候，也是使用流的方式接收客户端提交的数据
//      数据量越大，data 事件触发的次数越多
//      因为只有在 end 事件中才表示数据接收完毕
//      所以每一次接收到新的数据就将该数据与外部的 data 拼接起来
//      最后在 end 事件中就可以直接使用 data 完整的数据了
// 3. 监听 request 请求对象的 end 事件

var data = ''

req.on('data', function (chunk) {
  data += chunk
})

req.on('end', function () {
  // 在这里使用 data
})
```

### 处理有文件的表单提交

表单文件上传在html页面中必须注意的事项：

1. 表单的提交方法 method 必须是 `post`
2. 表单的 `ectype` 属性必须设置为 `multipart/form-data`
3. file 类型的 input 元素也是一样的。必须具有 name 属性

在后台使用 formidable 第三方包帮我们处理表单文件上传

```js
// 1. 创建一个 form 对象
var form = new formidable.IncomingForm()

// 设定要上传的文件保存路径
form.uploadDir = path.join(__dirname, 'uploads')

// 保存文件的时候保持扩展名
form.keepExtensions = true

// 通过 form.parse 方法，传入 request 请求对象和回调函数用来接收数据 
form.parse(req, function(err, fields, files) {
  // fields 就是普通文件字段信息
  // files  就是上传的图片的信息（大小、路径、文件名等信息）
});
```

## 扩展

### ECMAScript Class

以前的写法：

```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
```

ES6 中的 Class：

```js
//定义类
class Point {

  // constructor方法，这就是构造方法
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // 原型方法
  // 前面不需要加上 function 关键字，直接把函数定义放进去了就可以了
  // 方法之间不需要逗号分隔，加了会报错
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

  test () {
    console.log('hello world')
  }

  // 静态方法，直接通过类名调用
  static classMethod() {
    return 'hello';
  }
}
```

- 构造函数的prototype属性，在ES6的“类”上面继续存在
- 类的所有方法都定义在类的prototype属性上面
- 一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
- 不存在变量提升

## 目标

1. 能概述什么是 HTTP
2. 能概述浏览器的本质作用是什么
3. 能描述当用户在地址栏输入一个地址敲回车之后发生的事情
4. 能完成基于终端下的静态资源HTTP服务器
5. 能掌握artTemplate模板引擎的使用（模板语法、渲染API）
6. 能在我的音乐项目中封装一个 render 渲染函数
