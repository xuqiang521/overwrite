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

## overwrite 进展

- [x] [数组去重](https://github.com/xuqiang521/overwrite/tree/master/src/my-unique)
- [x] [深复制](https://github.com/xuqiang521/overwrite/tree/master/src/my-clone)
- [x] [观察者模式](https://github.com/xuqiang521/overwrite/tree/master/src/my-observer)
- [x] [Promise](https://github.com/xuqiang521/overwrite/tree/master/src/my-promise)
- [x] [MVVM](https://github.com/xuqiang521/overwrite/tree/master/src/my-mvvm)
- [x] [Ajax](https://github.com/xuqiang521/overwrite/tree/master/src/my-ajax)
- [x] [Object.assign](https://github.com/xuqiang521/overwrite/tree/master/src/my-assign)
- [x] [bind](https://github.com/xuqiang521/overwrite/tree/master/src/my-bind)
- [x] [drag](https://github.com/xuqiang521/overwrite/tree/master/src/my-drag)
- [x] [setTimeout](https://github.com/xuqiang521/overwrite/tree/master/src/my-setTimeout)
- [x] [函数节流与函数防抖](https://github.com/xuqiang521/overwrite/tree/master/src/my-debounceThrottle)
- [x] [Virtual Dom && diff](https://github.com/xuqiang521/overwrite/tree/master/src/my-virtual-dom)
- [x] [copy 复制粘贴](https://github.com/xuqiang521/overwrite/tree/master/src/my-copy)


## blog

- [x] [从指向看JavaScript](https://zhuanlan.zhihu.com/p/28058983)
- [x] [vue移动端开发踩过的一些坑](https://zhuanlan.zhihu.com/p/30419351)
- [x] [造一个属于自己的 UI 库](https://zhuanlan.zhihu.com/p/32030232)
- [x] [揭秘组件库一二事](https://xuqiang521.github.io/2018/03/揭秘组件库一二事/)
- [x] [初探 Nuxt.js 秘密花园](https://xuqiang521.github.io/2018/2018/04/初探-Nuxt.js-秘密花园/)
- [x] [TypeScript + 大型项目实战](https://zhuanlan.zhihu.com/p/40322215)
- [x] [细谈 vue 核心 - vdom 篇](https://zhuanlan.zhihu.com/p/61766666)
- [x] [细谈 vue - slot 篇](https://zhuanlan.zhihu.com/p/64750738)
- [x] [细谈 vue - transition 篇](https://zhuanlan.zhihu.com/p/67845420)
- [x] [细谈 vue - transition-group 篇](https://zhuanlan.zhihu.com/p/68184865)
- [x] [细谈 vue - 抽象组件实战篇](https://zhuanlan.zhihu.com/p/68416037)
- [x] [5分钟谈前端面试](https://juejin.im/post/5d04fc1c51882559ef78e88f)


## 社区

[知乎](https://www.zhihu.com/people/qiangdada520/activities)

[掘金](https://juejin.im/user/582e663467f3560063395f4c)

[开源中国](https://my.oschina.net/qiangdada)

[个人博客](https://xuqiang521.github.io/)


## 其他开源项目

[Brickies/vui: A personal Vue UI component library](https://github.com/Brickies/vui)

[Brickies/vue-template: 一个自定义的 vue-cli 模板](https://github.com/Brickies/vue-template)

[nuxt-ssr-demo: 一个基于 Nuxt 的服务器端渲染 Demo](https://github.com/xuqiang521/nuxt-ssr-demo)

[xuejs: A simple MVVM Library](https://github.com/xuqiang521/xuejs)

