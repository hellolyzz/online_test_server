module.exports = {
  // 增加试卷
  addPaper(params){
    return sql = `insert into tb_testmanage set testCode = ${params.testCode}, description = '${params.description}',
    courseName = '${params.courseName}', paperId = ${params.paperId}, testDate = '${params.testDate[0]}', 
    testDate2 = '${params.testDate[1]}', totalTime = ${params.totalTime},
    term = ${params.term}, institute = '${params.institute}', major = '${params.major}', grade = ${params.grade}, 
    totalScore = 100, type = ${params.type}, tips = '${params.tips}'`;
  },
  // 判断所添加考试的考试编号testCode是否存在
  isTeseCodeExsit(params){
    var sql = `select * from tb_testmanage where testCode = '${params.testCode}'`;
    return sql;
  },
  // 根据testCode查询 考试
  getTestInfoById(testCode){
    // return sql = `select * from tb_testmanage where testCode = ${testCode}`
    // var offset = params.pagesize * (params.pagenum - 1);
    return sql = [`select * from tb_testmanage where testCode = ${testCode}`, `select count(*) as total from tb_testmanage where testCode = ${testCode}`];
  }
}