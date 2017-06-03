/**
 * [clone 深度对象克隆]
 * @param  {[type]} Obj [参数对象]
 */
function clone(Obj) {
  // 定义buf进行缓存
  var buf; // 创建一个空数组
  // if Array
  if (Obj instanceof Array) {
    // dosomething for Array Obj
    buf = [];
    var i = Obj.length
    while (i--) {
      buf[i] = clone(Obj[i]);
    }
    return buf;
  }
  // if Object and Obj is not a function
  if (Obj instanceof Object && typeof Obj !== 'function') {
    // dosomething for Object Obj
    buf = {}; // 创建一个空对象
    for (var key in Obj) {
      buf[key] = clone(Obj[key]);
    }
    return buf
  }
  // else
  else {
    // dosomething for other
    return Obj;
  }
}
