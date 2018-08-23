const net = require('net')

const server = net.createServer()


server.on('connection', (socket) => {
  console.log(socket.remoteAddress)
  console.log(socket.remotePort)

  // 浏览器客户端通过 HTTP 将用户输入的 url 地址包装成 HTTP 请求报文
  // 然后通过 TCP/IP 传输层（socket）将请求报文发送给服务器

  // node 将接收到的数据，传递给 socket 对象的 data 事件的处理函数的第一个参数
  socket.on('data', (data) => {
    data = data.toString()

    let request = {}

    let response = {}

    let lines = data.split('\r')
    let reqFirstLine = lines[0].split(' ')
    let reqMethod = reqFirstLine[0]
    let reqUrl = reqFirstLine[1]
    let reqHttpVersion = reqFirstLine[2]

    request.method = reqMethod
    request.url = reqUrl
    request.httpVersion = reqHttpVersion

    // 根据不同请求发送响应内容
    if (reqUrl === '/') {
      socket.write(`
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Date: Tue, 13 Sep 2016 01:53:01 GMT
Connection: keep-alive
Content-Length: 20

<h1>hello world</h1>
      `)
      socket.end()
    }
  })

})

server.listen(3000, '127.0.0.1', () => {
  console.log('server is runnig')
})
