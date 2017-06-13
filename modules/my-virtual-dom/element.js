import _ from './utils'

/**
 * @class Element Virtrual Dom
 * @param { String } tagName
 * @param { Object } props   Element's properties, eg: { id: 'list' }
 * @param { Array <Element|String> } - This element's children elements.
 *                                   - Can be Element instance or just a piece plain text.
 */
class Element {
  constructor(tagName, props, children) {
    if (!(this instanceof Element)) {
      if (!_.isArray(children) && children !== null) {
        children = _.slice(arguments, 2).filter(_.truthy)
      }
    }

    if (_.isArray(props)) {
      children = props
      props = {}
    }

    this.tagName = tagName
    this.props = props || {}
    this.children = children
    this.key = props
      ? props.key
      : void 0

    let count = 0
    this.children.forEach((child, i) => {
      if (child instanceof Element) {
        count += child.count
      } else {
        children[i] = '' + child
      }
      count++
    })

    this.count = count
  }

  render () {
    let el = document.createElement(this.tagName);
    let props = this.props;

    for (let propName in props) {
      let propValue = props[propName];
      _.setAttr(el, propName, propValue);
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

module.exports = function (tagName, props, children) {
  return new Element(tagName, props, children)
}
