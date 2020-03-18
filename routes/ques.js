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

// 获取多选题
router.get('/multichoice/:paperId', function (req, res) {
  var paperId = req.params.paperId;
  var queryInfo = req.query;
  // console.log(queryInfo)
  var sqls = $sql.getMultichoice(paperId, queryInfo)
  publicDao.multiQuery(sqls, err => {
    return res.send({
      data: null,
      meta: {
        status: 400,
        message: "服务器开小差了"
      }
    })
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

// 获取判断题
router.get('/judgeques/:paperId', function (req, res) {
  var paperId = req.params.paperId;
  var queryInfo = req.query;
  // console.log(queryInfo)
  var sqls = $sql.getJudgeQues(paperId, queryInfo)
  publicDao.multiQuery(sqls, err => {
    return res.send({
      data: null,
      meta: {
        status: 400,
        message: "服务器开小差了"
      }
    })
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


// 获取填空题
router.get('/fillques/:paperId', function (req, res) {
  var paperId = req.params.paperId;
  var queryInfo = req.query;
  // console.log(queryInfo)
  var sqls = $sql.getFillQues(paperId, queryInfo)
  publicDao.multiQuery(sqls, err => {
    return res.send({
      data: null,
      meta: {
        status: 400,
        message: "服务器开小差了"
      }
    })
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
// 获取选择题，填空题，判断题分别有多少个
router.get('/getNumberQ/:paperId', function (req, res) {
  var paperId = req.params.paperId;
  var sqls = $sql.getNumberQ(paperId);
  publicDao.multiQuery(sqls, err => {
    res.send(null, 400, "获取题目数量失败")
  }, data => {
    var dataStr = JSON.stringify(data);
    var data = JSON.parse(dataStr)
    // console.log(data);
    res.send({
      data: {
        totalM: util.arrObj({}, data[0]).total,
        totalJ: util.arrObj({}, data[1]).total,
        totalF: util.arrObj({}, data[2]).total
      },
      meta: {
        status: 200,
        message: '获取题目数量成功'
      }
    })
  })
})

// 增加选择题 限制在20个以内
// 1.先判断是否有20个满了就不能添加了
// 3.添加
// 2.判断题号是否重复
router.post('/addMulti', function (req, res) {
  var params = req.body.params;
  var paperId = req.body.paperId;
  console.log(params, paperId);
  var sqls = $sql.addMulti(params, paperId);
  console.log(sqls);
  var sqlsNum = $sql.getNumberQ(paperId);
  var sqlIsExsit = $sql.isQuestionIdExsitM(params)
  // 1.判断是否有20个
  publicDao.multiQuery(sqlsNum, err => {
    res.send(null, 400, "获取题目数量失败")
  }, data => {
    var dataStr = JSON.stringify(data);
    var data = JSON.parse(dataStr)
    var total = util.arrObj({}, data[0]).total;
    console.log(total);
    if (total <= 19) {
      // 2.判断是否存在该题号
      publicDao.Query(sqlIsExsit, function (err, data) {
        if (err) {
          return res.send({
            data: null,
            meta: {
              status: 405,
              message: '添加失败请重试'
            }
          })
        }
        var dataStrisExsit = JSON.stringify(data)
        data = JSON.parse(dataStrisExsit)
        console.log('dataisExsitM:', data)
        // 没有重复题号
        if (data.length === 0) {
          // 3.添加
          publicDao.multiQuery(sqls, err => {
            console.log('error:' + err)
            return res.send({
              data: null,
              meta: {
                status: 401,
                message: '增加选择题失败'
              }
            })
          }, data => {
            // console.log('data:' + data)
            res.send({
              data: data,
              meta: {
                status: 200,
                message: '增加选择题成功'
              }
            })
          })
        } else {
          // 有重复题号
          res.send({
            data: null,
            meta: {
              status: 403,
              message: '题号与已有题目重复，请核对正确后再添加'
            }
          })
        }
      })
    } else {
      res.send({
        data: null,
        meta: {
          status: 402,
          message: '题目数量已达20，请删除原有题目后再添加'
        }
      })
    }
  })
})

// 增加判断题
router.post('/addJudge', function (req, res) {
  var params = req.body.params;
  var paperId = req.body.paperId;
  console.log(params, paperId);
  var sqls = $sql.addJudge(params, paperId);
  // console.log(sqls);
  var sqlsNum = $sql.getNumberQ(paperId);
  var sqlIsExsit = $sql.isQuestionIdExsitJ(params)
  // 1.判断是否有10个
  publicDao.multiQuery(sqlsNum, err => {
    res.send(null, 400, "获取题目数量失败")
  }, data => {
    var dataStr = JSON.stringify(data);
    var data = JSON.parse(dataStr)
    var total = util.arrObj({}, data[1]).total;
    console.log(total);
    if (total <= 9) {
      // 2.判断是否存在该题号
      publicDao.Query(sqlIsExsit, function (err, data) {
        if (err) {
          return res.send({
            data: null,
            meta: {
              status: 405,
              message: '添加失败请重试'
            }
          })
        }
        var dataStrisExsit = JSON.stringify(data)
        data = JSON.parse(dataStrisExsit)
        console.log('dataisExsitJ:', data)
        // 没有重复题号
        if (data.length === 0) {
          // 3.添加
          publicDao.multiQuery(sqls, err => {
            console.log('error:' + err)
            return res.send({
              data: null,
              meta: {
                status: 401,
                message: '增加判断题失败'
              }
            })
          }, data => {
            // console.log('data:' + data)
            res.send({
              data: data,
              meta: {
                status: 200,
                message: '增加判断题成功'
              }
            })
          })
        } else {
          // 有重复题号
          res.send({
            data: null,
            meta: {
              status: 403,
              message: '题号与已有题目重复，请核对正确后再添加'
            }
          })
        }
      })
    } else {
      res.send({
        data: null,
        meta: {
          status: 402,
          message: '题目数量已达10，请删除原有题目后再添加'
        }
      })
    }
  })
})

// 添加天空题
router.post('/addFill', function (req, res) {
  var params = req.body.params;
  var paperId = req.body.paperId;
  // console.log(params, paperId);
  var sqls = $sql.addFill(params, paperId);
  // console.log(sqls);
  var sqlsNum = $sql.getNumberQ(paperId);
  var sqlIsExsit = $sql.isQuestionIdExsitF(params)
  // 1.是否有10个
  publicDao.multiQuery(sqlsNum, err => {
    res.send(null, 400, "获取题目数量失败")
  }, data => {
    var dataStr = JSON.stringify(data);
    var data = JSON.parse(dataStr)
    var total = util.arrObj({}, data[2]).total;
    // console.log(total);
    if (total <= 9) {
      // 2.判重
      publicDao.Query(sqlIsExsit, function (err, data) {
        if (err) {
          return res.send({
            data: null,
            meta: {
              status: 405,
              message: '添加失败请重试'
            }
          })
        }
        var dataStrisExsit = JSON.stringify(data)
        data = JSON.parse(dataStrisExsit)
        // console.log('dataisExsitF:', data)
        // 没有重复题号
        if (data.length === 0) {
          // 3.添加
          publicDao.multiQuery(sqls, err => {
            // console.log('error:' + err)
            return res.send({
              data: null,
              meta: {
                status: 401,
                message: '增加填空题失败'
              }
            })
          }, data => {
            // console.log('data:' + data)
            res.send({
              data: data,
              meta: {
                status: 200,
                message: '增加填空题成功'
              }
            })
          })
        } else {
          // 有重复题号
          res.send({
            data: null,
            meta: {
              status: 403,
              message: '题号与已有题目重复，请核对正确后再添加'
            }
          })
        }
      })
    } else {
      res.send({
        data: null,
        meta: {
          status: 402,
          message: '题目数量已达10，请删除原有题目后再添加'
        }
      })
    }
  })
})


// 查找选择题ById
router.get('/findMultiById/:id', function (req, res) {
  var id = req.params.id;
  var sql = $sql.findMultiById(id);
  publicDao.Query(sql, function (err, data) {
    if (err) {
      return res.send(null, 401, 'error')
    }
    var dataStr = JSON.stringify(data);
    var data = JSON.parse(dataStr)
    // console.log(data);
    res.send({
      data: util.arrObj({}, data),
      meta: {
        status: 200,
        message: '获取题目信息成功'
      }
    })
  })
})

router.get('/findJudgeById/:id', function (req, res) {
  var id = req.params.id;
  var sql = $sql.findJudgeById(id);
  publicDao.Query(sql, function (err, data) {
    if (err) {
      return res.send(null, 401, 'error')
    }
    var dataStr = JSON.stringify(data);
    var data = JSON.parse(dataStr)
    // console.log(data);
    res.send({
      data: util.arrObj({}, data),
      meta: {
        status: 200,
        message: '获取题目信息成功'
      }
    })
  })
})

router.get('/findFillById/:id', function (req, res) {
  var id = req.params.id;
  var sql = $sql.findFillById(id);
  publicDao.Query(sql, function (err, data) {
    if (err) {
      return res.send(null, 401, 'error')
    }
    var dataStr = JSON.stringify(data);
    var data = JSON.parse(dataStr)
    // console.log(data);
    res.send({
      data: util.arrObj({}, data),
      meta: {
        status: 200,
        message: '获取题目信息成功'
      }
    })
  })
})

// 修改题目
router.post('/editMulti/:id', function (req, res) {
  var params = req.body;
  var questionId = req.params.id
  // console.log(params, questionId);
  var sql = $sql.editMulti(questionId, params);
  // console.log(sql)
  publicDao.Query(sql, function (err, data) {
    if (err) {
      return res.send({
        data: null,
        meta: {
          status: 401,
          message: '修改选择题信息失败'
        }
      })
    }
    console.log(data)
    res.send({
      data: util.arrObj({}, data),
      meta: {
        status: 200,
        message: '修改选择题信息成功'
      }
    })
  })
})

router.post('/editJudge/:id', function (req, res) {
  var params = req.body;
  var questionId = req.params.id
  // console.log(params, questionId);
  var sql = $sql.editJudge(questionId, params);
  // console.log(sql)
  publicDao.Query(sql, function (err, data) {
    if (err) {
      return res.send({
        data: null,
        meta: {
          status: 401,
          message: '修改判断题信息失败'
        }
      })
    }
    console.log(data)
    res.send({
      data: util.arrObj({}, data),
      meta: {
        status: 200,
        message: '修改判断题信息成功'
      }
    })
  })
})

router.post('/editFill/:id', function (req, res) {
  var params = req.body;
  var questionId = req.params.id
  // console.log(params, questionId);
  var sql = $sql.editFill(questionId, params);
  // console.log(sql)
  publicDao.Query(sql, function (err, data) {
    if (err) {
      return res.send({
        data: null,
        meta: {
          status: 401,
          message: '修改填空题信息失败'
        }
      })
    }
    console.log(data)
    res.send({
      data: util.arrObj({}, data),
      meta: {
        status: 200,
        message: '修改填空题信息成功'
      }
    })
  })
})

// 删除题目
router.delete('/deleteMulti/:id', function (req, res) {
  var id = req.params.id;
  var sql = $sql.deleteMulti(id);
  console.log(id, sql)
  publicDao.Query(sql, function (err, data) {
    if (err) {
      return res.send({
        data: null,
        meta: {
          status: 401,
          message: '删除选择题信息失败'
        }
      })
    }
    console.log(data)
    res.send({
      data: util.arrObj({}, data),
      meta: {
        status: 200,
        message: '删除选择题信息成功'
      }
    })
  })
})

router.delete('/deleteJudge/:id', function (req, res) {
  var id = req.params.id;
  var sql = $sql.deleteJudge(id);
  console.log(id, sql)
  publicDao.Query(sql, function (err, data) {
    if (err) {
      return res.send({
        data: null,
        meta: {
          status: 401,
          message: '删除判断题信息失败'
        }
      })
    }
    console.log(data)
    res.send({
      data: util.arrObj({}, data),
      meta: {
        status: 200,
        message: '删除判断题信息成功'
      }
    })
  })
})

router.delete('/deleteFill/:id', function (req, res) {
  var id = req.params.id;
  var sql = $sql.deleteFill(id);
  console.log(id, sql)
  publicDao.Query(sql, function (err, data) {
    if (err) {
      return res.send({
        data: null,
        meta: {
          status: 401,
          message: '删除填空题信息失败'
        }
      })
    }
    console.log(data)
    res.send({
      data: util.arrObj({}, data),
      meta: {
        status: 200,
        message: '删除填空题信息成功'
      }
    })
  })
})
module.exports = router
