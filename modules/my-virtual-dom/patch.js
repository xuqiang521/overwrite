import _ from './utils'

const REPLACE = 0
const ATTRS   = 1
const TEXT    = 2
const REORDER = 3

function patch (node, patches) {
  let walker = {index: 0}
  walk(node, walker, patches)
}

function walk (node, walker, patches) {
  let currentPatches = patches[walker.index]

  let len = node.childNodes
    ? node.childNodes.length
    : 0
  for (let i = 0; i < len; i++) {
    let child = node.childNodes[i]
    walker.index++
    walk(child, walker, patches)
  }

  if (currentPatches) {
    applyPatches(node, currentPatches)
  }
}

function applyPatches (node, currentPatches) {
  currentPatches.forEach(currentPatch => {
    switch (currentPatch.type) {
      case REPLACE:
        let newNode = (typeof currentPatch.node === 'string')
          ? document.createTextNode(currentPatch.node)
          : currentPatch.node.render()
        node.parentNode.replaceChild(newNode, node)
        break
      case REORDER:
        reorderChildren(node, currentPatch.moves)
        break
      case ATTRS:
        setAttrs(node, currentPatch.attrs)
        break
      case TEXT:
        if (node.textContent) {
          node.textContent = currentPatch.content
        } else {
          // for ie
          node.nodeValue = currentPatch.content
        }
        break
      default:
        throw new Error('Unknown patch type ' + currentPatch.type)
    }
  })
}

function setAttrs (node, attrs) {
  for (let key in attrs) {
    if (attrs[key] === void 666) {
      node.removeAttribute(key)
    } else {
      let value = attrs[key]
      _.setAttr(node, key, value)
    }
  }
}

function reorderChildren (node, moves) {
  let staticNodeList = _.toArray(node.childNodes)
  let maps = {}

  staticNodeList.forEach(node => {
    if (_.isElementNode(node)) {
      let key = node.getAttribute('key')
      if (key) {
        maps[key] = node
      }
    }
  })

  moves.forEach(move => {
    let index = move.index
    if (move.type === 0) { // remove item
      if (staticNodeList[index] === node.childNodes[index]) { // maybe have been removed for inserting
        node.removeChild(node.childNodes[index])
      }
      staticNodeList.splice(index, 1)
    } else if (move.type === 1) { // insert item
      let insertNode = maps[move.item.key]
        ? maps[move.item.key] // reuse old item
        : (typeof move.item === 'object')
            ? move.item.render()
            : document.createTextNode(move.item)
      staticNodeList.splice(index, 0, insertNode)
      node.insertBefore(insertNode, node.childNodes[index] || null)
    }
  })
}

patch.REPLACE = REPLACE
patch.ATTRS   = ATTRS
patch.TEXT    = TEXT
patch.REORDER = REORDER

module.exports = patch
