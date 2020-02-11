var express = require('express')

var router = express.Router()

var publicDao = require('../dao/publicDao')
// var encodeJwt = require('../util/token')
var $sql = require('../dao/quesSql')
var util = require('../util/util')


// 获取所有考试场次信息
router.get('/TestInfo', function (req, res) {
  // console.log(req.query)
  var queryInfo = req.query;
  var sqls = $sql.getTestInfo(queryInfo)
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
  },data => {
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

// 获取多选题
router.get('/multichoice/:paperId', function (req, res) {
  var paperId = req.params.paperId;
  var queryInfo = req.query;
  // console.log(queryInfo)
  var sqls = $sql.getMultichoice(paperId,queryInfo)
  publicDao.multiQuery(sqls,err => {
    return res.send({
      data: null,
      meta: {
        status: 400,
        message: "服务器开小差了"
      }
    })
  },data => {
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

// 获取判断题
router.get('/judgeques/:paperId', function (req, res) {
  var paperId = req.params.paperId;
  var queryInfo = req.query;
  // console.log(queryInfo)
  var sqls = $sql.getJudgeQues(paperId,queryInfo)
  publicDao.multiQuery(sqls,err => {
    return res.send({
      data: null,
      meta: {
        status: 400,
        message: "服务器开小差了"
      }
    })
  },data => {
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


// 获取填空题
router.get('/fillques/:paperId', function (req, res) {
  var paperId = req.params.paperId;
  var queryInfo = req.query;
  // console.log(queryInfo)
  var sqls = $sql.getFillQues(paperId,queryInfo)
  publicDao.multiQuery(sqls,err => {
    return res.send({
      data: null,
      meta: {
        status: 400,
        message: "服务器开小差了"
      }
    })
  },data => {
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

module.exports = router
