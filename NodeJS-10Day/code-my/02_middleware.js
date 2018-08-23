const express = require("express");
const fs = require("fs");
//querystring node查询字符串模块
const querystring = require("querystring");
//responseTime Node.js服务器的响应时间模块,公共模块需要下载
// 此模块创建一个中间件，记录HTTP服务器中请求的响应时间。
// “响应时间”在此定义为从请求进入此中间件到将报头写出到客户端之间所经过的时间。
const responseTime = require("response-time");

//morgan node.js的HTTP请求记录器中间件，公共模块需要下载
const morgan = require("morgan");

const app = express();
app.use(responseTime());
app.use(morgan(":method :url :response-time"));

// app.use((req, res, next) => {
//   let data = ''
//   req.on('data', chunk => {
//     data += chunk
//   })
//   req.on('end', () => {
//     req.body = querystring.parse(data)
//   })
// })

// 只要请求路径是 /foo 无论是 get请求还是post请求，那么就会进入该中间件，然后执行中间件对应的处理函数
// app.use('/foo', (req, res, next) => {
//   console.log('收到/foo请求了')
// })

let count = 0;
app.use("/add", (req, res, next) => {
  count++;
  // ``:es6模板字符串
  // 字符串中嵌入变量 ${变量名}
//fs.writeFile   异步地写入数据到文件，如果文件已经存在则覆盖文件,不存在就创建一个文件
  fs.writeFile("./log.txt", `/add被请求了，当前请求次数为：${count}`, err => {
    if (err) {
      throw err;
    }
    next()
  });
})

app.get('/',(req,res)=>{
    res.send(' index page')
})
app.get('/add',(req,res)=>{
     res.send('add index page')
})

// app.use 方法中间件
// 无论任何get还是post请求都会进入该中间件，然后执行里面的代码
// 在中间件中，需要接收一个处理函数，处理函数需要接收三个参数：req、res、next
// 在整个请求和响应的过程中，所有中间件环节中流通的 req、res 都是同一个对象
app.use((req, res, next) => {
  console.log('加絮凝剂111')

  req.name = 'jack'

  // 只要调用了 next，express 就会自动往后执行后续的中间件
  next()
})

app.use((req, res) => {
  console.log(req.name)
  console.log('水流进入了反应沉淀池了222')
  console.log(req.body)
})

app.listen(3000,()=>{
    console.log('server is runnning')
})

