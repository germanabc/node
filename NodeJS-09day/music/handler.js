const Music = require('./music')
const formidable = require('formidable')
const config = require('./config')
const path = require('path')

// querystring 是一个核心模块，
// 该模块中暴露了一个方法 parse ，需要接收一个查询字符串
// 返回解析出来的对象
const qString = require('querystring')

// GET /
exports.showIndex = (req, res) => {
  res.render('index', {
    musicList: Music.getAll()
  })
}

// GET /add
exports.showAdd = (req, res) => {
  res.render('add', {
    subTitle: '添加音乐'
  })
}

// GET /edit
exports.showEdit = (req, res) => {
  let id = parseInt(req.query.id)
  let music = Music.getById(id)
  if (!music) {
    return res.end('music not exists')
  }

  res.render('edit', {
    music
  })
}

// POST /doEdit
exports.doEdit = (req, res) => {
  let id = parseInt(req.query.id)
  if (!Music.getById(id)) {
    return res.end('music not exists')
  }
  let data = ''
  req.on('data', chunk => {
    data += chunk
  })
  req.on('end', () => {
    let body = qString.parse(data)
    let music = new Music(body.title, body.singer)
    music.updateById(id)
    res.redirect('/')
  })
}

// POST /add
exports.doAdd = (req, res) => {
  // 有文件的表单提交，这个时候自己处理就非常的麻烦
  // 这个时候，我们需要借助于一个第三方包：formidable
  // formidable: 专注于处理表单文件上传
  // let data = ''
  // req.on('data', chunk => {
  //   data += chunk
  // })
  // req.on('end', () => {
  //   // console.log(qString.parse(data))
  //   console.log(data)
  // })

  // 1. npm install --save formidable
  // 2. var formidable = require('formidable')
  let form = new formidable.IncomingForm()

  // 配置上传文件的接收路径
  form.uploadDir = config.uploadDirPath

  // 配置保留扩展名
  form.keepExtensions = true

  // 设置最大上传可以接收的文件大小，单位是字节
  form.maxFieldsSize = 20 * 1024 * 1024

  // fields 是一个对象，里面保存的就是解析出来的键值对
  // formidable 这个第三包自动将文件解析写入到了 操作系统临时目录中了
  // 同时也把文件给改名了，而且后缀名也给去掉了
  // formidable 可以配置上传的路径，已经是否保留后缀名
  form.parse(req, (err, fields, files) => {
    if (err) {
      throw err
    }
    let title = fields.title
    let singer = fields.singer
    let music = path.basename(files.music.path)
    let poster = path.basename(files.poster.path)
    let m = new Music(title, singer, music, poster)
    m.save()
    
    // 浏览器会根据 302 和 Location 去主动请求该地址
    // res.writeHead(302, {
    //   'Location': '/'
    // })
    // res.end()
    
    res.redirect('/')
  })
}

// GET /tianjia
exports.doGetAdd = (req, res) => {
  // 对于普通表单 get 请求，就是解析 url 地址栏中的查询字符串即可
  // 拿到 request 请求对象中的表单提交过来的数据
  let title = req.query.title
  let singer = req.query.singer
  var music = new Music(title, singer, 'dsadsa', 'dsadsa')
  music.save()
  res.end('get add success')
}

// POST /tianjia
exports.doPostAdd = (req, res) => {
  // 对于普通表单 post 请求
  // 需要通过 监听 req 对象的 data  和 end 事件来接收
  let data = ''
  req.on('data', (chunk) => {
    data += chunk
  })
  req.on('end', () => {
    let body = qString.parse(data)
    let title = body.title
    let singer = body.singer
    console.log(title)
    console.log(singer)
    var music = new Music(title, singer, '达明一派 - 石头记.mp3', '达明一派.jpg')
    music.save()
    res.end('post add success')
  })
}

// GET /remove
// param: id
// 处理同步 remove
exports.doRemove = (req, res) => {
  let id = parseInt(req.query.id)
  
  // 删除之前，先查询一下，是否有该记录，如果没有，提示用户该记录不存在
  if(!Music.getById(id)) {
    // 告诉用户，没有该记录
    return res.end('music not exists')
  }

  // 执行删除
  Music.removeById(id)

  // 重定向，重定向到自己，就会页面自刷新
  // 重定向值针对于 同步请求有用
  // 如果是异步请求想要实现跳转，必须在前端完成
  res.redirect('/')
}

// 处理异步请求 remove
exports.doAsyncRemove = (req, res) => {
  let id = parseInt(req.query.id)
  
  // 删除之前，先查询一下，是否有该记录，如果没有，提示用户该记录不存在
  if(!Music.getById(id)) {
    // 告诉用户，没有该记录
    return res.end(JSON.stringify({
      code: 2001,
      msg: 'music not exists'
    }))
  }

  // 执行删除
  Music.removeById(id)
  res.json({
    code: 2000,
    msg: 'success'
  })
}
