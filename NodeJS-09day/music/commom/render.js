const fs = require('fs')
const template = require('art-template')
const path = require('path')
const config = require('../config')

module.exports = function(res) {
  res.render = function(templateName, obj = {}) {
    fs.readFile(`${path.join(config.viewPath, templateName)}.html`, 'utf8', (err, data) => {
      if (err) {
        throw err
      }
      let render = template.compile(data)
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      })
      res.end(render(obj))
    })
  }
}
