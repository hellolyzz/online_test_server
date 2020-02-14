module.exports = {
  addPaper(params){
    return sql = `insert into tb_testmanage set testCode = ${params.testCode}, description = ${params.description},
    courseName = '${params.courseName}', paperId = ${params.paperId}, testDate = ${params.testCode}, totalTime = '${params.totalTime}',
    term = ${params.term}, institute = '${params.institute}', major = '${params.major}', grade = ${params.grade}, 
    totalScore = 100, type = ${params.type}, tips = '${params.tips}'`;
  }
}