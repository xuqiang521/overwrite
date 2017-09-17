# setTimeout

  >overwrite setTimeout() polyfill

## `WindowOrWorkerGlobalScope.setTimeout()`

```javascript
// 语法1
var timeoutId = scope.setTimeout(function[, delay, param1, param2, ...]);
// 语法2
var timeoutId = scope.setTimeout(code[, delay]);
```
## 参数及返回值

- `function` : 想要在delay毫秒之后执行的函数。
- `delay`（可选): 延迟毫秒数，即函数调用会在改延迟后发生，省略该参数，则delay为0，但此时实际延时并不是0，而是4ms左右的延迟
- `param1, ..., paramN`（可选）
- `code`：delay毫秒之后需要执行的代码字符串
- 返回值：返回值timeoutID是一个正整数，表示定时器的编号。这个值可以传递给clearTimeout()来取消该定时

## polifill

具体看[setTimeout.js](https://github.com/xuqiang521/overwrite/blob/master/modules/my-setTimeout/setTimeout.js)

