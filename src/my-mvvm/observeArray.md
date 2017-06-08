## 数组监听

## 一、整体思路

1. 定义变量arrayProto接收Array的prototype
2. 定义变量arrayMethods，通过`Object.create()`方法继承arrayProto
3. 重新封装数组中`push`，`pop`等常用方法。（这里我们只封装我们需要监听的数组的方法，并不做JavaScript原生Array中原型方法的重写的这么一件暴力的事情）
4. 更多的奇淫技巧探究

## 二、监听数组变化实现

这里我们首先需要确定的一件事情就是，我们只需要监听我们需要监听的数据数组的一个变更，而不是针对原生Array的一个重新封装。

其实代码实现起来会比较简短，这一部分代码我会直接带着注释贴出来

```JavaScript
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
// newArrProto的属性上定义了我们封装好的push，pop等方法
list.__proto__ = newArrProto;
list.push(3);  // 监听到数组的变化啦！ 3

// 这里的list2没有被重新定义原型指针，所以这里会正常执行原生Array上的原型方法
let list2 = [1, 2];
list2.push(3);  // 3
```
目前为止我们已经实现了数组的监听。从上面我们看出，当我们将需要监听的数组的原型指针指向newArrProto对象上的时候(newArrProto的属性上定义了我们封装好的push，pop等方法)。这样做的好处很明显，不会污染到原生Array上的原型方法。

## 三、更多的奇淫技巧

### 1、分析实现的机制

从上面我们看出，其实我们做了一件非常简单的事情，首先我们将需要监听的数组的原型指针指向newArrProto，然后它会执行原生Array中对应的原型方法，与此同时执行我们自己重新封装的方法。

那么问题来了，这种形式咋这么眼熟呢？这不就是我们见到的最多的继承问题么？子类(newArrProto)和父类(Array)做的事情相似，却又和父类做的事情不同。但是直接修改`__proto__`隐式原型指向总感觉心里怪怪的（因为我们可能看到的多的还是prototype），心里不（W）舒（T）服（F）。

