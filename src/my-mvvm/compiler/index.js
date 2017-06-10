import Watcher from 'watcher'
import { CompilerUtils } from 'utils/dom'

class Compiler {
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {
      this.$fragment = this.nodeFragment(this.$el);
      this.compileElement(this.$fragment);
      this.$el.appendChild(this.$fragment);
    }
  }

  nodeFragment (el) {
    let fragment = document.createDocumentFragment();
    let child;

    while (child = el.firstChild) {
      fragment.appendChild(child);
    }
    return fragment;
  }

  compileElement (el) {
    let self = this;
    let childNodes = el.childNodes;

    [].slice.call(childNodes).forEach(node => {
      let text = node.textContent;
      let reg = /\{\{((?:.|\n)+?)\}\}/;

      // 如果是element节点
      if (self.isElementNode(node)) {
        self.compile(node);
      }
      // 如果是text节点
      else if (self.isTextNode(node) && reg.test(text)) {
        self.compileText(node, RegExp.$1)
      }
      // 解析子节点包含的指令
      if (node.childNodes && node.childNodes.length) {
        self.compileElement(node);
      }
    });
  }

  compile (node) {
    let self = this;
    let nodeAttrs = node.attributes;

    [].slice.call(nodeAttrs).forEach(attr => {
      let attrName = attr.name;
      let dir = attrName.substring(2);

      if (self.isDirective(attrName)) {
        let exp = attr.value;

        if (self.isEventDirective(dir)) {
          CompilerUtils.eventHandler(node, self.$vm, exp, dir);
        }
        else {
          CompilerUtils[dir] && CompilerUtils[dir](node, self.$vm, exp);
        }

        node.removeAttribute(attrName);
      }
    })
  }

  compileText (node, exp) {
    CompilerUtils.text(node, this.$vm, exp);
  }

  isElementNode (node) {
    return node.nodeType === 1
  }

  isTextNode (node) {
    return node.nodeType === 3
  }

  isDirective (attr) {
    return attr.indexOf('x-') === 0
  }

  isEventDirective (dir) {
    return dir.indexOf('on') === 0
  }
}

export default Compiler;
