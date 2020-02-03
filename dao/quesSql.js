module.exports = {
  // 获取所有题库
  allQues(){
    var sql = `select * from tb_fillques 
    union  select * from tb_multichoice `;
    return sql;
  },

  // 获取多选题
  multichoice(){
    var sql = `select * from tb_multichoice`;
    return sql;
  },

  // 获取填空题
  fillQues(){
    var sql = `select * from tb_fillques`;
    return sql;
  },

  // 获取判断题
  judgeQues(){
    var sql = `select * from tb_judgeques`;
    return sql;
  },
}
// select * from tb_fillques UNION
// select * from tb_multichoice UNION