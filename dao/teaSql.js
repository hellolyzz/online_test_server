module.exports = {
  // 获取所有教师信息
  getAllTea(queryInfo){
    var offset = queryInfo.pagesize * (queryInfo.pagenum - 1);
    var sql = [`SELECT * FROM tb_teacher limit ${offset},${queryInfo.pagesize}` , `select count(*) as total from tb_teacher`] ;
    return sql;
  },
  // 判断所添加教师的id是否存在
  isIdExsit(params){
    var sql = `select * from tb_teacher where id = '${params.id}'`;
    return sql;
  },
  // 添加教师
  addTea(params){
    var sql = `insert into tb_teacher 
    VALUES ('${params.id}', '${params.name}', '${params.gender}', '${params.institute}', 
       '${params.tel}', '${params.email}', '${params.pwd}', '${params.role}')`;
    return sql;
  },
  // 查询单个教师信息
  getSingleInfo(id){
    var sql = `select * from tb_teacher where id = ${id}`
    return sql;
  },
  // 修改教师信息
  editTeaInfo(params){
    var sql = `update tb_teacher set name = '${params.name}', institute = '${params.institute}',  tel = '${params.tel}', email = '${params.email}' where id = ${params.id}`
    return sql;
  },
  // 删除教师信息
  deleteInfo(id){
    var sql = `delete from tb_teacher where id = ${id}`;
    return sql;
  }
}