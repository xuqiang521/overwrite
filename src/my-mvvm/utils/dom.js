import Watcher from 'watcher'

// 缓存当前执行input事件的input dom对象
let $elm;
let timer = null;
// 指令处理集合
const CompilerUtils = {
  html: function (node, vm ,exp) {
    this.bind(node, vm, exp, 'html')
  },

  text: function (node, vm, exp) {
    this.bind(node, vm, exp, 'text')
  },

  model: function (node, vm, exp) {
    this.bind(node, vm, exp, 'model');
    // model 操作
    let self = this;
    let val = this._getVmVal(vm, exp);
    // 监听input事件
    node.addEventListener('input', function (e) {
      let newVal = e.target.value;
      $elm = e.target

      if (val === newVal) return;

      clearTimeout(timer);
      timer = setTimeout(function () {
        self._setVmVal(vm, exp, newVal);
        val = newVal;
      })
    })
  },

  bind: function (node, vm, exp, dir) {
    let updaterFn = updater[dir + 'Updater'];
    let val = this._getVmVal(vm, exp);

    updaterFn && updaterFn(node, val);

    new Watcher(vm, exp, function(value, oldValue) {
      updaterFn && updaterFn(node, value, oldValue);
    });
  },

  eventHandler: function (node, vm, exp, dir) {
    let eventType = dir.split(':')[1];
    let fn = vm.$options.methods && vm.$options.methods[exp];

    if (eventType && fn) {
      // fn.bind(vm) 将作用域指向vm
      node.addEventListener(eventType, fn.bind(vm), false);
    }
  },

  _getVmVal: function (vm, exp) {
    let val = vm;
    let exps = exp.split('.');
    exps.forEach(key => {
      key = key.trim();
      val = val[key]
    })

    return val;
  },

  _setVmVal: function (vm, exp, newVal) {
    let val = vm;
    let exps = exp.split('.');

    exps.forEach((key, index) => {
      key = key.trim();
      if (index < exps.length - 1) {
        val = val[key];
      }
      else {
        val[key] = newVal;
      }
    })
  }
}

// 指令渲染集合
const updater = {
  htmlUpdater: function (node, value) {
    node.innerHTML = typeof value === 'undefined' ? '' : value;
  },
  textUpdater: function (node, value) {
    node.textContent = typeof value === 'undefined' ? '' : value;
  },
  modelUpdater: function (node, value, oldValue) {
    if ($elm === node) {
      return false;
    }
    $elm = undefined;
    node.value = typeof value === 'undefined' ? '' : value;
  }
}

export { CompilerUtils, updater };
