const http = require('http')
const fs = require('fs')

http
  .createServer((req, res) => {
    // /assets/main.css
    // /README.md
    // /assets/index.html
    // /img/请求和响应.png
    let url = req.url
    if (url === '/') {
      fs.readFile('./assets/index.html', (err, data) => {
        if (err) {
          throw err
        }
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8'
        })
        res.end(data)
      })
    }
  })
  .listen(3000, () => {
    console.log('server is runnig')
  })
