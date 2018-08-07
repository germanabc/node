const express = require('express')
const path = require('path')
const fs = require('fs')

// 1. 调用 express() 方法，得到一个 app 实例对象
const app = express()

// 在 express 中处理静态资源
// 当请求进来的时候，express 自动的先去 assets 目录下找有没有对应的路径文件
// 如果找到，直接读取回来返回响应
// 使用了下面这种方式只会，就可以直接以 /img/xx.jpg 的方式来访问静态资源了
// app.use(express.static(path.join(__dirname, 'assets')))

// 这个时候，你就必须通过 /assets 目录来访问里面的静态资源了
app.use(express.static(path.join(__dirname, 'assets')))

// 处理静态资源路径
// 1. use 有两个参数，第一个参数可选，用来指定以哪个标识开头
// 2. 第二个参数用来指定要映射的路径（去哪个目录下找静态资源）
// 3. 可以配置多个静态资源路径
app.use('/uploads',express.static(path.join(__dirname, 'uploads')))
app.use('/a',express.static(path.join(__dirname, 'uploads')))
app.use('/b',express.static(path.join(__dirname, 'uploads')))

// 2. 给 app 设定一个处理 get 请求 / 的处理函数
app.get('/', (req, res) => {

  fs.readFile('./views/index.html', 'utf8', (err, data) => {
    if (err) {
      throw err
    }
    res.send(data)
  })
  
})

app.get('/add', (req, res) => {
  console.log(req.query.foo)
  res.send('add page')
})

// 3. 设置监听，启动服务器
app.listen(3000, () => {
  console.log('server is running at port 3000.')
})
