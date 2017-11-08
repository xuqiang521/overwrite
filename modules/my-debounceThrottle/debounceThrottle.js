/**
 * [debounce 函数防抖]
 * @param  {Function}  fn        [需要进行函数防抖的函数]
 * @param  {Number}    wait      [需要等待的时间]
 * @param  {Boolean}   immediate [调用时是否立即执行一次]
 */
function debounce (fn, wait, immediate) {
  let timeout = null

  return function () {
    if (immediate) {
      fn.apply(this, arguments)
      immediate = false
    } else {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        fn.apply(this, arguments)
      }, wait)
    }
  }

}

/**
 * [throttle 函数节流]
 * @param  {Function} fn      [需要进行函数节流的函数]
 * @param  {Number}   wait    [函数执行的时间间隔]
 * @param  {Object}   options [执行参数] 
 */
// options = {
//   leading: true  // 第一次调用事件是否立即执行
//   trailing: true // 最后一次延迟调用是否执行 
// }
function throttle (fn, wait, options) {
  let timeout, context, args, result
  let previous = 0
  if (!options) options = {}

  let later = function () {
    previous = options.leading === false ? 0 : +new Date()
    timeout = null
    result = fn.apply(context, args)
    if (!timeout)  context = args = null
  }

  let throttled = function () {
    let now = +new Date()
    if (!previous && options.leading === false) previous = now
    let remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = fn.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }

  return throttled
}

// 简易版本（两个参数）
function _throttle (fn, wait) {
  let canRun = true
  return function () {
    if (!canRun) return
    canRun = false
    setTimeout(() => {
      fn.apply(this, arguments)
      canRun = true
    }, wait)
  }
}





