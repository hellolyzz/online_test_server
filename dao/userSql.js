// 用户信息相关sql语句

module.exports = {
  // insert: 'INSERT INTO tb_admin(adminId, adminName, tel) VALUES(0,rose,1245)',
  // update: 'update tb_admin set adminName=?, adminId=? where id=?',
  // delete: 'delete from tb_admin where adminId=?',

  // 登录验证
  loginSql(id, pwd) {
    var sql = `select * from tb_admin where id = '${id}' and pwd = '${pwd}' `;
    return sql
  },
  // 学生
  loginSqlS(id, pwd) {
    var sql = `select * from tb_student where id = '${id}' and pwd = '${pwd}'`;
    return sql
  }, 
  // 教师
  loginSqlT(id, pwd) {
    var sql = `select * from tb_teacher where id = '${id}' and pwd = '${pwd}'`;
    return sql
  },

  // 管理员获取个人信息 by id
  getInfo(id){
    var sql = `select * from tb_admin where id = '${id}'`;
    return sql
  },
  // 教师
  getInfoT(id){
    var sql = `select * from tb_teacher where id = '${id}' `
    return sql
  },
  // 更改信息
  updateInfo(id, params){
    var sql = `update tb_admin set name = '${params.name}', 
    tel = '${params.tel}', email = '${params.email}' where id = '${id}'`;
    return sql
  }

};