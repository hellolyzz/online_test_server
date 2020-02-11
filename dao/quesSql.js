module.exports = {
  // 获取所有考试场次信息
  getTestInfo(params) {
    var offset = params.pagesize * (params.pagenum - 1);
    var sql = [`select * from tb_testmanage limit ${offset}, ${params.pagesize}`, `select count(*) as total from tb_testmanage`];
    return sql;
    // var sql = `select * from tb_multichoice where questionId in 
    // (select questionId from tb_papermanage where questionType = 1 and paperId = '${paperId}' ) `;
    // // select * from fill_question where questionId in (select questionId from paper_manage where questionType = 2 and paperId = #{paperId})")
    // return sql;
  },

  // 获取多选题
  getMultichoice(paperId, params) {
    var offset = params.pagesize * (params.pagenum - 1);
    var sql = [`select * from tb_multichoice where questionId in 
    (select questionId from tb_papermanage where questionType = 1 and paperId = ${paperId} ) limit ${offset}, ${params.pagesize}`, 
    `select count(*) as total from tb_multichoice where questionId in 
    (select questionId from tb_papermanage where questionType = 1 and paperId = ${paperId} )`];
    return sql;
  },

  // 获取判断题
  getJudgeQues(paperId, params) {
    var offset = params.pagesize * (params.pagenum - 1);
    var sql = [`select * from tb_judgeques where questionId in 
    (select questionId from tb_papermanage where questionType = 2 and paperId = '${paperId}' ) limit ${offset}, ${params.pagesize} `,
    `select count(*) as total from tb_judgeques where questionId in 
    (select questionId from tb_papermanage where questionType = 2 and paperId = ${paperId} )`];
    return sql;
  },

  // 获取填空题
  getFillQues(paperId, params) {
    var offset = params.pagesize * (params.pagenum - 1);
    var sql = [`select * from tb_fillques where questionId in 
    (select questionId from tb_papermanage where questionType = 3 and paperId = '${paperId}' ) limit ${offset}, ${params.pagesize} `,
    `select count(*) as total from tb_fillques where questionId in 
    (select questionId from tb_papermanage where questionType = 3 and paperId = ${paperId} )`];
    return sql;
  },


}