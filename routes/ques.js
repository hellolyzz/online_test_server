var express = require('express')

var router = express.Router()

var publicDao = require('../dao/publicDao')
// var encodeJwt = require('../util/token')
var $sql = require('../dao/quesSql')

// 获取所有题库

router.get('/allQues',function(req,res){
  var sql = $sql.allQues();
  publicDao.Query(sql, function(err, data){
    if (err) {
      return res.send({
        data: null,
        meta: {
          status: 400,
          message: "服务器开小差了"
        }
      })
    }
    console.log('获取信息成功')
    res.send({
      data: data,
      meta: {
        status: 200,
        message: '成功'
      },
    })
  })
})

// 获取多选题
router.get('/multichoice',function(req,res){
  // var params
  var sql = $sql.multichoice()
  publicDao.Query(sql,function(err, data){
    if(err) throw err;
    if(data){
      res.send({
        data: data,
        meta: {
          status: 200,
          message: '获取选择题成功'
        }
      })
    } else {
      res.send({
        data: null,
        meta: {
          status: 401,
          message: '获取选择题失败'
        }
      })
    }
  })
})

// 获取判断题
router.get('/judgeques',function(req,res){
  // var params
  var sql = $sql.judgeQues()
  publicDao.Query(sql,function(err, data){
    if(err) throw err;
    if(data){
      res.send({
        data: data,
        meta: {
          status: 200,
          message: '获取判断题成功'
        }
      })
    } else {
      res.send({
        data: null,
        meta: {
          status: 401,
          message: '获取判断题失败'
        }
      })
    }
  })
})


// 获取填空题
router.get('/fillques',function(req,res){
  // var params
  var sql = $sql.fillQues()
  publicDao.Query(sql,function(err, data){
    if(err) throw err;
    if(data){
      res.send({
        data: JSON.parse(JSON.stringify(data)) ,
        meta: {
          status: 200,
          message: '获取填空题成功'
        }
      })
    } else {
      res.send({
        data: null,
        meta: {
          status: 401,
          message: '获取填空题失败'
        }
      })
    }
  })
})

module.exports = router
