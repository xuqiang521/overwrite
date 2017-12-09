// 硬绑定
Function.prototype.myBind = function (oThis) {
  if (typeof this !== 'function') {
    // 与 ECMAScript 5 最接近的
    // 内部 IsCallable 函数
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
  }

  var aArgs   = Array.prototype.slice.call(arguments, 1)
    , fToBind = this
    , fNOOP   = function () {}
    , fBound  = function () {
        // 硬绑定函数是否被new 调用，如果有则使用新创建的this替换硬绑定的this
      return fToBind.apply(
        this instanceof fNOOP ? 
          this : oThis,
            // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
          aArgs.concat(Array.prototype.slice.call(arguments)));
    }

  // 维护原型关系
  if (this.prototype) {
    // Function.prototype doesn't have a prototype property
    fNOOP.prototype = this.prototype
  }
  fBound.prototype = new fNOOP()

  return fBound;
};

// 软绑定
Function.prototype.softBind = function (oThis) {
  // 捕获所有的arguments参数
  var aArgs     = Array.prototype.slice.call(arguments, 1)
    , fSoftBind = this
    , fBound    = function () {
      // 如果this绑定到全局对象或者undefined上，那就把指定的默认对象绑定到this，否则不修改this
      return fSoftBind.apply(
        (!this || this === (window || global)) ?
          oThis : this,
          aArgs.concat.apply(aArgs, Array.prototype.slice.call(arguments))
      )
    }
  fBound.prototype = Object.create(fSoftBind.prototype)
  return fBound
}