const path = require('path')

module.exports = {
  port: 3000,
  host: '192.168.44.36',
  viewPath: path.join(__dirname, 'views'),
  uploadDirPath: path.join(__dirname, 'uploads')
}
