const url = require('url')
const fs = require('fs')
const path = require('path')
const render = require('./commom/render')
const mime = require('mime')

const handler = require('./handler')


// router 模块
// 负责将用户的请求路径转发到具体的处理函数
module.exports = function(req, res) {

  // 调用 render，传入 res 对象，然后 res 对象就拥有了 render 方法
  render(res)

  res.redirect = function(location) {
    res.writeHead(302, {
      'Location': location
    })
    res.end()
  }

  res.json = function (obj) {
    res.end(JSON.stringify(obj))
  }

  // 先不处理浏览器的默认收藏夹图标请求
  if (req.url === '/favicon.ico') {
    return res.end()
  }

  // url.parse 方法可以将一个请求路径解析为一个对象，方便我们使用
  // 指定第二个参数为 true，那么 url.parse 方法会自动将 query 查询字符串转换为一个对象
  let urlObj = url.parse(req.url, true)

  // 获取请求路径，不包含查询字符串
  let pathname = decodeURI(urlObj.pathname)

  // 获取查询字符串（已经被 url.parse 方法转换为一个对象了）
  let query = urlObj.query

  // 这里已经将查询字符串给解析出来了，然后挂载给了 req 对象
  // 在后面就可以直接通过 req.query 来直接访问了
  req.query = query

  // 获取本次请求的请求方法，例如可能是 GET POST
  // 直接转化成小写的目的是为了程序的健壮性
  let method = req.method.toLowerCase()

  console.log(`method: ${method}, pathname: ${pathname}, query: ${JSON.stringify(query)}`)

  // 处理静态资源
  if (method === 'get' && (pathname.startsWith('/node_modules/') || pathname.startsWith('/uploads/'))) {
    fs.readFile(path.join(__dirname, pathname), (err, data) => {
        if (err) {
          res.statusCode = 404
          return res.end()
        }
        res.writeHead(200, {
          'Content-Type': mime.lookup(pathname)
        })
        res.end(data)
      })
      // 当处理了这个静态资源请求的时候，直接 return ，没必要让代码继续往后执行了
    return
  }

  if (method === 'get' && pathname === '/') {
    handler.showIndex(req, res)
  } else if (method === 'get' && pathname === '/add') {
    handler.showAdd(req, res)
  } else if (method === 'get' && pathname === '/edit') {
    handler.showEdit(req, res)
  } else if (method === 'get' && pathname === '/tianjia') {
    handler.doGetAdd(req, res)
  } else if (method === 'post' && pathname === '/tianjia') {
    handler.doPostAdd(req, res)
  } else if (method === 'post' && pathname === '/add') {
    handler.doAdd(req, res)
  } else if (method === 'get' && pathname === '/remove') {
    handler.doRemove(req, res)
    // handler.doAsyncRemove(req, res)
  } else if (method === 'post' && pathname === '/edit') {
    handler.doEdit(req, res)
  }
}
