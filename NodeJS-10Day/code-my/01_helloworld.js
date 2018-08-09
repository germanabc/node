//加载express
const express=require('express')
//加载node path 模块
const path=require('path')
//加载node fs 模块
const fs=require('fs')


const app=express()

// 在 express 中处理静态资源
// 当请求进来的时候，express 自动的先去 assets 目录下找有没有对应的路径文件
// 如果找到，直接读取回来返回响应

// app.use:  http 请求的中间件
// 内置方法 
// express.static(root, [options])
// express.static 是 Express 内置的唯一一个中间件

// 处理静态资源路径
//1. use 有两个参数，第一个参数可选，用来指定请求路径
//1.第二个参数用来指定要映射路径(去哪个目录找静态资源)
//1.第二个参数用来指定要映射路径(去哪个目录找静态资源)
app.use(express.static(path.join(__dirname, 'assets')))
app.use('/uploads',express.static(path.join(__dirname, 'uploads')))
app.use('/a',express.static(path.join(__dirname, 'uploads')))

//给app 设定一个get请求的处理函数
app.get('/',(req,res)=>{
    // fs.readFile(path[, options], callback)
    // 如果未指定字符编码，则返回原始的 buffer, 所以指定'utf-8'编码
    fs.readFile('./views/index.html', 'utf-8',(err,data)=>{
         if(err){
             throw err
         }
         console.log(data)//data 是文件的内容
         res.send(data)
    })
})


app.get('/add',(req,res)=>{
    res.send('add page')
    console.log(req.query.foo)//undefined
})
//设置监听，启动服务器
app.listen(3000,()=>{
    console.log('server is running at port 3000.')
})