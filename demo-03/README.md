# 深克隆实现

深克隆对应的是浅克隆，深浅克隆一般都是针对**引用类型**来说的。

## 浅克隆

对象只会被克隆最外部的一层，至于更深层的对象，则依然是通过引用指向同一块堆内存。

```js
// 常见的浅克隆实现
function shallowClone(o) {
    const obj = {}
    for (const prop in o) {
        if (o.hasOwnProperty(prop)) {
            obj[prop] = o[prop]
        }
    }
    return obj
}

// 使用
const p1 = {
    age: 26,
    info: {
        cardId: 1111,
    },
}

const p2 = shallowClone(p1)
p2.age = 28
p2.info.cardId = 1212

console.log(p1.age === p2.age) // false
console.log(p1.info.cardId === p2.info.cardId); // true

```

当更改 p2.info.cardId 的时候，p1.info.cardId 也随之改变，因为 p2.info 和 p1.info 通过引用指向的是同一块堆内存。

**显而易见浅克隆不知不觉间更改了其他对象的值，不能够保证独立性，产生的副作用，可能会导致程序莫名其妙的问题。**


## 深克隆

### JSON.parse/JSON.stringify

坊间流传借助 JSON.parse 和 JSON.stringify 可以方便快捷实现深克隆。

```js
const p1 = {
    age: 26,
    info: {
        cardId: 1111,
    },
}

const p2 = JSON.parse(JSON.stringify(p1))
p2.age = 28
p2.info.cardId = 1212

console.log(p1.age === p2.age) // false
console.log(p1.info.cardId === p2.info.cardId); // false
```

从表现上来看，好像实现了深克隆，但是有没有问题呢？

```js
function Person(name) {
    this.name = name
}

function hi() {
    console.log('hi')
}

const James = new Person('James')

const obj1 = {
    a: hi,
    b: new Array(1),
    c: new RegExp('abc'),
    d: James,
}

const obj2 = JSON.parse(JSON.stringify(obj1))

console.log(obj1.a, obj2.a) // function hi vs undefined
console.log(obj1.b[0], obj2.b[0]) // empty vs null
console.log(obj1.c, obj2.c) // /abc/ vs {}
console.log(obj1.d.constructor.name, obj2.d.constructor.name); // Person vs Object
```

从上面可以看出，这种拷贝方式存在以下问题：

1. 不能复制函数
2. 稀疏数组复制错误
3. 不能复制正则对象
4. 改变了 constructor，复制后的对象的 constructor 被改成了 Object

此外，如果存在循环引用，这种方式会直接报错！

```js
const obj1 = {}
obj1.info = obj1
const obj2 = JSON.parse(JSON.stringify(obj1)); // Uncaught TypeError: Converting circular structure to JSON at JSON.stringify (<anonymous>)
```


### 简单实现深克隆

整体思路很简单：针对不同类型，进行不同的拷贝

```js
const isType = (obj, type) => Object.prototype.toString.call(obj) === `[object ${type}]`

const isArray = obj => isType(obj, 'Array')
const isRegExp = obj => isType(obj, 'RegExp')
const isDate = obj => isType(obj, 'Date')
// isMap/isSet...

const getFlags = re => {
    let flags = ''
    if (re.global) {
        flags += 'g'
    }
    if (re.ignoreCase) {
        flags += 'i'
    }
    if (re.multiline) {
        flags += 'm'
    }
    return flags
}

const cloneDeep = obj => {
    let cloneObj
    // 非引用类型直接返回
    if (typeof obj !== 'object') {
        return obj
    }

    if (obj === null) {
        return null
    }

    if (isArray(obj)) {
        cloneObj = []
    } else if (isRegExp(obj)) {
        cloneObj = new RegExp(obj.source, getFlags(obj))
    } else if (isDate(obj)) {
        cloneObj = new Date(obj.getTime())
    } else {
        // 主动去设置原型
        cloneObj = Object.create(Object.getPrototypeOf(obj))
    }

    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            cloneObj[prop] = cloneDeep(obj[prop])
        }
    }

    return cloneObj
}

// 测试

function Person(name) {
    this.name = name
}

function hi() {
    console.log('hi')
}

const James = new Person('James')

const obj1 = {
    a: hi,
    b: new Array(1),
    c: new RegExp('abc', 'i'),
    d: James,
    e: {
        name: 'obj1',
    }
}

const obj2 = cloneDeep(obj1)

console.log(obj1.a, obj2.a) // [Function: hi] vs [Function: hi]
console.log(obj1.b[0], obj2.b[0]) // undefined vs undefined
console.log(obj1.c, obj2.c) ///abc/i vs /abc/i
console.log(obj1.d.constructor.name, obj2.d.constructor.name) // Person vs Person

obj2.e.name = 'obj2'
console.log(obj1.e.name, obj2.e.name); // obj1 vs obj2

```

**进一步对循环引用处理**

```js
const isType = (obj, type) => Object.prototype.toString.call(obj) === `[object ${type}]`

const isArray = obj => isType(obj, 'Array')
const isRegExp = obj => isType(obj, 'RegExp')
const isDate = obj => isType(obj, 'Date')
// isMap/isSet...

const getFlags = re => {
    let flags = ''
    if (re.global) {
        flags += 'g'
    }
    if (re.ignoreCase) {
        flags += 'i'
    }
    if (re.multiline) {
        flags += 'm'
    }
    return flags
}

const cloneDeep = obj => {
    const objRefs = []
    const _cloneDeep = obj => {
        let cloneObj
        // 非引用类型直接返回
        if (typeof obj !== 'object') {
            return obj
        }

        if (obj === null) {
            return null
        }

        if (isArray(obj)) {
            cloneObj = []
        } else if (isRegExp(obj)) {
            cloneObj = new RegExp(obj.source, getFlags(obj))
        } else if (isDate(obj)) {
            cloneObj = new Date(obj.getTime())
        } else {
            // 主动去设置原型
            cloneObj = Object.create(Object.getPrototypeOf(obj))
        }

        if (objRefs.indexOf(obj) !== -1) {
            return obj
        }

        objRefs.push(obj)

        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                cloneObj[prop] = _cloneDeep(obj[prop])
            }
        }

        return cloneObj
    }
    
    return _cloneDeep(obj)
}

const obj1 = {
    name: 'zhangsan',
}
obj1.info = obj1

const obj2 = cloneDeep(obj1)

console.log(obj1, obj2);
```


**当然上面的实现还远远谈不上完美，还有很多地方需要去完善，例如对Map、Set 等的支持**

**生产环境推荐使用 lodash 的 cloneDeep**


## 参考

1. [面试官:请你实现一个深克隆](https://juejin.im/post/5abb55ee6fb9a028e33b7e0a)
2. [lodash](https://github.com/lodash/lodash)
