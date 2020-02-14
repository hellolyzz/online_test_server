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
  // 执行多个sql语句之返回一个结果
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
  },
  // threeQuery(sqls, params, callback){
  //   pool.getConnection(function(err, connection){
  //     if(err) throw err;

  //   })
  // }
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
