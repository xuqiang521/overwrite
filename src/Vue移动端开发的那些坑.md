### 1. IOS移动端 原始输入法问题

IOS原始输入法，中文输入时，无法触发keyup事件，而keyup时对应的enter事件也无法触发

解决方案： 

1. 将keyup监听替换成值的watch
2. 让使用者安装三方输入法，比如搜狗输入法（不太现实）

### 2. IOS移动端click事件300ms的延迟响应

移动设备上的web网页是有300ms延迟的，玩玩会造成按钮点击延迟甚至是点击失效。这是由于区分单击事件和双击屏幕缩放的历史原因造成的,

2007年苹果发布首款iphone上IOS系统搭载的safari为了将适用于PC端上大屏幕的网页能比较好的展示在手机端上，使用了双击缩放(double tap to zoom)的方案，比如你在手机上用浏览器打开一个PC上的网页，你可能在看到页面内容虽然可以撑满整个屏幕，但是字体、图片都很小看不清，此时可以快速双击屏幕上的某一部分，你就能看清该部分放大后的内容，再次双击后能回到原始状态。

双击缩放是指用手指在屏幕上快速点击两次，iOS 自带的 Safari 浏览器会将网页缩放至原始比例。

原因就出在浏览器需要如何判断快速点击上，当用户在屏幕上单击某一个元素时候，例如跳转链接，此处浏览器会先捕获该次单击，但浏览器不能决定用户是单纯要点击链接还是要双击该部分区域进行缩放操作，所以，捕获第一次单击后，浏览器会先Hold一段时间t，如果在t时间区间里用户未进行下一次点击，则浏览器会做单击跳转链接的处理，如果t时间里用户进行了第二次单击操作，则浏览器会禁止跳转，转而进行对该部分区域页面的缩放操作。那么这个时间区间t有多少呢？在IOS safari下，大概为300毫秒。这就是延迟的由来。造成的后果用户纯粹单击页面，页面需要过一段时间才响应，给用户慢体验感觉，对于web开发者来说是，页面js捕获click事件的回调函数处理，需要300ms后才生效，也就间接导致影响其他业务逻辑的处理。

解决方案：

- fastclick可以解决在手机上点击事件的300ms延迟
- zepto的touch模块，tap事件也是为了解决在click的延迟问题
- 触摸事件的响应顺序为 touchstart --> touchmove --> touchend --> click,也可以通过绑定ontouchstart事件，加快对事件的响应，解决300ms延迟问题

### 3. 一些情况下对非可点击元素如(label,span)监听click事件，ios下不会触发，css增加cursor:pointer就搞定了。

### 4. 移动端input元素聚焦问题

问题出现场景重现： 项目需要写一个搜索组件，相关代码如下

```html
<template>
  <div class="y-search" :style="styles" :clear="clear">
    <form action="#" onsubmit="return false;">
      <input type="search"
        class="y-search-input"
        v-model='model'
        :placeholder="placeholder"
        @input="searchKeyupFn"
        @keyup.enter="searchEnterFn"
        @foucs="searchFocusFn"
        @blur="searchBlurFn"
      />
      <y-icons class="search-icon" name="search" size="14"></y-icons>
    </form>
    <div v-if="showClose" @click="closeFn">
      <y-icons class="close-icon" name='close' size='12'></y-icons>
    </div>
  </div>
</template>
```
当我进行keyup事件的时候，其对应的enter事件，不能实现失焦功能。而实际项目中需要实现失焦，那么只能通过操作$el节点了。

解决方案：在对应的enter事件时进行DOM操作

```javascript
searchEnterFn (e) {
  document.getElementsByClassName('y-search-input')[0].blur()
  // dosomething yourself
}
```

### 5. fixed定位缺陷

ios下fixed元素容易定位出错，软键盘弹出时，影响fixed元素定位
android下fixed表现要比iOS更好，软键盘弹出时，不会影响fixed元素定位
ios4下不支持position:fixed
解决方案： 可用iScroll插件解决这个问题

### 6. 阻止旋转屏幕时自动调整字体大小

```css
* {
  -webkit-text-size-adjust: none;
}
```

### 7. calc的兼容处理

CSS3中的calc变量在iOS6浏览器中必须加-webkit-前缀，目前的FF浏览器已经无需-moz-前缀。
Android浏览器目前仍然不支持calc，所以要在之前增加一个保守尺寸：

```css
div { 
  width: 95%; 
  width: -webkit-calc(100% - 50px); 
  width: calc(100% - 50px); 
}
```

### 8. 在移动端修改难看的点击的高亮效果，iOS和安卓下都有效

```css
* {
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
```
不过这个方法在现在的安卓浏览器下，只能去掉那个橙色的背景色，点击产生的高亮边框还是没有去掉，有待解决！

一个CSS3的属性，加上后，所关联的元素的事件监听都会失效，等于让元素变得“看得见，点不着”。IE到11才开始支持，其他浏览器的当前版本基本都支持。详细介绍见这里：[https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events](https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events)

```css
pointer-events: none;
```

### 9. IOS下取消input在输入的时候英文首字母的默认大写

```html
<input type="text" autocapitalize="none">
```

### 10. 禁止 IOS 弹出各种操作窗口

```css
-webkit-touch-callout: none;
```

### 11. 消除transition闪屏问题

```css
/*设置内嵌的元素在 3D 空间如何呈现：保留 3D*/
-webkit-transform-style: preserve-3d;
/*(设置进行转换的元素的背面在面对用户时是否可见：隐藏)*/ 
-webkit-backface-visibility: hidden; 
```

### 12. IOS系统中文输入法输入英文时，字母之间可能会出现一个六分之一的空格

解决方案：通过正则去除

```javascript
this.value = this.value.replace(/\u2006/g, '');
```

### 13. 禁止IOS和Android用户选中文字

```css
-webkit-user-select: none;
```

### 14. CSS动画页面闪白,动画卡顿

解决方法:
1.尽可能地使用合成属性transform和opacity来设计CSS3动画，不使用position的left和top来定位
2.开启硬件加速

```css
-webkit-transform: translate3d(0, 0, 0);
   -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
```

### 15. input的placeholder会出现文本位置偏上的情况

input 的placeholder会出现文本位置偏上的情况：PC端设置line-height等于height能够对齐，而移动端仍然是偏上，解决是设置line-height：normal

### 16. 往返缓存问题

点击浏览器的回退，有时候不会自动执行js，特别是在mobilesafari中。这与往返缓存(bfcache)有关系。

解决方法 ：
```javascript
window.onunload = function(){};
```

### 17. 微信端安卓手机window.location.reload()缓存问题

安卓的微信浏览器中reoad后请求的一直是第一次打开页面时请求的数据，请求被缓存

解决方法：
```javascript
window.location.href = "window.location.href + 随机数" // 一定要加随机数，不然没啥用
```

只针对微信浏览器作此设置
```javascript
// true为微信浏览器，false则不是
const IS_WEIXIN = window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) === 'micromessenger'
```

