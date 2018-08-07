// 1. 引入 express
const express = require('express')
  // 2. 创建一个 Router
const router = express.Router()

const handler = require('./handler')

// 接下来直接把 get、post 等挂载给 router 即可
// router现在就相当于 app

// 3. module.exports = router
// 4. 在 app.js 文件中使用 app.use(router) 来挂载这个路由系统

router.get('/', handler.showIndex)
  .get('/add', handler.showAdd)
  .post('/add', handler.doAdd)
  .get('/edit', handler.showEdit)
  .post('/edit', handler.doEdit)
  .get('/login', handler.showLogin)
  .post('/login', handler.doLogin)

// 将 router 暴露出去
module.exports = router
