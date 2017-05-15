function MVVM (options) {
  this.$options = options || {};
  let data = this._data = this.$options.data;
  let self = this;

  Object.keys(data).forEach(key => {
    self._proxyData(key);
  });
  observe(data, this);
  new Compile(options.el || document.body, this);
}
MVVM.prototype = {
  _proxyData: function (key, setter, getter) {
    let self = this;
    setter = setter ||
    Object.defineProperty(self, key, {
      configurable: false,
      enumerable: true,
      get: function proxyGetter() {
        return self._data[key];
      },
      set: function proxySetter(newVal) {
        self._data[key] = newVal;
      }
    })
  }
}
/**
 * @class Observer that are attached to each observed
 * @param {[type]} value [vm参数]
 */
function Observer(value) {
  this.value = value;
  this.dep = new Dep();

  this.walk(value);
}
function observe(value, asRootData) {
  if (!value || typeof value !== 'object') {
    return;
  }
  return new Observer(value);
}
Observer.prototype = {
  walk: function (obj) {
    let self = this;
    Object.keys(obj).forEach(key => {
      self.defineReactive(obj, key, obj[key]);
    });
  },
  defineReactive: function (obj, key, val) {
    let dep = new Dep();
    let childOb = observe(val);
    console.log(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function() {
        if (Dep.target) {
          dep.depend();
        }
        if (childOb) {
          childOb.dep.depend();
        }
        return val;
      },
      set: function(newVal) {
        if (val === newVal || (newVal !== newVal && val !== val)) {
          return;
        }
        val = newVal;
        childOb = observe(newVal);
        dep.notify();
      }
    })
  }
}

function Compile(el, vm) {
  this.$vm = vm;
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

      if (self.isElementNode(node)) {
        self.compile(node);
      }
      else if (self.isTextNode(node) && reg.test(text)) {
        // 匹配第一个选项
        self.compileText(node, RegExp.$1);
      }
      if (node.childNodes && node.childNodes.length) {
        self.compileElement(node);
      }
    });
  },
  compile: function (node) {
    let nodeAttrs = node.attributes;
    let self = this;

    [].slice.call(nodeAttrs).forEach(function(attr) {
      var attrName = attr.name;
      if (self.isDirective(attrName)) {
        var exp = attr.value;
        var dir = attrName.substring(2);
        // 事件指令
        if (self.isEventDirective(dir)) {
          compileUtil.eventHandler(node, self.$vm, exp, dir);
        }
        // 普通指令
        else {
          compileUtil[dir] && compileUtil[dir](node, self.$vm, exp);
        }

        node.removeAttribute(attrName);
      }
    });
  },
  // {{ test }} 匹配变量 test
  compileText: function (node, exp) {
    compileUtil.text(node, this.$vm, exp);
  },
  isElementNode: function (node) {
    return node.nodeType === 1;
  },
  isTextNode: function (node) {
    return node.nodeType === 3
  },
  isDirective: function (attr) {
    return attr.indexOf('x-') === 0;
  },
  isEventDirective: function (dir) {
    return dir.indexOf('on') === 0;
  }
}

const compileUtil = {
  html: function (node, vm, exp) {
    this.bind(node, vm, exp, 'html');
  },
  text: function (node, vm, exp) {
    this.bind(node, vm, exp, 'text');
  },
  class: function (node, vm, exp) {
    this.bind(node, vm, exp, 'class');
  },
  model: function(node, vm, exp) {
    this.bind(node, vm, exp, 'model');

    let self = this;
    let val = this._getVmVal(vm, exp);

    node.addEventListener('input', function (e) {
      let newVal = e.target.value;
      if (val === newVal) {
        return;
      }
      self._setVmVal(vm, exp, newVal);
      val = newVal;
    });
  },
  bind: function (node, vm, exp, dir) {
    let updaterFn = updater[dir + 'Updater'];

    updaterFn && updaterFn(node, this._getVmVal(vm, exp));

    new Watcher(vm, exp, function(value, oldValue) {
      updaterFn && updaterFn(node, value, oldValue);
    });
  },
  // 事件处理
  eventHandler: function(node, vm, exp, dir) {
    let eventType = dir.split(':')[1];
    let fn = vm.$options.methods && vm.$options.methods[exp];

    if (eventType && fn) {
      node.addEventListener(eventType, fn.bind(vm), false);
    }
  },
  _getVmVal: function (vm, exp) {
    let val = vm;
    exp = exp.split('.');
    exp.forEach(key => {
      key = key.replace(/(^\s+)|(\s+$)/g,"");
      val = val[key];
    });
    return val;
  },
  _setVmVal: function (vm, exp, value) {
    let val = vm;
    exps = exp.split('.');
    exps.forEach((key, index) => {
      key = key.replace(/(^\s+)|(\s+$)/g,"");
      if (index < exps.length - 1) {
        val = val[key];
      }
      else {
        val[key] = value;
      }
    });
  }
}
const updater = {
  htmlUpdater: function (node, value) {
    node.innerHTML = typeof value === 'undefined' ? '' : value;
  },
  textUpdater: function (node, value) {
    node.textContent = typeof value === 'undefined' ? '' : value;
  },
  classUpdater: function () {},
  modelUpdater: function (node, value, oldValue) {
    node.value = typeof value === 'undefined' ? '' : value;
  }
}

// const uid = 0;
function Dep() {
  // this.id = uid++;
  this.subs = [];
}
Dep.target = null;
Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
}
Dep.prototype.removeSub = function removeSub(sub) {
  let index = this.subs.indexof(sub);
  if (index !== -1) {
    this.subs.splice(index, 1)
  }
}
Dep.prototype.depend = function depend() {
  Dep.target.addDep(this);
}
Dep.prototype.notify = function notify() {
  this.subs.forEach(sub => {
    sub.update();
  });
}
function Watcher(vm, expOrFn, cb) {
  this.vm = vm;
  expOrFn = expOrFn.replace(/(^\s+)|(\s+$)/g,"");
  this.expOrFn = expOrFn;
  this.cb = cb;
  this.depIds = Object.create(null);

  if (typeof expOrFn === 'function') {
    this.getter = expOrFn
  }
  else {
    this.getter = this.parseGetter(expOrFn);
  }
// console.log(expOrFn);
  this.value = this.get();
}
Watcher.prototype.update = function update() {
  this.run();
}
Watcher.prototype.run = function run() {
  let newVal = this.get();
  let oldVal = this.value;
  if (newVal === oldVal) {
    return;
  }
  this.value = newVal;
  this.cb.call(this.vm, newVal, oldVal);
}
Watcher.prototype.get = function get() {
  Dep.target = this;
  let value = this.getter.call(this.vm, this.vm);
  Dep.target = null;
  return value;
}
Watcher.prototype.addDep = function addDep(dep) {
  // if (!this.depIds.hasOwnProperty(dep.id)) {
     dep.addSub(this);
  //    this.depIds[dep.id] = dep;
  //  }
}
Watcher.prototype.parseGetter = function parseGetter(exp) {
  if (/[^\w.$]/.test(exp)) return;

  let exps = exp.split('.');

  return function(obj) {
      for (let i = 0, len = exps.length; i < len; i++) {
          if (!obj) return;
          obj = obj[exps[i]];
      }
      return obj;
  }
}
