module.exports = {
  // 查询已有考试的 
  getAllSubject(queryInfo){
    var offset = queryInfo.pagesize * (queryInfo.pagenum - 1);
    var sql = [`SELECT * FROM tb_testmanage limit ${offset},${queryInfo.pagesize}` , `select count(*) as total from tb_testmanage`] ;
    return sql;
  },
  getAllSubjectByTea(queryInfo,institute){
    var offset = queryInfo.pagesize * (queryInfo.pagenum - 1);
    var sql = [`SELECT * FROM tb_testmanage where institute = '${institute}' limit ${offset},${queryInfo.pagesize}` , `select count(*) as total from tb_testmanage where institute = '${institute}'`] ;
    return sql;
  },
  // 查询是否有该科目的成绩存在
  isScore(testCode){
    return sql = `select * from tb_score where testCode = ${testCode}`;
  },
  // 根据 testCode 查询该门考试所有学生的成绩
  getAllScore(testCode){
    return sql = [`select * from tb_score where testCode = ${testCode}`,
    `select * from tb_student where id in (select studentId from tb_score where testCode = ${testCode})`  
  ]
  },
  // 根据id查询成绩
  getScoreById(id){
    return sql = `select * from tb_score where studentId = ${id}`
  }
}