const http = require('http')
const fs = require('fs')
const path = require('path')
const config = require('./config')
const url = require('url')

const server = http.createServer()

server.on('request', (req, res) => {

  // 先不处理浏览器的默认收藏夹图标请求
  if (req.url === '/favicon.ico') {
    return res.end()
  }
  
  // url.parse 方法可以将一个请求路径解析为一个对象，方便我们使用
  // 指定第二个参数为 true，那么 url.parse 方法会自动将 query 查询字符串转换为一个对象
  let urlObj = url.parse(req.url, true)

  // 获取请求路径，不包含查询字符串
  let pathname = urlObj.pathname

  // 获取查询字符串（已经被 url.parse 方法转换为一个对象了）
  let query = urlObj.query

  // 获取本次请求的请求方法，例如可能是 GET POST
  // 直接转化成小写的目的是为了程序的健壮性
  let method = req.method.toLowerCase()

  console.log(`method: ${method}, pathname: ${pathname}, query: ${JSON.stringify(query)}`)

  

})

server.listen(config.port, config.host, () => {
  console.log('server is running...')
  console.log(`  Please Visit http://${config.host}:${config.port}`)
  console.log(`  Hit Ctrl+C to stop this server.`)
})
