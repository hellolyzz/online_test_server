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

  // 获取选择题，填空题，判断题分别有多少个
  getNumberQ(paperId) {
    // 选择题
    var sql = [`select count(*) as total from tb_multichoice where questionId in 
    (select questionId from tb_papermanage where questionType = 1 and paperId = ${paperId} )`,
    // 判断题
    `select count(*) as total from tb_judgeques where questionId in 
    (select questionId from tb_papermanage where questionType = 2 and paperId = ${paperId} )`,
    // 填空题
    `select count(*) as total from tb_fillques where questionId in 
    (select questionId from tb_papermanage where questionType = 3 and paperId = ${paperId} )`];
    return sql;
  },

  // 增加选择题 1 = questionType
  // 1.加入题库
  // 2.加入试卷
  addMulti(params, paperId) {
    return sql = [`insert into tb_multichoice values (${params.questionId}, '${params.subject}', '${params.question}',
    '${params.optionA}', '${params.optionB}', '${params.optionC}', '${params.optionD}', '${params.answer}', '${params.analysis}',
    3, '${params.section}', '${params.level}')`,
    // 加入试卷
    `insert into tb_papermanage values (${paperId}, 1, ${params.questionId})`
    ]
  },

  // 增加判断题 questionType = 2
  addJudge(params, paperId) {
    return sql = [`insert into tb_judgeques values (${params.questionId}, '${params.subject}', '${params.question}',
     '${params.answer}', '${params.analysis}', 2, '${params.level}','${params.section}')`,
    // 加入试卷
    `insert into tb_papermanage values (${paperId}, 2, ${params.questionId})`
    ]
  },

  // 增加天空题 questionType = 3
  addFill(params, paperId) {
    return sql = [`insert into tb_fillques values (${params.questionId}, '${params.subject}', '${params.question}',
     '${params.answer}', '${params.analysis}', 2,  '${params.level}','${params.section}')`,
    // 加入试卷
    `insert into tb_papermanage values (${paperId}, 3, ${params.questionId})`
    ]
  },

  // 选择题 根据题号查找该题目
  findMultiById(id) {
    return sql = `select * from tb_multichoice where questionId = ${id}`;
  },

  findJudgeById(id) {
    return sql = `select * from tb_judgeques where questionId = ${id}`;
  },

  findFillById(id) {
    return sql = `select * from tb_fillques where questionId = ${id}`;
  },


  // 修改题目
  editMulti(qustionId, params) {
    return sql = `update tb_multichoice set question = '${params.question}', optionA = '${params.optionA}', 
    optionB = '${params.optionB}', optionC = '${params.optionC}', optionD = '${params.optionD}', answer = '${params.answer}',
    analysis = '${params.analysis}', section = '${params.section}', level = '${params.level}' where questionId = ${qustionId}`;
  },

  editJudge(qustionId, params) {
    return sql = `update tb_judgeques set question = '${params.question}', answer = '${params.answer}',
    analysis = '${params.analysis}', section = '${params.section}', level = '${params.level}' where questionId = ${qustionId}`;
  },

  editFill(qustionId, params) {
    return sql = `update tb_fillques set question = '${params.question}', answer = '${params.answer}',
    analysis = '${params.analysis}', section = '${params.section}', level = '${params.level}' where questionId = ${qustionId}`;
  },

  // 删除题目
  deleteMulti(id){
    return sql = `delete from tb_multichoice where questionId = ${id}`;
  },

  deleteJudge(id){
    return sql = `delete from tb_judgeques where questionId = ${id}`;
  },

  deleteFill(id){
    return sql = `delete from tb_fillques where questionId = ${id}`;
  },

  // 添加题目时候 判断 题号questionId是否存在
  isQuestionIdExsit(params){
    var sql = `select * from tb_papermanage where questionId = '${params.questionId}'`;
    return sql;
  },
}