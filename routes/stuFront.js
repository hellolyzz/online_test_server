var express = require('express')
var router = express.Router()
var $sql = require('../dao/stuFrontSql')
var util = require('../util/util')
var publicDao = require('../dao/publicDao')

// 获取该学生试卷
router.post('/getTestInfo', function (req, res) {
  var queryInfo = req.body.params.queryInfo
  var params = req.body.params.params;
  // console.log(queryInfo, params)
  var sqls = $sql.getTestInfo(params, queryInfo);
  // console.log(sqls)
  publicDao.multiQuery(sql, err => {
    return res.send({
      data: {
        data: null
      },
      meta: {
        message: '获取所有试卷失败',
        meta: 401
      }
    })
  }, data => {
    var dataStr = JSON.stringify(data)
    data = JSON.parse(dataStr)
    // console.log(data)
    res.send({
      data: {
        data: data[0],
        total: util.arrObj({}, data[1]).total
      },
      meta: {
        message: '获取所有试卷成功',
        meta: 200
      }
    })
  })
})

// 获取学生信息byid
router.get('/getInfoById/:id', function (req, res) {
  var id = req.params.id;
  // console.log(id)
  var sql = $sql.getInfoById(id);
  publicDao.Query(sql, function (err, data) {
    if (err) {
      return res.send({
        data: null,
        meta: {
          status: 401,
          message: '获取个人信息失败'
        }
      })
    }
    var dataStr = JSON.stringify(data);
    var data = JSON.parse(dataStr)
    // console.log(data)
    // console.log(util.arrObj({},data))
    res.send({
      data: util.arrObj({}, data),
      meta: {
        status: 200,
        message: '获取个人信息成功'
      }
    })
  })
})

// 修改学生信息
router.put('/editStu', function (req, res) {
  var params = req.body.params;
  // console.log(params)
  var sql = $sql.editStuInfo(params);
  // console.log(sql)
  publicDao.Query(sql, function (err, data) {
    if (err) {
      return res.send({
        data: null,
        meta: {
          status: 401,
          message: '修改个人信息失败'
        }
      })
    }
    // console.log(data)
    res.send({
      data: util.arrObj({}, data),
      meta: {
        status: 200,
        message: '修改个人信息成功'
      }
    })
  })
})

// 获取试卷信息
router.get('/getPaperInfo/:testCode', function (req, res) {
  var testCode = req.params.testCode;
  var sql = $sql.getpaperInfo(testCode);
  // console.log(testCode, sql)
  publicDao.Query(sql, function (err, data) {
    if (err) {
      return res.send({
        data: null,
        meta: {
          status: 401,
          message: '获取试卷信息失败'
        }
      })
    }
    var dataStr = JSON.stringify(data)
    data = JSON.parse(dataStr)
    // console.log(data)
    res.send({
      data: util.arrObj({}, data),
      meta: {
        status: 200,
        message: '获取试卷信息成功'
      }
    })
  })
})

// 获取试卷全部题目信息
router.get('/getQuesByPaperCode/:id', function (req, res) {
  var testCode = req.params.id;
  // console.log(testCode)
  var sql = $sql.getQuesByPaperCode(testCode)
  // console.log(sql)
  publicDao.multiQuery(sql, err => {
    return res.send({
      data: null,
      meta: {
        status: 401,
        message: '获取试卷信息失败'
      }
    })
  }, data => {
    var dataStr = JSON.stringify(data)
    data = JSON.parse(dataStr)
    // console.log(data)
    res.send({
      data: data,
      meta: {
        status: 200,
        message: '获取试卷信息成功'
      }
    })
  })
})

// 上传成绩
router.post('/postScore', function(req, res){
  var params = req.body.params
  var sql = $sql.postScore(params)
  // console.log(params,sql)
  publicDao.Query(sql, function(err, data){
    if(err){
      return res.send({
        data: null,
        meta: {
          status: 401,
          message: '上传成绩失败'
        }
      })
    }
    // console.log(data)
    if(data){
      res.send({
        data: null,
        meta: {
          status: 200,
          message: '上传成绩成功'
        }
      })
    }
  })
})

module.exports = router
