# [drag](https://github.com/xuqiang521/overwrite/tree/master/modules/my-drag)

  >overwrite drag() simple drag library



## 设计思路

### getCss(el, styleName)

- `el` : DOM对象
- `styleName` : styleName，如`'left'`或者`'top'`

### drag(el)

- `el` ：DOM对象，该对象需要进行position绝对定位(static除外)
- 用法如下
```javascript
var el = document.getElementById('test');

drag(el);
```

### 基本实现

```javascript
# getCss()
var getCss = function(b, a) {
  return b.currentStyle ? b.currentStyle[a] : document.defaultView.getComputedStyle(b, false)[a]
};

# drag()
var drag = function(a) {
  a.onmousedown = function(c) {
    // todo something
  };
  document.onmouseup = function() {
    // todo something
  };
  document.onmousemove = function(h) {
    // todo something
  }
};
```

