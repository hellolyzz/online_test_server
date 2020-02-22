var express = require('express')
var router = express.Router()
var $sql = require('../dao/stuFrontSql')
var util = require('../util/util')
var publicDao = require('../dao/publicDao')

router.post('/getTestInfo',function(req, res){
  var queryInfo = req.body.params.queryInfo
  var params = req.body.params.params;
  // console.log(queryInfo, params)
  var sqls = $sql.getTestInfo(params,queryInfo);
  // console.log(sqls)
  publicDao.multiQuery(sql, err => {
    return res.send({
      data: {
        data: null
      },
      meta:{
        message: '获取所有试卷失败',
        meta: 401
      }
    })
  },data => {
    var dataStr = JSON.stringify(data)
    data = JSON.parse(dataStr)
    // console.log(data)
    res.send({
      data: {
        data: data[0],
        total: util.arrObj({}, data[1]).total
      },
      meta:{
        message: '获取所有试卷成功',
        meta: 200
      }
    })
  })
})

module.exports = router
