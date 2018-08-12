# Node 第八天课程笔记

## Table of Contents

<!-- MarkdownTOC -->

- [0. 反馈](#0-反馈)
- [1. 复习](#1-复习)
- [3. 使用原生 http 模块开发我的音乐案例](#3-使用原生-http-模块开发我的音乐案例)
- [4. Express](#4-express)
  - [4.1 介绍](#41-介绍)
  - [4.2 快速入门](#42-快速入门)
  - [4.3 在 Express 中使用模板引擎](#43-在-express-中使用模板引擎)
  - [4.4 中间件](#44-中间件)
    - [4.4.1 中间件概念](#441-中间件概念)
    - [4.4.2 中间件的API](#442-中间件的api)
    - [4.4.3 常用第三方中间件](#443-常用第三方中间件)
  - [4.4 Express 中的错误处理](#44-express-中的错误处理)
  - [4.5 API](#45-api)
    - [4.5.1 express\(\)](#451-express)
    - [4.5.2 Application](#452-application)
    - [4.5.3 Request](#453-request)
    - [4.5.4 Response](#454-response)
    - [4.5.5 Router](#455-router)
- [扩展](#扩展)
  - [ECMAScript Class](#ecmascript-class)

<!-- /MarkdownTOC -->


## 0. 反馈

- net 和 http
  + net 模块只负责收发数据，不关心数据格式
  + http 是封装了 net 模块
  + http 广泛应用于 浏览器客户端应用程序 和 服务器应用程序 之间的通信协议
  + http 基于 net 模块进行收发数据：对于收发的数据会根据 HTTP 协议进行解析和包装
  + 例如，收到客户端发过来的数据之后，http 模块会将请求消息（请求报文字符串）按照 HTTP 协议解析成一个请求对象 request
  + 如果要给客户端发送消息的时候，http 模块会自动将你要发送的消息按照 HTTP 协议包装成响应报文格式字符串，通过传输层 Socket（就是一个地址）发送出去
- 模板引擎
  + 为什么要学习模板引擎？
  + 模板引擎解决的问题是什么？
    * 字符串拼接
  + 模板引擎关注的是字符串的处理
- 前台渲染和后台渲染
  + 拿着数据和你的字符串整合成一个html结构字符串，最后上到DOM中
  + 前台：利用 ajax 发送一个请求，得到数据，然后利用模板引擎整合成完整的html结构，最后上到 DOM中
  + 后台：在用户发情请求的时候，已经在后台将数据和页面整体的渲染处理好了，最后将处理之后的页面发送了用户
  + 用户得到的实际上就是已经被处理过后的页面
  + 在后台做渲染（每一个用户请求进来，都是后台这一个计算机完成的），压力都在后台服务器这里
  + 前端渲染（只负责把数据给你，真正的渲染是在每一个用户自己的计算机上），压力都分担到了各个客户端上了
  + 所以说使用前台渲染可以减轻后台服务器的压力
  + 前端渲染会涉及到SEO 的问题，爬虫爬不到
  + 前台渲染也有利于用户体验
  + 后台渲染有利于SEO
  + 到底用哪个，取决于产品
  + 后台渲染问题：html + 后台的渲染 耦合在一起了，不好实现前后端分离
- 为什么node中的路由要这么设计？
  + url地址栏中的请求路径本质上只是一个唯一标识而已
  + 注意：不是以前大家想的那种静态资源路径了
- 关于url地址和文件路径
- 理论道理都懂，写不出来
  + 写的少
  + 后台的编程思维没有建立起来
  + 个人感受：
    * 如果是没有基础过后台的学习 Node，不太容易入门后台
      - node 相对于来说虽然很轻量，安装环境简单、开发工具也简单、JavaScript 语言也简单
      - 简单就带来了各种各样的问题，没有标准
        + 模块化规范的问题：amd、cmd、CommonJS、UMD、ECMAScript 2016 Module
        + node 也很底层，和轻量，学习node能真正学习到 Web 的本质
        + res.render(默认直接集成了模板引擎，发送响应)
        + Socket、读写文件
      - 后台 java、PHP、.Net 已经有很成熟的框架了，一般都上上来就玩儿框架，玩儿到最后只是一个会使用框架的玩家而已
      - 学习 Node 就是走一个从 0 到 1 的过程，能了解到很多底层的一些概念
      - 以后进入公司了：如果做了后台开发，慢慢体会
      - 学了 Angular 核心目的在于学习框架的思想。而不是里面的 API
      - 需要时间、项目体会、历练

## 1. 复习

## 3. 使用原生 http 模块开发我的音乐案例

## 4. Express

### 4.1 介绍

### 4.2 快速入门

- 安装
- hello world
- 路由
- 处理静态资源

### 4.3 在 Express 中使用模板引擎

### 4.4 中间件

#### 4.4.1 中间件概念

#### 4.4.2 中间件的API

#### 4.4.3 常用第三方中间件

- body-parser
- cookie-parser
- express-session
- errorhandler
- morgan
- response-time
- serve-favicon
- serve-static

### 4.4 Express 中的错误处理

### 4.5 API

#### 4.5.1 express()

#### 4.5.2 Application

#### 4.5.3 Request

#### 4.5.4 Response

#### 4.5.5 Router

## 扩展

### ECMAScript Class

JavaScript语言的传统方法是通过构造函数，定义并生成新对象。

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

上面这种写法跟传统的面向对象语言（比如C++和Java）差异很大，
很容易让新学习这门语言的程序员感到困惑。

ES6提供了更接近传统语言的写法，引入了Class（类）这个概念。
通过class关键字，可以定义类，
新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

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

1. 能掌握artTemplate模板引擎的原生语法和简洁语法
2. 能完成渲染首页功能
3. 能完成添加音乐功能
4. 能完成删除音乐功能
5. 能完成修改音乐的功能

