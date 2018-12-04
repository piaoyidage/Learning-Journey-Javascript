# Event 发布订阅简单实现

实现一个发布订阅类 HugeEvent，其功能如下：

1. 触发一个事件

```js
HugeEvent.prototype.emit(type, ...args);
```

2. 添加监听事件

```js
HugeEvent.prototype.addListener(type, listener);
```

3. 移除事件监听

```js
HugeEvent.prototype.removeListener(type, listener);
```


```js
class HugeEvent {
    constructor() {
        this._event = new Map()
    }
}

/**
 * 触发事件
 */
HugeEvent.prototype.emit = function(type, ...args) {
    const handler = this._event.get(type)
    if (handler) {
        if (Array.isArray(handler)) {
            for (const fn of handler) {
                fn.apply(this, args)
            }
        } else {
            handler.apply(this, args)
        }
    }
    return this
}

/**
 * 监听事件
 */
HugeEvent.prototype.addListener = function(type, fn) {
    const handler = this._event.get(type)
    if (handler) {
        if (Array.isArray(handler)) {
            handler.push(fn)
        } else {
            this._event.set(type, [handler, fn])
        }
    } else {
        this._event.set(type, fn)
    }
    return this
}

/**
 * 移除事件
 */
HugeEvent.prototype.removeListener = function(type, fn) {
    const handler = this._event.get(type)
    if (handler) {
        if (Array.isArray(handler)) {
            // 查找 fn
            const idx = handler.findIndex(value => value === fn)
            if (idx !== -1) {
                handler.splice(idx, 1)
            }
            if (handler.length === 1) {
                this._event.set(type, handler[0])
            }
            if (handler.length === 0) {
                this._event.delete(type)
            }
        } else {
            this._event.delete(type)
        }
    }
    return this
};
```

## 参考

1. [github event](https://github.com/Gozala/events)