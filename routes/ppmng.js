// 人员管理接口

var express = require('express')
var router = express.Router()
var publicDao = require('../dao/publicDao')
var util = require('../util/util')
var $sql = require('../dao/ppmngSql')

router.get('/stuInfo',function(req, res){
  var sql = $sql.getAllStu();
  publicDao.Query(sql,function(err, data){
    if(err){
      return res.send({
        data: null,
        meta: {
          status: 400,
          message: 获取信息失败
        }
      })
    }
    res.send({
      // data: util.arrObj({},data),
      data: data,
      meta: {
        status: 200,
        message: '成功'
      },
    })
  })
})

router.get('/teaInfo',function(req,res){
  var sql = $sql.getAllTea();
  publicDao.Query(sql,function(err,data){
    if(err){
      return res.send(null, 400, "获取信息失败")
    }
    res.send({
      // data: util.arrObj({},data),
      data: data,
      meta: {
        status: 200,
        message: '成功'
      },
    })
  })
})

module.exports = router