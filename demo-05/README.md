# 图片懒加载

**图片懒加载是指：未在可视区域的图片不加载，等到图片进入可是区域才开始加载。**

当页面的图片过多时，图片对页面加载的速度影响很大，通过懒加载，可以加快页面的加载速度，提高用户浏览体验。

## scrollTop/scrollHeight/clientHeight/offsetTop/offsetHeight

### clientHeight

包括 padding，但不包括 border、水平滚动条、margin 的元素的高度。对于 inline 的元素这个属性一直是0，单位 px，只读

### offsetHeight

包括 padding、border、水平滚动条，但不包括 margin 的元素的高度。对于 inline 的元素这个属性一直是0，单位 px，只读

### scrollHeight

包括 clientHeight 和 不可见区域的高度。scrollHeight >= clientHeight，只读

### scrollTop

有滚动条时，滚动条向下滚动的距离也就是元素顶部被遮住部分的高度。在没有滚动条时 scrollTop==0 恒成立。可读可设置。

### offsetTop

当前元素顶部距离父元素顶部的距离，和有没有滚动条没有关系。单位px，只读。 

## 原理

默认加载占位图片，当滚动到图片时，加载实际图片。

```js
// 判断图片进入可视区
item.offsetTop < clientHeight + scrollTop
```

## 优化

滚动事件触发频繁，影响页面性能，使用防抖技术优化。
