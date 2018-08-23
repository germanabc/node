const http = require('http')
const fs = require('fs')
const path = require('path')
const config = require('./config')
const router = require('./router')

const server = http.createServer()

server.on('request', (req, res) => {

  // 代码执行到这里就进入了路由模块了
  // 路由模块要做的事情，就是解析请求路径，将请求转发到具体的处理方法逻辑
  router(req, res)

})

server.listen(config.port, config.host, () => {
  console.log('server is running...')
  console.log(`  Please Visit http://${config.host}:${config.port}/`)
  console.log(`  Hit Ctrl+C to stop this server.`)
})
