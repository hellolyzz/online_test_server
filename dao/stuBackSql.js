module.exports = {
  // 获取所有教师信息
  getAllTea(){
    var sql = `select * from tb_teacher`;
    return sql;
  },
  // 判断所添加学生的id是否存在
  isIdExsit(params){
    var sql = `select * from tb_student where id = '${params.id}'`;
    return sql;
  },
  // 添加学生
  addStu(params){
    var sql = `insert into tb_student 
    VALUES ('${params.id}', '${params.name}', '${params.gender}', '${params.institute}', '${params.grade}', '${params.major}', '${params.class}',
       '${params.tel}', '${params.email}', '${params.pwd}', '${params.role}')`;
    return sql;
  },
  // 获取所有学生信息
  getAllStu(queryInfo){
    var offset = queryInfo.pagesize * (queryInfo.pagenum - 1);
    // var sql = `SELECT * FROM tb_student limit ${offset},${queryInfo.pagesize}`;
    var sql = [`SELECT * FROM tb_student limit ${offset},${queryInfo.pagesize}` , `select count(*) as total from tb_student`] ;
    return sql;
  },
  // 查询单个学生信息
  getSingleInfo(id){
    var sql = `select * from tb_student where id = ${id}`
    return sql;
  },
  // 修改学生信息
  editStuInfo(params){
    var sql = `update tb_student set name = '${params.name}', major = '${params.major}', institute = '${params.institute}', grade = '${params.grade}', class = '${params.class}' , tel = '${params.tel}', email = '${params.email}' where id = ${params.id}`
    return sql;
  },
  // 删除学生信息
  deleteInfo(id){
    var sql = `delete from tb_student where id = ${id}`;
    return sql;
  }
}
// '${i}','${queryInfo.pagesize}'

// (id, name, gender, institute, grade, major, class, tel, email, pwd, role)