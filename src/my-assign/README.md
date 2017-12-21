# [assign](https://github.com/xuqiang521/overwrite/tree/master/modules/my-assign)

  >overwrite assign() assign

## Object.assign(target, ...sources)

- `target` 目标对象
- `sources` 源对象（可多个）
- `返回值` 目标对象

## 描述

如果目标对象中的属性具有相同的键，则属性将被源中的属性覆盖。后来的源的属性将类似地覆盖早先的属性。

## Demo

```javascript
// 复制一个object
var obj = { a: 1 };
var copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
```

## 深度copy？并不能实现

针对深度拷贝，需要使用其他方法，因为 Object.assign() 拷贝的是属性值。假如源对象的属性值是一个指向对象的引用，它也只拷贝那个引用值。

## More

[`Object.assign`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
