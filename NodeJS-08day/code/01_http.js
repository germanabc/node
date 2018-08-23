const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {

  // 所有发送的内容最好都加上 Content-Type 字段
  // 这样的话，客户端会根据该字段对响应的内容做正确的解析
  // res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'foo': 'bar'
  })
  res.end('<h1>hello world</h1>')
})

server.listen(3000, () => {
  console.log('server is running at port 3000.')
})
