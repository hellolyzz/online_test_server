// var mysql = require('mysql')

module.exports = {
  mysql: {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'db_onlinetest',
    port : 3306,
    connectionLimit : 50,//允许连接数
    multipleStatements : true,  //是否允许执行多条sql语句
    timezone : "08:00" //大坑，必须加这一句，否则时间不对劲
  }
}

