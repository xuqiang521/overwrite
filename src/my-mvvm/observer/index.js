import _ from 'utils'
import Dep from './dep'
import Compiler from 'compiler'


// observe array
let arrayProto = Array.prototype;
let arrayMethods = Object.create(arrayProto);
[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(method => {
  // 原始数组操作方法
  let original = arrayMethods[method];
  _.def(arrayMethods, method, function () {
    let arguments$1 = arguments;
    let i = arguments.length;
    let args = new Array(i);

    while (i--) {
      args[i] = arguments$1[i]
    }
    // 执行数组方法
    let result = original.apply(this, args);
    // 因 arrayMethods 是为了作为 Observer 中的 value 的原型或者直接作为属性，所以此处的 this 一般就是指向 Observer 中的 value
    // 当然，还需要修改 Observer，使得其中的 value 有一个指向 Observer 自身的属性，__ob__，以此将两者关联起来
    let ob = this.__ob__;
    // 存放新增数组元素
    let inserted;
    // 为add 进arry中的元素进行observe
    switch (method) {
      case 'push':
        inserted = args;
        break;
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        // 第三个参数开始才是新增元素
        inserted = args.slice(2);
        break;
    }
    if (inserted) {
      ob.observeArray(inserted);
    }
    // 通知数组变化
    ob.dep.notify();
    // 返回新数组长度
    return result;
  })
})
// arrayMethods所有的枚举属性名
const arrayKeys = Object.getOwnPropertyNames(arrayMethods);
const hasProto = '__proto__' in {};

class Observer {
  constructor(value) {
    this.value = value;
    this.dep = new Dep();
    _.def(value, '__ob__', this);
    if (Array.isArray(value)) {
      let augment = hasProto ? _.protoAugment : _.copyAugment;
      augment(value, arrayMethods, arrayKeys);
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive$$1(obj, key, obj[key]);
    });
  }

  observeArray(items) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  }
}

function defineReactive$$1 (obj, key, val) {
  let dep = new Dep();
  let childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
      }

      return val;
    },
    set: function(newVal) {
      if (val === newVal || (newVal !== newVal && val !== val)) {
        return;
      }
      val = newVal;
      // 监听子属性
      childOb = observe(newVal);
      // 通知数据变更
      dep.notify();
    }
  })
}

function observe(value, asRootData) {
  if (!value || typeof value !== 'object') {
    return;
  }
  let ob;
  if (_.hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else  {
    ob = new Observer(value);
  }
  return ob
}

export {
  Observer,
  defineReactive$$1,
  observe
};
