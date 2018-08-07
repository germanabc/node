# Node 第九天课程笔记

## Table of Contents

<!-- MarkdownTOC -->

- [0. 反馈](#0-反馈)
- [1. 复习](#1-复习)
- [2. Express](#2-express)
  - [2.1 介绍](#21-介绍)
    - [特性](#特性)
  - [2.2 快速入门](#22-快速入门)
  - [2.3 在 Express 中使用 `ejs` 模板引擎](#23-在-express-中使用-ejs-模板引擎)
  - [2.4 中间件](#24-中间件)
    - [2.4.1 中间件概念](#241-中间件概念)
    - [2.4.2 中间件的API](#242-中间件的api)
    - [2.4.3 常用第三方中间件](#243-常用第三方中间件)
  - [2.4 Express 中的错误处理](#24-express-中的错误处理)
  - [2.5 API](#25-api)
    - [2.5.1 express\(\)](#251-express)
    - [2.5.2 Application](#252-application)
    - [2.5.3 Request](#253-request)
    - [2.5.4 Response](#254-response)
    - [2.5.5 Router](#255-router)
- [3. 使用 Express 快速重构音乐案例](#3-使用-express-快速重构音乐案例)
- [4. MySQL 数据库](#4-mysql-数据库)
  - [4.1 数据库基础知识](#41-数据库基础知识)
  - [4.2 数据库和表的基本操作](#42-数据库和表的基本操作)
  - [4.3 添加、更新和删除数据](#43-添加、更新和删除数据)
  - [4.4 单表查询](#44-单表查询)
    - [4.4.1 简单查询](#441-简单查询)
    - [4.4.2 按条件查询](#442-按条件查询)
    - [4.4.3 为表和字段取别名](#443-为表和字段取别名)
  - [4.5 多表查询](#45-多表查询)
    - [4.5.1 外键](#451-外键)
    - [4.5.2 连接查询](#452-连接查询)

<!-- /MarkdownTOC -->


## 0. 反馈

- 难
- 同步普通表单get提交
  + key=value&key=value[&key=value] 查询字符串
  + 最后把生成的 查询字符串 放到url地址栏的 `?` 最后
  + http://127.0.0.1:3000?foo=bar&name=jack&age=18
  + 来到后台 node 中：node 把请求地址使用 url 模块的 parse方法，只需要给他指定第二个参数为 true 将 query 转换为 json对象
- 同步普通表单post提交
  + key=value&key=value[&key=value] 查询字符串
  + 最后把生成的 查询字符串 放到请求体中
  + node 中通过监听 request 对象的 data 和 end 事件来接收表单 post 提交的数据
  + 把接收到的请求体中的查询字符串，通过 querystring 模块的 parse 方法把它解析成一个对象
  + 拿到解析出来的数据之后，做你自己的业务逻辑操作
  + 最后处理完毕，发送响应
- 同步有文件的表单post提交
  + 客户端注意事项：
    * method 必须是 post
    * enctype 属性设置为 multipart/form-data
    * file 类型的 input，也必须要有 name 属性
  + 后台解析：
    * 使用一个第三包包：formidable
- 异步普通表单get提交
- 异步普通表单post提交
- 异步有文件的表单post提交
- 客户端：发送请求
  + 有数据的请求
    * get
      - /add?name=jack
    * post
      - 数据再请求体重
  + 没有数据的请求
    * /
    * /add
    * /edit
- 服务器：接收请求
  + 处理请求
  + 发送响应

## 1. 复习

- 模块化开发
  + 把一个很复杂的系统按照具体的业务、逻辑提取出各个小模块
  + 提高生产效率
  + 可维护性高
  + JavaScript 模块化规范
    * CMD - SeaJS （和 CommonJS 很像）
    * AMD - RequireJS
    * CommonJS - Node
    * UMD - 不是规范、也不是模块加载器
      - 是一个为了兼容别的模块规范而做的兼容处理
  + 封装模块，形成一个独立的作用域、不污染全局空间
  + 暴露模块接口，提高对外的通信访问接口对象
  + ECMAScript 6 最新标准规范中，制定了 JavaScript 模块系统规范
    * 利用 babel 做编译转换才可以使用
- Node 中的 JavaScript
  + ECMAScript
  + 浏览器中：BOM、DOM、没有模块化（需要使用AMD、CMD等第三方库来实现）
  + Node中：文件操作、网络操作、模块化（Node本身已经根据 CommonJS 实现了）
- 包和npm
  + 把你的开发文件 js、readme等组织到一起放到一个目录中，就形成了一个包
    * bin
    * lib
    * package.json 文件
  + npm
    * 安装项目依赖包
    * 安装全局命令行工具
    * 解决 npm 被墙的问题
- 文件操作
  + 读写文件
  + 监视文件
  + 目录操作：创建目录、删除目录、读取目录
- Socket 网络编程
  + ip地址：用来定位一台具体的计算机的
  + 端口号：用来定义一个具体的应用程序的
  + node的net模块帮咱们抽象出来一个编程接口：Socket（ip地址+端口号）
    * 通过 Socket 收发数据
    * 接收：socket.on('data')
    * 发送：socket.write()
  + 请求和响应
  + 数据格式的包装（数据格式协议）
- HTTP
  + HTTP 是一个数据格式协议（由标准委员会制定的）
  + node 中的 http 核心模块包装自 net 模块
  + http 模块本身没有收发数据的功能
  + 它只是负责把传输层收发到的数据：按照 HTTP 数据格式协议 解析和包装
  + request 请求对象
    * 通过 request 请求对象可以获取客户端请求的一些请求数据信息
    * 然后根据拿到的请求数据，解析处理
  + response 响应对象
    * 通过 response 给当前请求发送响应
- 其它
  + ECMAScript 6
  + 模板引擎
    * 前端和后端都可以使用模板引擎
    * 模板引擎的核心本质是在处理字符串

## 2. Express

学习资源：

[express - en](http://www.expressjs.com/)

[express - cn](http://www.expressjs.com.cn/)

### 2.1 介绍

Express 是一个基于 Node.js 开发的快速、开放、极简的 Web 开发框架。
使用 Express 可以让你更加专注于业务的处理而不是底层数据的解析操作。

Express 不对 Node.js 已有的特性进行二次抽象，
只是在它之上扩展了 Web 应用所需的基本功能，例如：`req.query`、`res.send`、`res.json` 等API。
例如：`req.url`、`req.method`，`res.write`，`res.end` 等API依然存在。

#### 特性

- 轻量、API简单友好
- 强大的中间件处理系统
- 简单语义化的路由系统

### 2.2 快速入门

- 安装
  + `npm install --save express`
- hello world
- 路由
- 处理静态资源

### 2.3 在 Express 中使用 `ejs` 模板引擎

```js
// npm install --save ejs
app.set('views', 路径)
app.set('view engine', '你安装的模板引擎的名称，例如：ejs')
```

只要你执行了上面两句代码：就可以直接在后面的请求处理函数中使用 `res.render(视图名称，要注入的数据对象)`
，然后express会自动帮你去读取文件然后注入数据，解析替换，最后得到一个完整的 html 页面，
然后发送给客户端。

### 2.4 中间件

#### 2.4.1 中间件概念

如果把一个 `http` 处理过程比作是污水处理，中间件就像是一层层的过滤网（过滤器）。
每个中间件在 `http` 处理过程中通过改写 `request` 或（和）`response` 的数据、状态，实现了特定的功能。

#### 2.4.2 中间件的API

设置中间件的方法：

- app.use(handler)
  + 任何请求方法、路径都会进入该中间件，然后执行里面的代码
- app.use([path], handler)
  + 只有指定的请求路径，才会进入该中间件，然后执行里面的代码
- app.get(path, handler)
  + 只有 get 请求，并且是指定的请求路径，才会执行该中间件
- app.post(path, handler)
  + 只有 post 请求，并且是指定的请求路径，才会执行该中间件

中间件处理函数：

```js
function (req, res, next) {
  // 中间件中的代码
  // next() 走下一个中间件
}
```

#### 2.4.3 常用第三方中间件

[Express官方推荐中间件](http://www.expressjs.com.cn/resources/middleware.html)

- body-parser
  + 用来解析普通表单post请求体的
- cookie-parser
  + 用来处理 cookie 的
- express-session
  + 用来处理 session 的
- errorhandler
  + 用来处理错误的一个中间件
- morgan
  + 用来输出日志的中间件
- response-time
  + 用来加入响应时间的中间件
- serve-favicon
- serve-static

使用第三方中间件，无非就是：

第一步 `npm install --save 中间件名称`

第二步：看文档，找到 example，然后 try-try-see

### 2.4 Express 中的错误处理

### 2.5 API

#### 2.5.1 express()

#### 2.5.2 Application

#### 2.5.3 Request

#### 2.5.4 Response

#### 2.5.5 Router

## 3. 使用 Express 快速重构音乐案例

## 4. MySQL 数据库

### 4.1 数据库基础知识

### 4.2 数据库和表的基本操作

### 4.3 添加、更新和删除数据

### 4.4 单表查询

#### 4.4.1 简单查询

#### 4.4.2 按条件查询

#### 4.4.3 为表和字段取别名 

### 4.5 多表查询

#### 4.5.1 外键

#### 4.5.2 连接查询
