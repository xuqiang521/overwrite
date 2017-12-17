# unique 数组去重

>overwrite `unique()`

## 关于数组去重

其实这个话题还是非常常见的，这里我列举几个数组去重的例子。
+ `ES6去重方法`

```javascript
let arr = [1, 1, 2, 3, '5', 3];
[...new Set(arr)];
// [1, 2, 3, "5"]
```

+ `对面字面量`
```javascript
function keyValueForArray(arr) {
  var obj = Object.create(null),
        i = 0,
      len = 0;
    if (Array.isArray(arr) && arr.length > 0) {
        len = arr.length;
        for (i = 0; i < len; i += 1) {
            obj[arr[i]] = arr[i];
        }
        return Object.values(obj);
    }
    return [];
}
let arr = [1, 1, 2, 3, '5', 3];
keyValueForArray(arr);
// [1, 2, 3, "5"]
```

+  `Array.from搭配Set` : Array.from方法可以将 Set 结构转为数组。
Array.from

```javascript
let arr = [1, 1, 2, 3, '5', 3];
arr = Array.from(new Set(arr))
// [1, 2, 3, "5"]
```

其实还有很多很多方法，除了这里提到的几种，我还会重写一个去重方法到`Array.prototype`上去。

## 思路

- 重写遍历方法indexOf
- 数组元素判定去重

## 总结

多看看一些常用方法，自己多写点，总归是有好处的
