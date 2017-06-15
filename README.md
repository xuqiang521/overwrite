## overwrite

```bash
# help
make help

# 安装依赖
make install

# 安装淘宝镜像
make install-cn

# 脚本打包
make build

# 创建新重写方法 生成对应文件
make new <overwrite-name> [重写名]

# 删除重写方法 删掉对应文件
make del <overwrite-name>

# 本地服务(支持热更新)
make dev

# 静态服务(不支持热更新)
make http

```
本地没全局安装http-server请执行
```bash
# 本地简单服务
npm install -g http-server

# 进入项目目录
cd overwrite

# 开启服务(不支持热更新)
make http
```

配置

+ [`webpack.config.js`](https://github.com/xuqiang521/overwrite/blob/master/webpack.config.js)

+ [`package.json`](https://github.com/xuqiang521/overwrite/blob/master/package.json)

## 写在开篇的话

此项目，将长期更新，会陆续讲解一些常用方法的`overwrite`，欢迎各位`star`。由于项目本身没有很复杂的结构，所以这边本地服务目前只用了`http-server`和基础的`webpack-dev-server`服务，后期会不断进行完善。

## 进展

- [x] [数组去重](https://github.com/xuqiang521/overwrite/tree/master/my-unique)
- [x] [深复制](https://github.com/xuqiang521/overwrite/tree/master/my-clone)
- [x] [观察者模式](https://github.com/xuqiang521/overwrite/tree/master/my-observer)
- [x] [Promise](https://github.com/xuqiang521/overwrite/tree/master/my-promise)
- [x] [MVVM](https://github.com/xuqiang521/overwrite/tree/master/my-mvvm)
- [ ] Set
- [ ] Map
- [ ] Proxy
- [ ] Class
- [ ] 函数节流与函数防抖
- [x] [Virtual Dom && diff](https://github.com/xuqiang521/overwrite/tree/master/src/my-virtual-dom)


## 个人博客

[开源中国](https://my.oschina.net/qiangdada)

[知乎](https://www.zhihu.com/people/qiangdada520/activities)
