// function def(obj, key, val, enumerable) {
//   Object.defineProperty(obj, key, {
//     value: val,
//     enumerable: !!enumerable,
//     writable: true,
//     configurable: true
//   });
// }
function MVVM (options) {
  this.$options = options || {};
  let data = this._data = this.$options.data;
  // console.log(data);
  let self = this;

  Object.keys(data).forEach(key => {
    self._proxyData(key);
  });
  observer(data, this);
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

function observer(obj) {
  if (!obj || typeof obj !== 'object') {
    return;
  }
  Object.keys(obj).forEach(key => {
    depObserver(obj, key, obj[key]);
  })
}
function depObserver(obj, key, val) {
  // let dep = new Dep();
  observer(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: false,
    get: function() {
      // if (Dep.target) {
      //   dep.depend();
      // }
      return val;
    },
    set: function(newVal) {
      if (val === newVal || (newVal !== newVal && val !== val)) {
        return;
      }
      val = newVal;
      // dep.notify();
      // console.log(newVal);
    }
  });
}

function Compile(el, vm) {
  this.$vm = vm;
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);

  if (this.$el) {
    this.compileElement(this.$el);
  }
}
Compile.prototype = {
  init: function () {
  },
  node2Fragment: function (el) {

  },
  compileElement: function (el) {
    var self = this;
    var childNodes = el.childNodes;
    [].slice.call(childNodes).forEach(node => {
      var text = node.textContent;
      var reg = /\{\{((?:.|\n)+?)\}\}/;

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
  bind: function (node, vm, exp, dir) {
    let updaterFn = updater[dir + 'Updater'];

    updaterFn && updaterFn(node, this._getVmVal(vm, exp));
  },
  _getVmVal: function (vm, exp) {
    let val = vm;
    exp = exp.split('.');
    console.log(val.a, exp);
    exp.forEach(key => {
      console.log(val.a, key, val[key]);
      val = val[key];
    });
    return val;
  },
  _setVmVal: function (vm, exp, value) {
    let val = vm;
    exps = exp.split('.');
    exps.forEach((key, index) => {
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
    node.innerHTML = typeof value == 'undefined' ? '' : value;
  },
  textUpdater: function (node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value;
  },
  classUpdater: function () {}
}



// let uid = 0;
// function Dep() {
//   this.id = uid++;
//   this.subs = [];
// }
// Dep.target = null;
// Dep.prototype.addSub = function addSub(sub) {
//   this.subs.push(sub);
// }
// Dep.prototype.removeSub = function removeSub(sub) {
//   let index = this.subs.indexof(sub);
//   if (index !== -1) {
//     this.subs.splice(index, 1)
//   }
// }
// Dep.prototype.depend = function depend() {
//   Dep.target.addDep(this);
// }
// Dep.prototype.notify = function notify() {
//   this.subs.forEach(sub => {
//     sub.update();
//   });
// }
// function Watcher(vm, expOrFn, cb) {
//   this.vm = vm;
//   this.exp = exp;
//   this.cb = cb;
//   this.depIds = Object.create(null);
//
//   if (typeof expOrFn === 'function') {
//     this.getter = expOrFn
//   }
//   else {
//     this.getter = this.parseGetter(expOrFn);
//   }
//
//   this.value = this.get();
// }
// Watcher.prototype.update = function update() {
//   this.run();
// }
// Watcher.prototype.run = function run() {
//   let newVal = this.get();
//   let oldVal = this.value;
//   if (newVal === oldVal) {
//     return;
//   }
//   this.value = newVal;
//   this.cb.call(this.vm, value, oldVal);
// }
// Watcher.prototype.get = function get() {
//   Dep.target = this;
//   let value = this.vm[exp];
//   Dep.target = null;
//   return value;
// }
// Watcher.prototype.addDep = function addDep(dep) {
//   if (!this.depIds.hasOwnProperty(dep.id)) {
//      dep.addSub(this);
//      this.depIds[dep.id] = dep;
//    }
// }
// Watcher.prototype.parseGetter = function parseGetter(exp) {
//   if (/[^\w.$]/.test(exp)) return;
//
//   let exps = exp.split('.');
//
//   return function(obj) {
//       for (let i = 0, len = exps.length; i < len; i++) {
//           if (!obj) return;
//           obj = obj[exps[i]];
//       }
//       return obj;
//   }
// }
// function Compile(el, vm) {
//   this.$vm = vm;
//   // this.$el =
// }
// new Watcher();
// console.log(update);
// Compile.prototype.isElementNode = function () {}
function $(id) {
  return document.getElementById(id);
}
