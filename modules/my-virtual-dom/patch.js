import _ from './utils'

const REPLACE = 0
const REORDER = 1
const PROPS = 2
const TEXT = 3

function patch (node, patches) {
  let walker = {index: 0}
  dfsWalk(node, walker, patches)
}

function dfsWalk (node, walker, patches) {
  let currentPatches = patches[walker.index]

  let len = node.childNodes
    ? node.childNodes.length
    : 0
  for (let i = 0; i < len; i++) {
    let child = node.childNodes[i]
    walker.index++
    dfsWalk(child, walker, patches)
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
      case PROPS:
        setProps(node, currentPatch.props)
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

function setProps (node, props) {
  for (let key in props) {
    if (props[key] === void 666) {
      node.removeAttribute(key)
    } else {
      let value = props[key]
      _.setAttr(node, key, value)
    }
  }
}

patch.REPLACE = REPLACE
patch.REORDER = REORDER
patch.PROPS = PROPS
patch.TEXT = TEXT

module.exports = patch