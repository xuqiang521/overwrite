# Observer

>overwrite `Observer()`


## 思路

观察者模式：又被称作发布-订阅模式或者消息机制，定义了一种依赖关系，解决了主体对象与观察者之间功能的耦合。</br>
这里我将写三个方法，分别做`消息发布`，`消息订阅`以及`消息的取消发布`。

## 实现
```javascript
// 观察者
var Observer = function () {};
// 发布消息
Observer.prototype.$on = function () {};
// 取消发布
Observer.prototype.$off = function () {};
// 消息监听触发
Observer.prototype.$emit = function () {};
```

## 效果
```javascript
var test = new Observer();
test.$on('test', function (data) {
  console.log(data);
});
test.$emit('test', 'i am an example');
// i am an example
test.$off();
// test._events = {}  // No Properties
```
