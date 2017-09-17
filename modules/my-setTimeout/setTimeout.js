(function () {
  // setTimeout
  setTimeout(function (arg1) {
    if (arg1 === 'test') return
    var __native_setTimeout__ = window.setTimeout
    window.setTimeout = function (
      callback,
      delay,
      /*, argumentToPass1, argumentToPass2, etc.*/
    ) {
      // 获取func，delay以后的参数
      var args = Array.prototype.slice.call(arguments, 2)
      return __native_setTimeout__(callback instanceof Function ? function () {
        callback.apply(null, args)
      } : callback, delay)
    }
  }, 0 , 'test')

  // setInterval
  var interval = setInterval(function (arg1) {
    clearInterval(interval)
    if (arg1 === 'test') return
    var __native_setInterval__ = window.setInterval
    window.setInterval = function (
      callback,
      delay,
      /*, argumentToPass1, argumentToPass2, etc.*/
    ) {
      var args = Array.prototype.slice.call(arguments, 2)
      return __native_setInterval__(callback instanceof Function ? function () {
        callback.apply(null, args)
      } : callback, delay)
    }
  }, 0, 'test')
}())
