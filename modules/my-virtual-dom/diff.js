import _ from './utils'
import patch from './patch.js'
import listDiff from './list-diff';

function diff (oldTree, newTree) {
  let index = 0;
  let patches = {} // 用来记录每个节点差异的对象
  dfsWalk(oldTree, newTree, index, patches)
  return patches;
}

function dfsWalk (oldNode, newNode, index, patches) {
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
    // diff props
    let propsPatches = diffProps(oldNode, newNode)
    if (propsPatches) {
      currentPatch.push({ type: patch.PROPS, props: propsPatches })
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
    let newChild = newChildren[i];
    currentNodeIndex = (leftNode && leftNode.count)
      ? currentNodeIndex + leftNode.count + 1
      : currentNodeIndex + 1

    dfsWalk(child, newChild, currentNodeIndex, patches)
    leftNode = child
    
    // console.log(currentNodeIndex);
  })
}

function diffProps (oldNode, newNode) {
  let count = 0
  let oldProps = oldNode.props
  let newProps = newNode.props

  let key, value
  let propsPatches = {}

  // find out different properties
  for (key in oldProps) {
    value = oldProps[key]
    // debugger
    if (newProps[key] !== value) {
      count++
      propsPatches[key] = newProps[key]
    }
  }
  // find out new property
  for (key in newProps) {
    value = newProps[key]
    if (!oldProps.hasOwnProperty(key)) {
      count++
      propsPatches[key] = newProps[key]
    }
  }

  if (count === 0) {
    return null
  }
  return propsPatches
}

module.exports = diff
