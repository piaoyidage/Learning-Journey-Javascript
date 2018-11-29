# Proxy

## mvvm

在前端页面中，把 Model 用纯 JavaScript 对象表示，View 负责显示，把 Model 和 View 关联起来的就是 ViewModel。ViewModel 负责把 Model 的数据同步到 View 显示出来，还负责把 View 的修改同步回 Model。

![](https://ws4.sinaimg.cn/large/006tNbRwly1fxmq04lhv3j30ba07rmxf.jpg)

## 数据绑定

### 单向数据绑定

#### Proxy 实现简单单向数据绑定

[Proxy 单向数据绑定](./single.html)，效果如下：当在 console 里更改 proxyName.name 的值，DOM 随即更新。

![](https://ws3.sinaimg.cn/large/006tNbRwly1fxnwpxkji7g30ed0b9gnk.gif)


### 双向数据绑定

#### Proxy 实现简单双向数据绑定

[Proxy 双向数据绑定](./double.html)，效果如下：当 input 输入改变，DOM 随即更新，控制台里面直接更改 proxyName.name 的值，DOM 也随即更新。

![](https://ws2.sinaimg.cn/large/006tNbRwly1fxny4p0vbmg30jb066wjz.gif)

**双向绑定 = 单向绑定 + UI 事件监听**



## 参考
1. [Proxy mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
2. [6种ES6 proxies的使用案例](https://www.zcfy.cc/article/6-compelling-use-cases-for-es6-proxies-888.html6种ES6)
3. [阮一峰 Proxy](http://es6.ruanyifeng.com/#docs/proxy)
4. [廖雪峰 mvvm](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001475449022563a6591e6373324d1abd93e0e3fa04397f000)
5. [mvvm wiki](https://zh.wikipedia.org/wiki/MVVM)
6. [The MVVM Pattern](https://docs.microsoft.com/en-us/previous-versions/msp-n-p/hh848246(v=pandp.10))
7. [从单向到双向数据绑定](https://juejin.im/post/5ad1dfdc6fb9a028ba1fe9b2)

