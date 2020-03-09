var express = require('express')

var router = express.Router()
var publicDao = require('../dao/publicDao')
var $sql = require('../dao/paperSql')
var util = require('../util/util')

// 增加试卷
// 1.先判断考试编号是否重复
// 2.无重复才可以插入表中
router.post('/', function (req, res) {
  var params = req.body.params;
  // console.log(params)
  var sql = $sql.addPaper(params)
  var sql2 = $sql.isTeseCodeExsit(params)
  // console.log(sql)
  publicDao.Query(sql2, function (err, data) {
    var dataStr = JSON.stringify(data)
    data = JSON.parse(dataStr)
    // 是个数组，判断数组有无值，有则testCode存在不可以插入，无则可以插入该次考试
    // console.log(data)
    // 表示不存在testCOde，则插入
    if (!data.length) {
      publicDao.multiQuery(sql, err => {
        return res.send({
          data: null,
          meta: {
            status: 400,
            message: "服务器开小差了"
          }
        })
      }, data => {
        // console.log(data)
        res.send({
          data: data,
          meta: {
            status: 200,
            message: '创建考试成功，可在考试查询中查看'
          }
        })
      })
    } else {
      // 存在该testcode
      res.send({
        data: null,
        meta: {
          status: 401,
          message: '此考试编号已存在，请核对后再添加'
        }
      })
    }
    if (err) {
      console.log(err)
      return res.send({
        data: null,
        meta: {
          status: 400,
          message: "服务器开小差了"
        }
      })
    }
  })
})


// 根据testCode查询考试信息
router.get('/getTestInfoById/:testCode', function (req, res) {
  var testCode = req.params.testCode;
  var queryInfo = req.query;
  // console.log(testCode)
  var sqls = $sql.getTestInfoById(testCode);
  // console.log(sqls)
  publicDao.multiQuery(sqls, err => {
    if (err) {
      return res.send({
        data: null,
        meta: {
          status: 400,
          message: "服务器开小差了"
        }
      })
    }
  }, data => {
    var dataStr = JSON.stringify(data)
    var data = JSON.parse(dataStr)
    // console.log(data)
    res.send({
      data: {
        data: data[0],
        total: util.arrObj({}, data[1]).total,
        pagesize: parseInt(queryInfo.pagesize),
        pagenum: parseInt(queryInfo.pagenum)
      },
      meta: {
        status: 200,
        message: '成功'
      },
    })
  })
})
module.exports = router;