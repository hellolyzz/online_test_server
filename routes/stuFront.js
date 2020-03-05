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
  publicDao.multiQuery(sqls, err => {
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

// 根据试卷编号 获取试卷信息
// 1. 先判断学生是否做过该试卷 分数库里面是否有成绩
// 2. 若有成绩表示做过。不展示该试卷。无成绩，则需要获取
router.get('/getPaperInfo', function (req, res) {
  var testCode = req.query.testCode;
  var id = req.query.id;
  var sql = $sql.getpaperInfo(testCode);
  var sqlScore = $sql.IsScore(id, testCode)
  // console.log(testCode, req.params)
  publicDao.Query(sqlScore, function (err, data) {
    var dataStr = JSON.stringify(data)
    data = JSON.parse(dataStr)
    // console.log(data)
    if (data.length) {
      // 数组不为空即有该科目的成绩
      return res.send({
        data: null,
        meta: {
          status: 401,
          message: '你已经做过该试卷，不能够进行重复答题,请前往“我的成绩”查看该学科分数'
        }
      })
    } else {
      // 数组为空，获取试卷信息
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
    }
    // 有错误
    if (err) {
      return res.send({
        data: null,
        meta: {
          status: 400,
          message: '获取试卷失败'
        }
      })
    }
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
router.post('/postScore', function (req, res) {
  var params = req.body.params
  var sql = $sql.postScore(params)
  // console.log(params,sql)
  publicDao.Query(sql, function (err, data) {
    if (err) {
      return res.send({
        data: null,
        meta: {
          status: 401,
          message: '上传成绩失败'
        }
      })
    }
    // console.log(data)
    if (data) {
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

// 根据学生 id 查询成绩
router.get('/getScore/:id', function (req, res) {
  var id = req.params.id;
  var sql = $sql.getScore(id)
  // console.log(id,sql)
  publicDao.Query(sql, function (err, data) {
    if (err) {
      return res.send({
        data: null,
        meta: {
          status: 401,
          message: '获取成绩失败'
        }
      })
    }
    var dataStr = JSON.stringify(data)
    data = JSON.parse(dataStr)
    // console.log(data)
    if (data) {
      res.send({
        data: data,
        meta: {
          status: 200,
          message: '获取成绩成功'
        }
      })
    }
  })
})

module.exports = router
