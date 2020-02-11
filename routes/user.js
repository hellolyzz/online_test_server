// 用户信息相关接口

var express = require('express')
var router = express.Router()
var $sql = require('../dao/userSql')
var publicDao = require('../dao/publicDao')
var encodeJwt = require('../util/token')
var util = require('../util/util')

// 登录 11
router.post('/', function (req, res) {
  // console.log(req.body.role)
  var role = req.body.role;
  var id = req.body.id;
  var pwd = req.body.pwd;
  // req.user
  // console.log(id, pwd, role)
  var token = encodeJwt.encodeJwt();
  // var sql = $sql.loginSql(id, pwd)

  // 管理员
  if (role === 0) {
    var sql = $sql.loginSql(id, pwd)
  } else if (role == 1) {
    // 教师
    var sql = $sql.loginSqlT(id, pwd);
  } else {
    // 学生
    var sql = $sql.loginSqlS(id, pwd);
  }
  publicDao.Query(sql, function (err, data) {
    if (data.length) {
      token = 'Bearer' + token;
      // console.log({ 'success': "success", "token": token, "data": data })
      // console.log(data)
      res.send({
        // data: Object.assign(data[0], { "token": token }),
        // data: data,
        data: Object.assign( util.arrObj({},data), { "token": token }),
        meta: {
          status: 200,
          message: '登录成功'
        },
      })
    } else {
      console.log("error")
      return res.send({
        data: null,
        meta: {
          status: 401,
          message: "账号或密码错误，登录失败"
        }
      })
    }
    if (err) {
      return res.send({
        data: null,
        meta: {
          status: 401,
          message: "账号或密码错误，登录失败"
        }
      })
    }
  })
})


// 获取信息 11
router.get('/:id', function (req, res) {
  var id = req.params.id;
  // console.log(id)
  var sql = $sql.getInfo(id)
  publicDao.Query(sql, function (err, data) {
    if (err) {
      return res.send({
        data: null,
        meta: {
          status: 400,
          message: "服务器开小差了getInfo"
        }
      })
      // throw err 
    }
    // console.log(err)
    // console.log('获取信息成功')
    // console.log('getInfoData',data)
    res.send({
      data: util.arrObj({},data),
      // data: data,
      meta: {
        status: 200,
        message: '成功'
      },
    })
  })
})

// 更改信息
router.put('/:id', function (req, res) {
  var id = req.params.id
  // console.log(id)
  var params = req.body
  // console.log(params);
  var sql = $sql.updateInfo(id, params)
  publicDao.Query(sql, function (err, data) {
    if (err) {
      return res.send({
        data: null,
        meta: {
          status: 400,
          message: "服务器开小差了updateInfo"
        }
      })
    }
    console.log('修改信息成功')
    console.log('updateInfo',data)
    res.send({
      data: util.arrObj({},data),
      // data: data,
      meta: {
        status: 200,
        message: '成功'
      },
    })
  })
})

module.exports = router