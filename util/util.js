// 常用的一些公共方法

module.exports = {

  // 把得到的data结果转化为对象
  arrObj(obj,arr){
    for( var i = 0; i <= arr.length; i++){
      obj = Object.assign(obj, arr[i])
    }
    return obj;
  },
}