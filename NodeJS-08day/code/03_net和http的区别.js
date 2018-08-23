/**
 * net模块和http 模块的区别
 * http 模块实际上就是包装的net模块
 * net 接收到的就是纯数据，对方发送的是什么，接收到的就是什么，不负责数据的解析
 * net 只负责收发数据，不关心数据格式
 * http 只是一个语言，一个规范，一个数据格式
 * http://127.0.0.1:3000/
 * http 会将你的url地址按照 HTTP 协议（约定好的数据格式）包装成HTTP请求报文
 */

const http = require('http')

const server = http.createServer()

// http 模块对于已经连接之后的请求客户端
// 将该请求客户端的请求报文内容解析出来
// 将请求客户端的 Socket 对象一为二
//     其中一个就是 request 请求对象：里面包含了请求报文中解析出来的一些信息，通过 request 接收对方发送的 post 请求体数据
//     另一个就是 response 对象，它其实就是对方的 Socket 地址，可以通过 Socket 给对方发送数据
server.on('request', (req, res) => {
  console.log(`请求方法：${req.method}`)
  console.log(`请求路径：${req.url}`)
  console.log(`HTTP协议：${req.httpVersion}`)
  console.log(req.headers)
  res.end('hello world')
})

server.listen(3000, () => {
  console.log('server is running at port 3000.')
})
