# 我的音乐

## 安装第三方包

- npm install --save jquery bootstrap mime

## 约定

所有的 html 文件放到 views 目录下

项目的根路径下都有一个 config.js 配置文件

项目的根路径下都有一个 package.json 文件

约定，把项目根路径下的 app.js 作为网站后台的入口文件

## 路由设计

GET  /       渲染首页

GET  /add    渲染添加音乐页面
POST /add    处理添加音乐请求

GET  /edit   渲染编辑音乐页面
POST /edit   处理编辑音乐请求

GET  /remove 处理删除音乐请求

GET  /play   处理播放音乐请求

一定不要把整站都开放为用户可以访问的。只给用户开放我们指定的目录：

约定好将静态资源目录 node_modules 开放为静态资源，
只要请求路径是以 node_modules 开头的，那我们就把它当成是该目录下的一个静态资源。
然后根据请求路径和 node_modules 目录拼接一个完整的路径，最后响应给用户。
