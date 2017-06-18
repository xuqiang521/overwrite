const _ = exports

_.setAttr = function setAttr (node, key, value) {
  switch (key) {
    case 'style':
      node.style.cssText = value
      break;
    case 'value':
      let tagName = node.tagName || ''
      tagName = tagName.toLowerCase()
      if (
        tagName === 'input' || tagName === 'textarea'
      ) {
        node.value = value
      } else {
        // if is not a input or textarea, use `setAttribute` to set
        node.setAttribute(key, value)
      }
      break;
    default:
      node.setAttribute(key, value)
      break;
  }
}

_.slice = function slice (arrayLike, index) {
  return Array.prototype.slice.call(arrayLike, index)
}

_.truthy = function truthy (val) {
  return !!val
}

_.type = function type (obj) {
  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
}

_.isArray = function isArray (list) {
  return _.type(list) === 'Array'
}

_.toArray = function toArray (listLike) {
  if (!listLike) return []

  let list = []
  for (let i = 0, l = listLike.length; i < l; i++) {
    list.push(listLike[i])
  }
  return list
}

_.isString = function isString (list) {
  return _.type(list) === 'String'
}

_.isElementNode = function isElementNode (node) {
  return node.nodeType === 1
}
