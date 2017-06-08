import _ from './utils'
import {Observer, observe} from './observer'
import Compiler from './compiler'

class Xue {
  constructor (options) {
    this.$options = options || {};
    let data = this._data = this.$options.data;
    let self = this;

    Object.keys(data).forEach(key => {
      self.proxy(key);
    });
    observe(data, this);
    new Compiler(options.el || document.body, this);
  }

  proxy (key, setter, getter) {
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

  $set (target, key, val) {
    set (target, key, val)
  }

  $delete (target, key) {
    del (target, key)
  }
}

function set (target, key, val) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  if (_.hasOwn(target, key)) {
    target[key] = val;
    return val;
  }
  let ob = (target).__ob__;
  if (!ob) {
    target[key] = val;
    return val;
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val;
}
function del (target, key) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.splice(key, 1);
    return;
  }
  let ob = (target).__ob__;
  if (!_.hasOwn(target, key)) {
    return;
  }
  delete target[key];
  if (!ob) {
    return;
  }
  ob.dep.notify();
}

module.exports = window.Xue = Xue;