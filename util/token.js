// token加密
var jwt = require('jsonwebtoken')

module.exports = {
  //jsonwebtoken加密token
  encodeJwt() {
    let content = { msg: "this is info" }; // 要生成token的主题信息
    let secretOrPrivateKey = "mykey";// 这是加密的key（密钥） 
    let token = jwt.sign(content, secretOrPrivateKey, {
      expiresIn: 60 * 60  // 24小时过期 60*60*24,可以设置为10秒来测试JWT是否生效
    });
    // console.log("token ：" +token );
    return token;
  },
  
}
