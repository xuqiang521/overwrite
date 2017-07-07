# virtual-dom

  >overwrite virtualdom() simple virtual dom

## 进展

- [x] Element (VDOM)
- [x] utils 方法集合
- [x] O(n^3) => O(n) diff算法
- [x] O(m*n) => O(max(m,n)) list diff 算法
- [x] patch方法，将不同的virtual dom比较并转为真实节点

## 图解

`Element`

![](https://static.oschina.net/uploads/space/2017/0615/172520_IstJ_2912341.png)

`diff`

![](https://static.oschina.net/uploads/space/2017/0615/195650_NBDZ_2912341.png)

`list-diff`

![](https://static.oschina.net/uploads/space/2017/0616/195723_XlhA_2912341.png)

## 详细解析

[合格前端系列第五弹-Virtual Dom && Diff](https://zhuanlan.zhihu.com/p/27437595)

[虚拟 DOM 内部是如何工作的](http://www.zcfy.cc/article/the-inner-workings-of-virtual-dom-rajaraodv-medium-3248.html)
