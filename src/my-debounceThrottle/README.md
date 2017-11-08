# debounceThrottle

  >overwrite debounce() and throttle() 函数防抖，函数节流

## 函数防抖（debounce）

`使用场景`：现在我们需要做一个搜索框，当用户输入文字，执行keyup事件的时候，需要发出异步请求去进行结果查询。但如果用户快速输入了一连串字符，例如是5个字符，那么此时会瞬间触发5次请求，这肯定不是我们希望的结果。我们想要的是用户停止输入的时候才去触发查询的请求，这个时候函数防抖可以帮到我们

`原理`：让函数在上次执行后，满足等待某个时间内不再触发次函数后再执行，如果触发则等待时间重新计算

`用法参数设计`：

```javascript
/**
 * [debounce 函数防抖]
 * @param  {Function}  fn        [需要进行函数防抖的函数]
 * @param  {Number}    wait      [需要等待的时间]
 * @param  {Boolean}   immediate [调用时是否立即执行一次]
 */
function debounce (fn, wait, immediate) {
  // do something
}
```


## 函数节流（throttle）

`使用场景`：window.onscroll，以及window.onresize等，每间隔某个时间去执行某函数，避免函数的过多执行

`原理`：与函数防抖不同，它不是要在每完成某个等待时间后去执行某个函数，而是要每间隔某个时间去执行某个函数

`用法参数设计`：

```javascript
/**
 * [throttle 函数节流]
 * @param  {Function} fn      [需要进行函数节流的函数]
 * @param  {Number}   wait    [函数执行的时间间隔]
 * @param  {Object}   options [执行参数] 
 */
// options = {
//   leading: true  // 第一次调用事件是否立即执行
//   trailing: true // 最后一次延迟调用是否执行 
// }
function throttle (fn, wait, options) {
  // do something
}
```


## 参考

[函数防抖（debounce）](http://underscorejs.org/#debounce)

[函数节流（throttle）](http://underscorejs.org/#throttle)




