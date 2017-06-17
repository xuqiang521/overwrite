import _ from './utils'

/**
 * @class Element Virtrual Dom
 * @param { String } tagName
 * @param { Object } attrs   Element's attrs, eg: { id: 'list' }
 * @param { Array <Element|String> } - This element's children elements.
 *                                   - Can be Element instance or just a piece plain text.
 */
class Element {
  constructor(tagName, attrs, children) {
    if (!(this instanceof Element)) {
      if (!_.isArray(children) && children !== null) {
        children = _.slice(arguments, 2).filter(_.truthy)
      }
    }

    if (_.isArray(attrs)) {
      children = attrs
      attrs = {}
    }

    this.tagName = tagName
    this.attrs = attrs || {}
    this.children = children
    this.key = attrs
      ? attrs.key
      : void 0

    // let count = 0
    // this.children.forEach((child, i) => {
    //   if (child instanceof Element) {
    //     count += child.count
    //   } else {
    //     children[i] = '' + child
    //   }
    //   count++
    // })
    // this.count = count
  }

  render () {
    let el = document.createElement(this.tagName);
    let attrs = this.attrs;

    for (let attrName in attrs) {
      let attrValue = attrs[attrName];
      _.setAttr(el, attrName, attrValue);
    }

    let children = this.children || []

    children.forEach(child => {
      let childEl = child instanceof Element
      ? child.render()
      : document.createTextNode(child);
      el.appendChild(childEl);
    })

    return el;
  }
}

module.exports = function (tagName, attrs, children) {
  return new Element(tagName, attrs, children)
}
