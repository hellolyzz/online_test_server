module.exports = {
  // 获取所有学生信息
  getAllStu(){
    var sql = `select * from tb_student`;
    return sql;
  },
  getAllTea(){
    var sql = `select * from tb_teacher`;
    return sql;
  }
}