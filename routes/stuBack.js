// 人员管理接口

var express = require('express')
var router = express.Router()
var publicDao = require('../dao/publicDao')
var util = require('../util/util')
var $sql = require('../dao/stuBackSql')


// 管理员获取所有学生信息
router.get('/stuInfo/:inistitute',
  function (req, res) {
    var queryInfo = req.query;
    var inistitute = req.params.inistitute;
    console.log(queryInfo, inistitute)
    // 管理员
    if (inistitute === 'undefined') {
      var sqls = $sql.getAllStu(queryInfo)
      // console.log(sqls)
      publicDao.multiQuery(sqls, err => {
        res.send({
          data: null,
          meta: {
            message: '获取失败',
            status: 401
          }
        })
      }, data => {
        var dataStr = JSON.stringify(data);
        var data = JSON.parse(dataStr);
        // console.log(data);
        res.send({
          data: {
            data: data[0],
            total: util.arrObj({}, data[1]).total,
            pagesize: parseInt(queryInfo.pagesize),
            pagenum: parseInt(queryInfo.pagenum),
          },
          meta: {
            status: 200,
            message: 'success'
          }
        })
      })
    } else{
      var sqls = $sql.getAllStuByTea(queryInfo, inistitute)
      // console.log(sqls)
      publicDao.multiQuery(sqls, err => {
        res.send({
          data: null,
          meta: {
            message: '获取失败',
            status: 401
          }
        })
      }, data => {
        var dataStr = JSON.stringify(data);
        var data = JSON.parse(dataStr);
        // console.log(data);
        res.send({
          data: {
            data: data[0],
            total: util.arrObj({}, data[1]).total,
            pagesize: parseInt(queryInfo.pagesize),
            pagenum: parseInt(queryInfo.pagenum),
          },
          meta: {
            status: 200,
            message: 'success'
          }
        })
      })
    }

  })

// 教师获取所有学生信息
// router.get('/stuInfoByTea/:institute',
//   function (req, res) {
//     var institute = req.params.institute
//     var queryInfo = req.query;
//     console.log(queryInfo,institute)
//     var sqls = $sql.getAllStuByTea(queryInfo,institute)
//     // console.log(sqls)
//     publicDao.multiQuery(sqls, err => {
//       res.send({
//         data: null,
//         meta: {
//           message: '获取失败',
//           status: 401
//         }
//       })
//     }, data => {
//       var dataStr = JSON.stringify(data);
//       var data = JSON.parse(dataStr);
//       // console.log(data);
//       res.send({
//         data: {
//           data: data[0],
//           total: util.arrObj({}, data[1]).total,
//           pagesize: parseInt(queryInfo.pagesize),
//           pagenum: parseInt(queryInfo.pagenum),
//         },
//         meta: {
//           status: 200,
//           message: 'success'
//         }
//       })
//     })
//   })

// 获取单个学生信息
router.get('/getSingleInfo/:id', function (req, res) {
  var id = req.params.id;
  // console.log(id)
  var sql = $sql.getSingleInfo(id);
  publicDao.Query(sql, function (err, data) {
    if (err) {
      return res.send({
        data: null,
        meta: {
          status: 401,
          message: '获取学生信息失败'
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
        message: '获取学生信息成功'
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
          message: '修改学生信息失败'
        }
      })
    }
    console.log(data)
    res.send({
      data: util.arrObj({}, data),
      meta: {
        status: 200,
        message: '修改学生信息成功'
      }
    })
  })
})



// 增加学生信息
router.post('/addStu', function (req, res) {
  var params = req.body;
  params = Object.assign(params, { pwd: '123456' }, { role: '2' })
  console.log('stuInfo:',params)
  var sql = $sql.addStu(params);
  var sql2 = $sql.isIdExsit(params);
  publicDao.Query(sql2, function (err, data) {
    // 使得 得到的数组没有RowDataPacket这个前面的东西
    var dataStr = JSON.stringify(data);
    var data = JSON.parse(dataStr);
    console.log(data, typeof data);
    // 不存在该id 直接插入数据表
    if (!data.length) {
      publicDao.Query(sql, function (err, data) {
        if (err) {
          return res.send({
            data: null,
            meta: {
              status: 400,
              message: '增加学生信息失败'
            }
          })
        }
        res.send({
          data: data,
          meta: {
            status: 200,
            message: '增加学生信息成功'
          }
        })
      })
    } else {
      // 存在id
      res.send({
        data: null,
        meta: {
          status: 401,
          message: '您所添加的学号已经存在，请仔细核对之后再添加！'
        }
      })
    }
    if (err) {
      res.send({
        data: null,
        meta: {
          status: 402,
          message: '添加失败'
        }
      })
    }
  })
})

// 删除学生生信息
router.delete('/deleteInfo/:id', function (req, res) {
  var id = req.params.id;
  var sql = $sql.deleteInfo(id)
  publicDao.Query(sql, function (err, data) {
    if (err) {
      return res.send({
        data: null,
        meta: {
          status: 401,
          message: '删除学生失败'
        }
      })
    }
    res.send({
      data: data,
      meta: {
        status: 200,
        message: '删除该学生成功'
      }
    })
  })
})


module.exports = router