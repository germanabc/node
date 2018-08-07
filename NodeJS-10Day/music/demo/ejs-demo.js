const ejs = require('ejs')

let tmp = 'hello <%= title %>'

let template = ejs.compile(tmp)

let result = template({
  title: 'world'
})

console.log(result)
