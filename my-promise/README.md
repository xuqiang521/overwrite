# Promise

>overwrite `Promise()`


## 思路

Promise是CommonJS的规范之一，拥有resolve、reject、done、fail、then等方法，能够帮助我们控制代码的流程 </br>
详细点击 [Promise解析](http://es6.ruanyifeng.com/#docs/promise)</br>
源码来源 [Promise源码](https://github.com/stefanpenner/es6-promise/blob/master/dist/es6-promise.js)

## 图示

![](https://mdn.mozillademos.org/files/8633/promises.png)

## Promise部分功能重写
- `Promise`
- `Promise.prototype.then()`
- `Promise.resolve()`
- `Promise.reject()`

## Promise状态
- pending（等待状态）
- resolved（完成状态，又称fulfill）
- rejected（已拒绝状态）

## 重写注意事项
- promise必须实现then方法，then可以说是promise的核心，返回值也是一个promise对象，同一个promise的then可以调用多次
- then方法接受两个参数，两个参数都是函数。一个是resolved时的回调，一个是rejected时的回调，第二个参数属于可选。
