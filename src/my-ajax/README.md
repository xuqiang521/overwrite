# [ajax](https://github.com/xuqiang521/overwrite/tree/master/modules/my-ajax)

  >overwrite ajax() Ajax

## XHR用法

1. 使用XHR对象时，调用的第一个方法是open()，它接收三个参数
  - 要发送的请求的类型（get，post等）
  - 请求的url 
  - 是否异步发送请求（Boolean类型）

2. send()，接收一个参数，即要作为请求主体发送的数据。如果不需要通过请求主体发送数据，则必须传入null

3. 收到响应，响应的数据自动填充XHR对象的属性，相关属性如下
  - responseText：作为响应主体被返回的文本 
  - responseXML：如果响应内容类型是"text/xml"或"application/xml"，这个属性中将保存包含着响应数据的XML DOM文档
  - status：响应的HTTP状态
  - statusText：HTPP状态的说明

## 检查状态

```javascript
if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
  alert(xhr.responseText);
}
else {
  alert('Request was unsuccessful: ' + xhr.status);
}
```

## XHR对象readyState属性

- 0：未初始化。尚未调用open()方法。
- 1：启动。已经调用open()方法，但尚未调用send()方法。
- 2：发送。已经调用send()方法，但尚未接收到响应
- 3：接收。已经接收到部分响应数据
- 4：完成。已经接收到全部响应数据，而且已经在客户端使用

```javascript
var xhr = createXHR();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      alert(xhr.responseText);
    }
    else {
      alert('Request was unsuccessful: ' + xhr.status);
    }
  }
}
xhr.open('get', 'example.txt', true);
xhr.send(null);
```
xhr.abort()  => 取消异步请求，调用后，XHR对象会停止触发事件

## HTTP头部信息

每个HTTP请求和响应都会带有相应的头部信息，XHR对象也提供了操作这两种头部（即请求头部和响应头部）信息的方法

1. Accept：浏览器能够处理的类型。
2. Accept-Charset：浏览器能够显示的字符集。
3. Accept-Encoding：浏览器能够处理的压缩编码。
4. Accept-Language：浏览器当前设置的语言。
5. Connection：浏览器与服务器之间连接的类型。
6. Cookie：当前页面设置的任何Cookie。
7. Host：发出请求的页面所在的域。
8. Referer：发出请求的页面URI。
9. User-Agent：浏览器的用户代理字符串

使用setRequestHeader()方法可以设置自定义的请求头部消息。它接收两参数：头部字段的名称和头部字段的值。要成功发送请求头部信息，必须在open()方法之后send()方法之前

```javascript
var xhr = createXHR();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      alert(xhr.responseText);
    }
    else {
      alert('Request was unsuccessful: ' + xhr.status);
    }
  }
}
xhr.open('get', 'example.txt', true);

xhr.setRequestHeader('MyHeader', 'MyValue')

xhr.send(null);
```