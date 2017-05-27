## overwrite

```bash
# help
make help

# 安装依赖
make install

# 安装淘宝镜像
make install-cn

# es6 => es5 webpack打包
make build-es6

# 创建新重写方法 生成对应文件
make new <overwrite-name> [重写名]

# 本地服务
make dev

```
本地没全局安装http-server请执行
```bash
# 本地简单服务
npm install -g http-server
```

热更新服务请执行
```bash
# 默认路径为项目根目录的 src目录  如需调整请自行修改 webpack.config.js
make dev
```

打包
```bash
# 默认打包 es6 => es5  with webpack
make build-es6
# 如果有特殊需求 请自行修改package.json
```


配置
+ [`webpack.config.js`](https://github.com/xuqiang521/overwrite/blob/master/webpack.config.js)

+ [`package.json`](https://github.com/xuqiang521/overwrite/blob/master/package.json)

## 写在开篇的话

此项目，将长期更新，会陆续讲解一些常用方法的`overwrite`，欢迎各位`star`。由于项目本身没有很复杂的结构，所以这边本地服务目前只用了`http-server`和基础的`webpack-dev-server`服务，后期会不断进行完善。


## 个人博客

[开源中国](https://my.oschina.net/qiangdada)

[知乎](https://www.zhihu.com/people/qiangdada520/activities)
