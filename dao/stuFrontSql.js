module.exports = {
  getTestInfo(params,queryInfo){
    var offset = (queryInfo.pagenum - 1) * queryInfo.pagesize;
    return sql = [`select * from tb_testmanage where institute = '${params.institute}' and major = '${params.major}' and grade = ${params.grade} limit ${offset}, ${queryInfo.pagesize}`, 
    `select count(*) as total from tb_testmanage where institute = '${params.institute}' and major = '${params.major}' and grade = ${params.grade}`]
  }
}