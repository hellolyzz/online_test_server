var express = require('express')
var router = express.Router()
var publicDao = require('../dao/publicDao')
var $sql = require('../dao/teaSql')
var util = require('../util/util')
var $sql = require('../dao/teaSql')

// 获取教师信息
router.get('/teaInfo',
  function (req, res) {
    var queryInfo = req.query;
    // console.log(queryInfo)
    var sqls = $sql.getAllTea(queryInfo)
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
  })

  // 增加教师信息
  router.post('/addTea', function (req, res) {
    var params = req.body;
    params = Object.assign(params, { pwd: '123456' }, { role: '1' })
    console.log(params)
    var sql = $sql.addTea(params);
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
                message: '增加教师信息失败'
              }
            })
          }
          res.send({
            data: data,
            meta: {
              status: 200,
              message: '增加教师信息成功'
            }
          })
        })
      } else {
        // 存在id
        res.send({
          data: null,
          meta: {
            status: 401,
            message: '此工号已存在'
          }
        })
      }
      if (err) {
        res.send({
          data: null,
          meta: {
            status: 401,
            message: '添加失败'
          }
        })
      }
    })
  })
  // 获取单个教师信息
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
            message: '获取教师信息失败'
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
          message: '获取教师信息成功'
        }
      })
    })
  })

  // 修改教师信息
  router.put('/editTea', function (req, res) {
    var params = req.body.params;
    // console.log(params)
    var sql = $sql.editTeaInfo(params);
    // console.log(sql)
    publicDao.Query(sql, function (err, data) {
      if (err) {
        return res.send({
          data: null,
          meta: {
            status: 401,
            message: '修改教师信息失败'
          }
        })
      }
      console.log(data)
      res.send({
        data: util.arrObj({}, data),
        meta: {
          status: 200,
          message: '修改教师信息成功'
        }
      })
    })
  })

  router.delete('/deleteInfo/:id', function (req, res) {
    var id = req.params.id;
    var sql = $sql.deleteInfo(id)
    publicDao.Query(sql, function (err, data) {
      if (err) {
        return res.send({
          data: null,
          meta: {
            status: 401,
            message: '删除教师失败'
          }
        })
      }
      res.send({
        data: data,
        meta: {
          status: 200,
          message: '删除该教师成功'
        }
      })
    })
  })
  module.exports = router