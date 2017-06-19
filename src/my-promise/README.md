# Promise

>overwrite `Promise()`


## 思路

Promise是CommonJS的规范之一，拥有resolve、reject、done、fail、then等方法，能够帮助我们控制代码的流程

详细点击 [Promise解析](http://es6.ruanyifeng.com/#docs/promise)

源码来源 [Promise源码](https://github.com/stefanpenner/es6-promise/blob/master/dist/es6-promise.js)

## 图示

![](https://mdn.mozillademos.org/files/8633/promises.png)

## Promise部分功能重写（进展）
- [x] `Promise`
- [x] `Promise.prototype.then()`
- [x] `Promise.prototype.catch()`
- [x] `Promise.resolve()`
- [x] `Promise.reject()`
- [ ] `Promise.all()` 
- [ ] `Promise.race()` 
- [x] `Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject`

## Promise状态
- pending（等待状态）
- resolved（完成状态，又称fulfill）
- rejected（已拒绝状态）

## 重写注意事项
- promise必须实现then方法，then可以说是promise的核心，返回值也是一个promise对象，同一个promise的then可以调用多次

- then方法接受两个参数，两个参数都是函数。一个是resolved时的回调，一个是rejected时的回调，第二个参数属于可选。

- Promise.all() 将多个 Promise 实例，包装成一个新的 Promise 实例，类似与操作

- Promise.race() 将多个 Promise 实例，包装成一个新的 Promise 实例，类似或操作 

## 简单架子
```javascript
// 异步的三个状态，pending，fulfill以及rejected
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
/**
 * @class Promise
 * @param {[type]} resolver [function]
 */
function Promise(resolver) {};
Promise.prototype = {
  constructor: Promise,
  then: then
};
/**
 * [initializePromise 初始化Promise并执行resolver回调]
 * @param  {[type]} promise  [Promise对象]
 * @param  {[type]} resolver [resolver回调]
 */
function initializePromise(promise, resolver) {};
/**
 * [_resolve resolve处理]
 * @param  {[type]} promise [Promise对象]
 * @param  {[type]} value   [回调参数]
 */
function _resolve (promise, value) {};
/**
 * [_resolve reject处理]
 * @param  {[type]} promise [Promise对象]
 * @param  {[type]} value   [回调参数]
 */
function _reject(promise, reason) {};
/**
 * [then 异步回调]
 * @param  {[function]} resolve [resolve回调]
 * @param  {[function]} reject  [reject回调]
 */
function resolve (object) {};
function reject (reason) {};
function then (resolve, reject) {};
/**
 * [nextTick 下一进程处理]
 * @param  {Function} callback [回调函数]
 * @param  {[type]}   value    [回调参数值]
 */
function nextTick (callback, value) {};

```

## 更多功能重写
`等待后续...`
