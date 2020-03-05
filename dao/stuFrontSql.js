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
  },
  // 根据testCode获取试卷
  getpaperInfo(testCode){
    return sql = `select * from tb_testmanage where testCode = ${testCode}`
  },
  // 根据某学生的 testCode id 
  // 判断是否做过该试卷 
  IsScore(id, testCode){
    return sql = `select score from tb_score where studentId = ${id} and testCode = ${testCode}`
  },
  // 获取某试卷的全部题目
  getQuesByPaperCode(testCode){
    // var paperId = `select paperId from tb_testmanage where testCode = ${testCode} `;
    return sql = 
    [
      // 选择题
      `select * from tb_multichoice where questionId in 
    (select questionId from tb_papermanage where questionType = 1 and 
      paperId in ( select paperId from tb_testmanage where testCode = ${testCode} ))`,
      // 判断题
      `select * from tb_judgeques where questionId in 
      (select questionId from tb_papermanage where questionType = 2 and 
        paperId in ( select paperId from tb_testmanage where testCode = ${testCode} ))`,
    //   // 填空题
      `select * from tb_fillques where questionId in 
    (select questionId from tb_papermanage where questionType = 3 and 
      paperId in ( select paperId from tb_testmanage where testCode = ${testCode} ))`,
    ]
    // `select * from tb_papermanage where paperId 
  },
  // 上传成绩
  postScore(params){
    return sql = `insert into tb_score set testCode = ${params.testCode}, scoreId = null, subject = '${params.subject}',
    studentId = ${params.studentId}, score = ${params.score}, answerTime = '${params.answerTime}' `
  },
  // 根据学生id查询成绩
  getScore(id){
    return sql = `select * from tb_score where studentId = ${id}`
  },
  
}