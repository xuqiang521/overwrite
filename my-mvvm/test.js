function observe (data) {
  if (!data || typeof data !== 'object') {
    return;
  }
  Object.keys(data).forEach(key => {
    observeProperty(data, key, data[key])
  })
}
function observeProperty (obj, key, val) {
  observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,   // 可枚举
    configurable: true, // 可重新定义
    get: function () {
      return val;
    },
    set: function (newVal) {
      if (val === newVal || (newVal !== newVal && val !== val)) {
        return;
      }
      console.log('数据更新啦 ', val, '=>', newVal);
      val = newVal;
    }
  });
}
function Compile (el, value) {
  this.$val = value;
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);
  if (this.$el) {
    this.compileElement(this.$el);
  }
}
Compile.prototype = {
  compileElement: function (el) {
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
        // 匹配第一个选项
        self.compileText(node, RegExp.$1.trim());
      }
      // 解析子节点包含的指令
      if (node.childNodes && node.childNodes.length) {
        self.compileElement(node);
      }
    })
  },
  // 指令解析
  compile: function (node) {
    let nodeAttrs = node.attributes;
    let self = this;

    [].slice.call(nodeAttrs).forEach(attr => {
      var attrName = attr.name;
      if (self.isDirective(attrName)) {
        var exp = attr.value;
        node.innerHTML = typeof this.$val[exp] === 'undefined' ? '' : this.$val[exp];
        node.removeAttribute(attrName);
      }
    });
  },
  // {{ test }} 匹配变量 test
  compileText: function (node, exp) {
    node.textContent = typeof this.$val[exp] === 'undefined' ? '' : this.$val[exp];
  },
  // element节点
  isElementNode: function (node) {
    return node.nodeType === 1;
  },
  // text纯文本
  isTextNode: function (node) {
    return node.nodeType === 3
  },
  // x-XXX指令判定
  isDirective: function (attr) {
    return attr.indexOf('x-') === 0;
  }
}
