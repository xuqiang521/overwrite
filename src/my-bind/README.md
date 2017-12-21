# [myBind and softBind](https://github.com/xuqiang521/overwrite/tree/master/modules/my-bind)

  >overwrite bind() and softBind()

## Function.prototype.myBind(thisArg[, arg1[, arg2[, ...]]])

- `thisArg` 当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。当使用new 操作符调用绑定函数时，该参数无效
- `arg1, arg2, ...` 当绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法。

```javascript
function foo1 (something) {
  this.a = something
}

var obj_1 = {}
var bar = foo1.myBind(obj_1)
bar(2)
console.log(obj_1.a) // 2
var baz = new bar(3)
console.log(baz.a) // 3
console.log(obj_1.a) // 2
```

## Function.prototype.softBind(thisArg[, arg1[, arg2[, ...]]])

- `thisArg` 当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。如果this绑定到全局对象或者undefined上，那就把指定的默认对象绑定到this，否则不修改this
- `arg1, arg2, ...` 当绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法。

```javascript
function foo2 () {
  console.log('name: ' + this.name)
}
var obj1 = { name: 'obj1' }
var obj2 = { name: 'obj2' }
var obj3 = { name: 'obj3' }

var foo2Obj = foo2.softBind(obj1)
foo2Obj() // name: obj1

obj2.foo2 = foo2.softBind(obj1)
obj2.foo2() // name: obj2
foo2Obj.call(obj3) // name: obj3

setTimeout(obj2.foo2, 10) // name: obj1
// => 应用了软绑定(如果this绑定到全局对象或者undefined上，那就把指定的默认对象绑定到this，否则不修改this)
```