// 在 node 中使用 artTemplate 模板引擎

const fs = require('fs')
const template = require('art-template')

// // var tmpStr = `
// //       hello {{ title }}
// //       {{ each list }}
// //         <li>{{ $value }}</li>
// //       {{ /each }}
// //     `

// let tmpStr = fs.readFileSync('./tmp.html', 'utf8')

// // 1. 调用 template 的 compile 函数
// var render = template.compile(tmpStr)

// // 2. 调用 render 函数，注入数据，得到解析替换过后的字符串
// var result = render({
//   title: 'world',
//   list: [
//     'apple', 'orange', 'banana'
//   ]
// })

// console.log(result)

// 在后台使用模板引擎
// 也就是在后台就已经将数据处理好了
const musicList = [
  { id: 1, title: '别问我是谁', singer: '王馨平', musicFileName: '王馨平 - 别问我是谁.mp3', posterFileName: '王馨平.jpg' },
  { id: 1, title: '我是谁', singer: '王馨平', musicFileName: '王馨平 - 别问我是谁.mp3', posterFileName: '王馨平.jpg' }
]

fs.readFile('./views/index.html',  'utf8', (err, data) => {
  if (err) {
    throw err
  }
  let render = template.compile(data)
  let result = render({
    musicList
  })
  console.log(result)
})
