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

console.log('=========修改__proto__==========');
// 获取Array原型
const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
const newArrProto = [];
[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(method => {
  // 原生Array的原型方法
  let original = arrayMethods[method];

  // 将push，pop等方法重新封装并定义在对象newArrProto的属性上
  // 这里需要注意的是封装好的方法是定义在newArrProto的属性上而不是其原型属性
  // newArrProto.__proto__ 没有改变
  newArrProto[method] = function mutator() {
    console.log('监听到数组的变化啦！');

    // 调用对应的原生方法并返回结果（新数组长度）
    return original.apply(this, arguments);
  }
})

let list = [1, 2];
// 将我们要监听的数组的原型指针指向上面定义的空数组对象
// newArrProto的属性上定义了我们封装好的push等方法
list.__proto__ = newArrProto;
list.push(3);  // 监听到数组的变化啦！ 3

// 这里的list2没有被重新定义原型指针，所以这里会正常执行原生Array上的原型方法
let list2 = [1, 2];
list2.push(3);  // 3
console.log('===============ES6==============');


class NewArray extends Array {
  constructor(...args) {
    // 调用父类Array的constructor()
    super(...args)
  }
  push (...args) {
    console.log('监听到数组的变化啦！');

    // 调用父类原型push方法
    return super.push(...args)
  }
  // ...
}

let list3 = [1, 2];

let arr = new NewArray(...list3);
console.log(arr)
// (2) [1, 2]

arr.push(3);
// 监听到数组的变化啦！
console.log(arr)
// (3) [1, 2, 3]

console.log('=============prototype===========');

/**
 * 寄生式继承 继承原型
 * 传递参数 subClass 子类
 * 传递参数 superClass 父类
 */
function inheritObject(o){
  //声明一个过渡函数
  function F(){}
  //过渡对象的原型继承父对象
  F.prototype = o;
  return new F();
}
function inheritPrototype(subClass,superClass){
  //复制一份父类的原型副本保存在变量
  var p = inheritObject(superClass.prototype);
  //修正因为重写子类原型导致子类的constructor
  p.constructor = subClass;
  //设置子类的原型
  subClass.prototype = p;
}

function ArrayOfMine () {
  var args = arguments
    , len = args.length
    , i = 0
    , args$1 = [];   // 保存所有arguments
  for (; i < len; i++) {
    // 判断参数是否为数组，如果是则直接concat
    if (Array.isArray(args[i])) {
      args$1 = args$1.concat(args[i]);
    }
    // 如果不是数组，则直接push到
    else {
      args$1.push(args[i])
    }
  }
  // 接收Array.apply的返回值，刚接收的时候arr是一个Array
  var arr = Array.apply(null, args$1);
  // 将arr的__proto__属性指向 ArrayOfMine的 prototype
  arr.__proto__ = ArrayOfMine.prototype;
  return arr;
}
inheritPrototype(ArrayOfMine, Array);
// 重写父类Array的push,pop等方法
ArrayOfMine.prototype.push = function () {
  console.log('监听到数组的变化啦！');
  return Array.prototype.push.apply(this, arguments);
}
var list4 = [1, 2];
var newList = new ArrayOfMine(list4, 3);
console.log(newList, newList.length, newList instanceof Array, Array.isArray(newList));
newList.push(4);
console.log(newList, newList.length, newList instanceof Array, Array.isArray(newList));

// function Father() {
//   // 这里我们暂且就先假定参数只有一个
//   this.args = arguments[0];
//   return this.args;
// }
// Father.prototype.push = function () {
//   this.args.push(arguments);
//   console.log('我是父类方法');
// }
// function ArrayOfMine () {
//   Father.apply(this, arguments);
// }
// inheritPrototype(ArrayOfMine, Father);
// // 重写父类Array的push,pop等方法
// ArrayOfMine.prototype.push = function () {
//   console.log('监听到数组的变化啦！');
//   return Father.prototype.push.apply(this, arguments);
// }
// var list4 = [1, 2];
// var newList = new ArrayOfMine(list4, 3);
// console.log(newList, newList instanceof Father);
// newList.push(3);
// console.log(newList, newList instanceof Father);

console.log('============数组特殊属性===========');
var arr1 = [1];
arr1[5] = 1;
console.log(arr1.length === 6);  // true
// 以及
var arr2 = [1,2,3];
arr2.length = 1
console.log(arr2);
// [1] 此时元素2，3被删除了
