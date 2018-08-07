const express = require('express')
const path = require('path')
const router = require('./router')
const querystring = require('querystring')

const app = express()

// ==================处理静态资源请求======================
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
// ==================/处理静态资源请求======================


// ==================解析表单 get 请求 - req.query======================
// express 本身已经帮你把get请求中的查询字符换解析出来挂载到了 request 对象的 query 属性中了

// ==================解析普通表单 post 请求 - req.body======================
// 1. npm install --save body-parser
// 2. app.use(bodyParser.urlencoded({ extended: false }))
// 3. 在你的请求处理函数中就可以直接 req.body.input的name
// 注意：只要做了以上步骤，对于任何普通表单 post 提交的数据，都可以直接通过 **req.body** 来访问
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false })) // 这里就标识给 req 对象挂载了一个 body 属性
// /==================解析普通表单 post 请求======================


// 该中间件用来解析表单post请求提交的数据
// 解析处理完毕，进入下一个中间件环节
// app.use((req, res, next) => {
//   let data = ''
//   req.on('data', chunk => {
//     data += chunk
//   })
//   req.on('end', () => {
//     req.body = querystring.parse(data)
//     // 给 req 对象挂载了一个 body 属性
//     next()
//   })
// })

// ==================在express中配置使用ejs模板引擎 - res.render======================
// 在 express 中使用 ejs 模板引擎
// 1. npm install --save ejs
// 2. 配置视图的路径
// 注意: 这里不配置也可以，express 默认去项目根路径下的 views 目录下找
app.set('views', path.join(__dirname, 'views'))
// 3. 配置要使用的模板引擎
//    第一个参数必须是 view engine，千万不要改，错一个字母都不行
//    第二个参数指定要使用的模板引擎（前提是你已经 npm install 的模板引擎名称了）
//        比如你 npm install ejs 那这里就是 ejs
// 视图文件的后缀名可以配置，默认的话是 .ejs
//  执行了下面这句代码相当于给 res 对象挂载了一个 render 函数，只不过这个 render 使用的是 ejs 模板引擎
app.set('view engine', 'ejs')
// 4. 接下来就可以在处理函数中直接使用 res.render(模板文件名, 要注入的数据对象)
// ==================/在express中配置使用ejs模板引擎======================


// 使用 app.use 方法加载路由模块，自动将路由的分发交给 app
app.use(router)

app.listen(3000, '192.168.44.56', () => {
  console.log('server is running.')
})
