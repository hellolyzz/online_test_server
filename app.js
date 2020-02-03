var express = require('express')
var path = require('path')
// var mysql = require('mysql')
var bodyParser = require('body-parser')
// 挂载多个路由
var mount = require('mount-routes')
// 使用token
var expressJwt = require('express-jwt')
// 跨域
var cors = require('cors')
// var router = require('./routes/users');


// 实例化
var app = express()

//使用expressJWT对路由进行token验证
let secretOrPrivateKey = "mykey"  //私钥 校验token时要使用
app.use(expressJwt({
  secret: secretOrPrivateKey
}).unless({
  //这里可以设置保护路由，login就不用进行token验证
  // 指定路由不经过token解析
  path: ['/api/user/login', '/api/user/getInfo', '/ueditor/ue']
}));

//token拦截器，当token失效时发出注销账号指令
app.use('/*', function (err, req, res, next) {
  console.log(err.name);
  originalUrl = req.originalUrl;
  console.log(originalUrl);
  //只对后端路由和部分user路由进行验证
  //如果请求/user或者/backend相关的内容，就进行token验证，仅访问前端内容不进行token验证
  if (originalUrl.indexOf('/api/user') > -1 || originalUrl.indexOf('/api/backend') > -1) {
    if (err.name === 'UnauthorizedError') {
      console.log('身份认证不通过');
      //如果身份验证不通过，则发送错误信息提示，前端收到该提示后，在router拦截器里面设置相应对应办法
      res.send(null, 401 ,"error");
    } else {
      next();
    }
  } else {
    next();
  }
});


// 跨域
app.use(cors());

// 设置跨域和相应数据格式
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  // if (req.method == 'OPTIONS') res.send(200)
  // /*让options请求快速返回*/ else next()
  // res.send(JSON.stringify({
  //   data:'hello world'
  // }))
  next()
})


// 获取表单post请求体数据
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 挂载路由文件
// app.use(router)
mount(app, path.join(__dirname + '/routes'), true);

// 处理404
app.use(function (req, res, next) {
  res.send('404 not found')
})

// 配置全局错误处理文件
// 当next(err)时候才会执行该中间件
app.use(function (err, req, res, next) {
  res.status(500).json({
    err_code: 500,
    message: err.message
  })
})

app.listen(3000, function () {
  console.log('server is running at port 3000')
})

module.exports = app
