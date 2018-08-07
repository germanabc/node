const Music = require('./music')
const formidable = require('formidable')
const path = require('path')

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


// POST /add
exports.doAdd = (req, res) => {
  let form = new formidable.IncomingForm()
  form.uploadDir = path.join(__dirname, 'uploads')
  form.keepExtensions = true
  form.maxFieldsSize = 20 * 1024 * 1024;
  form.parse(req, (err, fields, files) => {
    if (err) {
      throw err
    }
    let title = fields.title
    let singer = fields.singer
    let music = path.basename(files.music.path)
    let poster = path.basename(files.poster.path)

    var m = new Music(title, singer, music, poster)

    m.save()

    res.redirect('/')
  })
}

// GET /edit
exports.showEdit = (req, res) => {
  let id = parseInt(req.query.id)
  let music = Music.getById(id)
  if (!music) {
    return res.send('music not exists')
  }
  res.render('edit', {
    music
  })
}

// POST /edit
exports.doEdit = (req, res) => {
  // 拿到要修改的音乐id
  // res.send(req.query.id)

  let id = parseInt(req.body.id)
  let title = req.body.title
  let singer = req.body.singer

  if (!Music.getById(id)) {
    return res.send('music not exists')
  }

  let music = new Music(title, singer)
  music.updateById(id)
  res.redirect('/')
}

// GET /login
exports.showLogin = (req, res) => {
  // res.send('login page')
  res.render('login', {
    title: '登陆页面'
  })
}

const users = [
  { username: 'admin', password: '123456' },
  { username: 'aaa', password: '123a' },
  { username: 'aba', password: '123111' },
  { username: 'bbc', password: 'abc123' }
]

// POST /login
exports.doLogin = (req, res) => {
  let username = req.body.username
  let password = req.body.password
    // 拿到用户名和密码去数据库做比对
  let user = users.find(u => u.username === username)
  if (!user) {
    return res.send('user not exists')
  }
  if (user.password !== password) {
    return res.send('password invalid')
  }
  res.send('login success')
    // 如果有，则提交用户登录成功
    // 如果没有，告诉用户，登陆失败
}
