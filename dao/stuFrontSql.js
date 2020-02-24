module.exports = {
  // 获取学生试卷
  getTestInfo(params,queryInfo){
    var offset = (queryInfo.pagenum - 1) * queryInfo.pagesize;
    return sql = [`select * from tb_testmanage where institute = '${params.institute}' and major = '${params.major}' and grade = ${params.grade} limit ${offset}, ${queryInfo.pagesize}`, 
    `select count(*) as total from tb_testmanage where institute = '${params.institute}' and major = '${params.major}' and grade = ${params.grade}`]
  },
   // 查询单个学生信息
   getInfoById(id){
    var sql = `select * from tb_student where id = ${id}`
    return sql;
  },
  // 修改学生信息
  editStuInfo(params){
    return sql = `update tb_student set tel = '${params.tel}', email = '${params.email}' , pwd = '${params.pwd}' where id = ${params.id}`
  }
}