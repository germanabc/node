const url = require('url')
const fs = require('fs')
const path = require('path')
const template = require('art-template')
const render = require('./commom/render')

const musicList = [
  { id: 1, title: '别问我是谁', singer: '王馨平', musicFileName: '王馨平 - 别问我是谁.mp3', posterFileName: '王馨平.jpg' },
  { id: 1, title: '我是谁', singer: '王馨平', musicFileName: '王馨平 - 别问我是谁.mp3', posterFileName: '王馨平.jpg' }
]

module.exports = function(req, res) {

  // 调用 render，传入 res 对象，然后 res 对象就拥有了 render 方法
  render(res)

  // res.render = function(templateName, obj = {}) {
  //   fs.readFile(`./views/${templateName}.html`, 'utf8', (err, data) => {
  //     if (err) {
  //       throw err
  //     }
  //     let render = template.compile(data)
  //     res.end(render(obj))
  //   })
  // }


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

  // 获取本次请求的请求方法，例如可能是 GET POST
  // 直接转化成小写的目的是为了程序的健壮性
  let method = req.method.toLowerCase()

  console.log(`method: ${method}, pathname: ${pathname}, query: ${JSON.stringify(query)}`)

  if (method === 'get' && (pathname.startsWith('/node_modules/') || pathname.startsWith('/uploads/'))) {
    // /node_modules/bootstrap/dist/css/bootstrap.css
    fs.readFile(path.join(__dirname, pathname), (err, data) => {
      if (err) {
        // 发送 404 状态码
        res.statusCode = 404

        // 如果使用 res.end() 的时候，传入了字符串，那么状态码会被更改为 200
        // 所以使用 res.statusCode = 404 设置 404 的时候，就不要往 end 里面传字符串了
        // 直接结束响应即可
        return res.end()
      }
      res.end(data)
    })
  }

  if (method === 'get' && pathname === '/') {
    // fs.readFile('./views/index.html', 'utf8', (err, data) => {
    //   if (err) {
    //     throw err
    //   }
    //   let render = template.compile(data)
    //   res.end(render({
    //     musicList
    //   }))
    // })
    // render('index', {
    //   musicList
    // }, res)

    res.render('index', {
      musicList
    })


    // 所有的响应都通过 res 这个对象发出
    // 例如：res.write res.end
    // 我们给 res 对象扩展一个方法：render
    // 调用的时候：res.render('模板文件名', '要注入的数据')

  } else if (method === 'get' && pathname === '/add') {
    // fs.readFile('./views/add.html', (err, data) => {
    //   if (err) {
    //     throw err
    //   }
    //   res.end(data)
    // })
    res.render('add', {
      subTitle: '添加音乐页面'
    })
  } else if (method === 'get' && pathname === '/edit') {
    // fs.readFile('./views/edit.html', (err, data) => {
    //   if (err) {
    //     throw err
    //   }
    //   res.end(data)
    // })
    res.render('edit')
  }
}
