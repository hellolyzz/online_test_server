var express = require('express')
var router = express.Router()
var publicDao = require('../dao/publicDao')
var $sql = require('../dao/scoreSql')
var util = require('../util/util')

// 获取所有考试学科
router.get('/:institute', function (req, res) {
  var queryInfo = req.query;
  var institute = req.params.institute
  console.log(queryInfo, institute)
  if (institute === 'undefined') {
    // 管理员
    var sql = $sql.getAllSubject(queryInfo)
  } else {
    // 教师
    var sql = $sql.getAllSubjectByTea(queryInfo, institute)
    // console.log(sql)
  }
  publicDao.multiQuery(sql, err => {
    return res.send({
      data: null,
      meta: {
        status: 401,
        message: '获取所有存在考试学科失败'
      }
    })
  }, data => {
    var dataStr = JSON.stringify(data)
    data = JSON.parse(dataStr)
    console.log(data)
    res.send({
      data: {
        data: data[0],
        total: util.arrObj({}, data[1]).total,
        pagesize: parseInt(queryInfo.pagesize),
        pagenum: parseInt(queryInfo.pagenum),
      },
      meta: {
        status: 200,
        message: '获取所有存在考试学科成功'
      }
    })
  })


})

// 获取对应学科的 所有同学的成绩
// 先判断对应学科是否有成绩存在
router.get('/getAllScore/:id', function (req, res) {
  var testCode = req.params.id
  var sql = $sql.getAllScore(testCode)
  // console.log(sql,testCode)
  var isSql = $sql.isScore(testCode)
  publicDao.Query(isSql, function (err, data) {
    if (data.length) {
      // 如果有成绩的话
      publicDao.multiQuery(sql, err => {
        return res.send({
          data: null,
          meta: {
            status: 401,
            message: '获取所有该学科所有同学成绩失败'
          }
        })
      }, data => {
        var dataStr = JSON.stringify(data)
        data = JSON.parse(dataStr)
        // console.log(data)
        res.send({
          data: {
            score: data[0],
            info: data[1]
          },
          meta: {
            status: 200,
            message: '获取所有该学科所有同学成绩成功'
          }
        })
      })
    } else {
      // console.log(data)
      return res.send({
        data: null,
        meta: {
          status: 402,
          message: '该学科暂无学生答题没有成绩'
        }
      })
    }
    if (err) {
      return res.send({
        data: null,
        meta: {
          status: 403,
          message: '获取所有该学科所有同学成绩失败'
        }
      })
    }

  })

})

// 根据id查成绩
router.get('/getScoreById/:id', function (req, res) {
  var id = req.params.id;
  var sql = $sql.getScoreById(id);
  console.log(id, sql)
  publicDao.Query(sql, function (err, data) {
    if (err) {
      return res.send({
        data: null,
        meta: {
          status: 402,
          message: '获取该学生成绩失败'
        }
      })
    }
    var dataStr = JSON.stringify(data)
    data = JSON.parse(dataStr)
    console.log(data)
    res.send({
      data: data,
      meta: {
        status: 200,
        message: '获取该学生成绩成功'
      }
    })
  })
})

module.exports = router