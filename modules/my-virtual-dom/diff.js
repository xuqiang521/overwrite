import _ from './utils'
import patch from './patch.js'
import listDiff from './list-diff';

function diff (oldTree, newTree) {
  let index = 0;
  let patches = {} // 用来记录每个节点差异的对象
  walk(oldTree, newTree, index, patches)
  return patches;
}

function walk (oldNode, newNode, index, patches) {
  // console.log(index)
  let currentPatch = []

  if(newNode === null) {

  }
  else if (_.isString(oldNode) && _.isString(newNode)) {
    if (newNode !== oldNode) {
      currentPatch.push({ type: patch.TEXT, content: newNode })
    }
  }
  else if (
    oldNode.tagName === newNode.tagName &&
    oldNode.key === newNode.key
  ) {
    // diff attrs
    let attrsPatches = diffAttrs(oldNode, newNode)
    if (attrsPatches) {
      currentPatch.push({ type: patch.ATTRS, attrs: attrsPatches })
    }
    diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);
  }
  else {
    currentPatch.push({ type: patch.REPLACE, node: newNode })
  }

  if (currentPatch.length) {
    patches[index] = currentPatch
  }
}
let key_id = 0
function diffChildren (oldChildren, newChildren, index, patches, currentPatch) {
  let diffs = listDiff(oldChildren, newChildren, 'key')
  newChildren = diffs.children

  if (diffs.moves.length) {
    var reorderPatch = { type: patch.REORDER, moves: diffs.moves }
    currentPatch.push(reorderPatch)
  }

  let leftNode = null;
  let currentNodeIndex = index;
  oldChildren.forEach( (child, i) => {
    key_id++
    currentNodeIndex = key_id
    let newChild = newChildren[i];
    // currentNodeIndex = (leftNode && leftNode.count)
    //   ? currentNodeIndex + leftNode.count + 1
    //   : currentNodeIndex + 1

    walk(child, newChild, currentNodeIndex, patches)
    // leftNode = child

    // console.log(currentNodeIndex);
  })
}

function diffAttrs (oldNode, newNode) {
  let count = 0
  let oldAttrs = oldNode.attrs
  let newAttrs = newNode.attrs

  let key, value
  let attrsPatches = {}

  // find out different attrs
  for (key in oldAttrs) {
    value = oldAttrs[key]
    // debugger
    if (newAttrs[key] !== value) {
      count++
      attrsPatches[key] = newAttrs[key]
    }
  }
  // find out new attr
  for (key in newAttrs) {
    value = newAttrs[key]
    if (!oldAttrs.hasOwnProperty(key)) {
      count++
      attrsPatches[key] = newAttrs[key]
    }
  }

  if (count === 0) {
    return null
  }
  return attrsPatches
}

module.exports = diff