![](https://static.oschina.net/uploads/space/2017/0529/231513_HNS0_2912341.png)

那么接下来的事情就是尝试用继承(常见的prototype)来实现数组的变更监听。对于继承这一块可以参考我之前写过的一篇文章[浅析JavaScript继承](https://my.oschina.net/qiangdada/blog/745061)。

### 2、利用ES6的extends实现

首先这里我们会通过ES6的关键字extends实现继承完成Array原型方法的重写，咱总得先用另外一种方式来实现一下我们上面实现的功能，证明的确还有其他方法可以做到这件事。OK，废话不多说，直接看代码

```JavaScript
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
```

### 3、ES5及以下的方法能实现么？

OK，终于要回到我们常见的带有prototype的继承了，看看它究竟能不能也实现这件事情呢。这里我们直接上最优雅的继承方式-寄生式组合继承，看看能不能搞定这件事情。代码如下

```JavaScript
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
  //修正因为重写子类原型导致子类的constructor指向父类
  p.constructor = subClass;
  //设置子类的原型
  subClass.prototype = p;
}

function ArrayOfMine (args) {
  Array.apply(this, args);
}
inheritPrototype(ArrayOfMine, Array);
// 重写父类Array的push,pop等方法
ArrayOfMine.prototype.push = function () {
  console.log('监听到数组的变化啦！');
  return Array.prototype.push.apply(this, arguments);
}
var list4 = [1, 2];
var newList = new ArrayOfMine(list4);
console.log(newList, newList.length, newList instanceof Array, Array.isArray(newList));
newList.push(3);
console.log(newList, newList.length, newList instanceof Array, Array.isArray(newList));
```
目前我们这么看来，的的确确是利用寄生式组合继承完成了一个类的继承，那么console.log的结果又是如何的呢？是不是和我们预想的一样呢，直接看图说话吧

![](https://static.oschina.net/uploads/space/2017/0530/013806_7LRh_2912341.png)

![](https://static.oschina.net/uploads/space/2017/0530/013958_VQQC_2912341.png)

我擦嘞，这特么什么鬼，教练，我们说好的，不是这个结果。这是典型的买家秀和卖家秀吗？

那么我们来追溯一下为什么会是这种情况，我们预想中的情况应该是这样的

```JavaScript
newList => [1, 2]  newList.length => 2  Array.isArray(newList) => true
```
push执行之后的理想结果

```JavaScript
newList => [1, 2, 3]  newList.length => 3  Array.isArray(newList) => true
```

我们先抛弃Array的apply之后的结果，我们先用同样的方式继承我们自定义的父类Father，代码如下

```JavaScript
function inheritObject(o){
  function F(){};
  F.prototype = o;
  return new F();
}
function inheritPrototype(subClass,superClass){
  var p = inheritObject(superClass.prototype);
  p.constructor = subClass;
  subClass.prototype = p;
}

function Father() {
  // 这里我们暂且就先假定参数只有一个
  this.args = arguments[0];
  return this.args;
}
Father.prototype.push = function () {
  this.args.push(arguments);
  console.log('我是父类方法');
}
function ArrayOfMine () {
  Father.apply(this, arguments);
}
inheritPrototype(ArrayOfMine, Father);
// 重写父类Array的push,pop等方法
ArrayOfMine.prototype.push = function () {
  console.log('监听到数组的变化啦！');
  return Father.prototype.push.apply(this, arguments);
}
var list4 = [1, 2];
var newList = new ArrayOfMine(list4, 3);
console.log(newList, newList instanceof Father);
newList.push(3);
console.log(newList, newList instanceof Father);
```

结果如图

![](https://static.oschina.net/uploads/space/2017/0530/021555_Lk7B_2912341.png)

结果和我们之前预想的是一样的，我们自己定义的类的话，这种做法是可以行的通的，那么问题就来了，为什么将父类改成Array就行不通了呢？

为了搞清问题，查阅各种资料后。得出以下结论：
因为`Array`构造函数执行时不会对传进去的this做任何处理。不止`Array`，`String`，`Number`，`Regexp`，`Object`等等JS的内置类都不行。。这也是著名问题 ES5及以下的JS无法完美继承数组 的来源，不清楚的小伙伴可以Google查查这个问题。那么，为什么不能完美继承呢？

+ 数组有个响应式的length，一方面它会跟进你填入的元素的下表进行一个增长，另一方面如果你将它改小的话，它会直接将中间的元素也删除掉

```JavaScript
var arr1 = [1];
arr1[5] = 1;
console.log(arr1.length === 6);  // true
// 以及
var arr2 = [1,2,3];
arr2.length = 1
console.log(arr2);
// [1] 此时元素2，3被删除了
```

+ 数组内部的`[[class]]` 属性，这个属性是我们用`Array.isArray(someArray)`和`Object.prototype.String.call(someArray)` 来判定someArray是否是数组的根源，而这又是内部引擎的实现，用任何JS方法都是无法改变的。而为啥要用这两种方法进行数组的判定，相信大家从前面的代码结果可以看出来，利用`instanceof`去判定是否为数组，结果是有问题的。

因为数组其响应式的length属性以及内部的`[[class]]`属性我们无法再JS层面实现，这就导致我们无法去用任何一个对象来“模仿”一个数组，而我们想要创建一个ArrayOfMine继承Array的话又必须直接用Array的构造函数，而上面我提到了Array构造函数执行时是不会对传进去的this做任何处理，也就是说这样你根本就不能继承他。而利用`__proto__`隐式原型的指针变更却能实现，因为他是一个非标准的属性（已在ES6语言规范中标准化），详请请点击链接[`__proto__`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)。

所以要实现最上面我们实现的功能，我们还是需要用到`__proto__`属性。变更后代码如下

```JavaScript
function inheritObject(o){
  function F(){}
  F.prototype = o;
  return new F();
}
function inheritPrototype(subClass,superClass){
  var p = inheritObject(superClass.prototype);
  p.constructor = subClass;
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
```
结果如图

![](https://static.oschina.net/uploads/space/2017/0530/101243_kMgZ_2912341.png)

自此，我所知道几种实现数组监听的方法便得于实现了。

## 总结

总结以上几点方案，基于[上篇文章](https://my.oschina.net/qiangdada/blog/906220)的基础，完整的数组监听代码如下
```JavaScript
// Define Property
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    configurable: true,
    writable: true
  })
}
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
  def(arrayMethods, method, function () {
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
```
mvvm库的完整代码链接：

`github`- [https://github.com/xuqiang521/overwrite/tree/master/my-mvvm](https://github.com/xuqiang521/overwrite/tree/master/my-mvvm)

`码云`- [https://git.oschina.net/qiangdada_129/overwrite/tree/master/my-mvvm](https://git.oschina.net/qiangdada_129/overwrite/tree/master/my-mvvm)

`在线JS Bin预览地址`-[http://jsbin.com/tixekufaha/edit?html,js,output](http://jsbin.com/tixekufaha/edit?html,js,output)

![](https://static.oschina.net/uploads/space/2017/0530/110300_SE7n_2912341.png)

喜欢的话走波`star`，`star`是我继续下去最大的动力了

以上便是这篇文章的所有内容了，如果有哪里写的有问题，还请各位小伙伴拍砖指出，共同进步学习！
