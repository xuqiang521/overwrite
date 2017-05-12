# clone

>overwrite `clone()`

## 对象深度克隆实现思路

+ 若参数是数组`Array`
+ 若参数是对象`Object`
+ 若参数非数组非对象，正常赋值

## Demo
```javascript
// if Array
if (Obj instanceof Array) {
  // dosomething for Array Obj
}
// if Object and Obj is not a function
if (Obj instanceof Object && typeof Obj !== 'function') {
  // dosomething for Object Obj
}
// else
else {
  // dosomething for other
}
```

## 注意事项

这里需要注意的事项还是基于传递过来的参数判定，我们都知道`function` 也是 `Object`的一类，所以此处一定需要进行一次`typeof`。大家可以先试一下去掉typeof这一层判定，那么当参数Obj为`function`的时候，他会直接进入`Object`的逻辑判定里面，这样便不能实现一个`deep clone`了！
