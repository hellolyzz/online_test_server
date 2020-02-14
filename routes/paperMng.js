var express = require('express')

var router = express.Router()
var publicDao = require('../dao/publicDao')
var $sql = require('../dao/paperSql')

// 增加试卷
router.put('/', function(req, res){
  var params = req.params;
  var sql = $sql.addPaper(params)
  publicDao.Query(sql, function(err,data){
    if(err){
      return res.send({
        data: null,
        meta: {
          status: 400,
          message: "服务器开小差了"
        }
      })
    }
    console.log(data)
    res.send({
      data: data,
      meta: {
        status: 200,
        message: '加入考试成功'
      }
    })
  })
})