Object.assign = function (target) {
  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert null or undefined to object')
  }
  target = Object(target)

  var index = 1
    , args  = arguments
    , len   = args.length
  for (; index < len; index++) {
    var source = args[index]

    if (source !== null) {
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
  }

  return target
}
