var mysql = require('mysql')
var poolextend = require('../conf/poolextends')
var config = require('../conf/db')
require('mysql-queries').init(config.mysql);
var sqlClient = require('mysql-queries')

//  创建连接池，效率更高，不需要每次操作数据库都创建连接
var pool = mysql.createPool(poolextend({}, config.mysql))

module.exports = {
  // 封装数据库sql请求操作，返回的是一个包含对象的数组
  // params 是sql语句的参数 即替代 ? ? 的地方，是个数组
  Query(sql, params, callback) {
    pool.getConnection(function (err, connection) {
      if (err) throw err
      connection.query(sql, params, function (err, results, fields) {
        connection.release()
        if (err) throw err
        callback && callback(results, fields)
      })
    })
  },
  multiQuery(sqls, params,callback) {
    pool.getConnection(function(err, connection){
      if(err) throw err;
      sqlClient.queries(sqls,params,function(err,results){
        // resluts 是装有两个sql语句结果的数组
        connection.release()
        if(err) console.log(err)
        callback && callback(results)
      })
    })
    // pool.getConnection(function (err, connection) {
    //   if (err) throw err
    //   // 1
    //   connection.query(sqls[0], function (err0, results0, fields0) {
    //     if (err0) console.log(err0)
    //     // 2
    //     connection.query(sqls[1], function (err1, results1, fields1) {
    //       connection.release()
    //       if (err1) console.log(err1)
    //       callback && callback(results1, fields1)
    //     })
    //     callback && callback(results0, fields0)
    //   })
    // })
    // var arr =[];
    // pool.getConnection(err => {
    //   throw err
    // },connection => {
    //   connection.query(sqls[0], err0 => {
    //     throw err0
    //   },res0 => {
    //     arr.push(res0)
    //     connection.query(sqls[1], err1 => {
    //       throw err1
    //     },res1 => {
    //       connection.release()
    //       arr.push(res1)
    //       return arr;
    //     })
    //   })
    // })
    // pool.getConnection(function (err, connection) {
    //   if (err) throw err
    //   connection.query(sqls, params, function (err, results, fields) {
    //   //   connection.release()
    //   //   if (err) throw err
    //   //   callback && callback(results, fields)
    //   // })
    //  console.log(results[0],results[1]);
    // })
    // })

  }
}
//     pool.getConnection(function (err, connection) {
//       if (err) throw err
//       connection.query(sqls, function (err, results, fields) {
//         connection.release()
//         if (err) throw err
//         callback && callback(results, fields)
//       })
//     }
  // let Query=(sql, ...params) => {
  //   return new Promise(function (resolve, reject) {
  //     //从连接池中拿一条链接
  //     pool.getConnection(function (err, connection) {
  //       if (err) {
  //         return reject(err);
  //       }
  //       connection.query(sql, params, function (error, res) {
  //         // console.log(res);
  //         connection.release();
  //         if (error) {
  //           return reject(error);
  //         }
  //         resolve(res);
  //       });
  //     });
  //   });
  // }
