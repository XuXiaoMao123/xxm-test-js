# 滚动方向检测类（ScrollDirectionChecker）

## 概述

`ScrollDirectionChecker` 类用于检测页面滚动方向。

## 版权信息

版权所有 © 2024 xxm

## 类签名

````typescript
/**
 * 用于检测页面滚动方向的工具类。
 * 该类提供了一个静态方法来获取当前的滚动方向，不包含事件监听，需要时手动调用。
 *
 * @returns {'up' | 'down' | 'top' | 'bottom'} 当前的滚动方向，可能的值为 'up'（向上滚动）、'down'（向下滚动）、'top'（页面顶部）、'bottom'（页面底部）。
 * @example
 * ```javascript
 * const direction = ScrollDirectionChecker.getDirection();
 * console.log('当前滚动方向:', direction);
 * ```
 */
class ScrollDirectionChecker;
````

## 方法

### getDirection()

获取当前的滚动方向。

## 示例用法

```js
// 获取当前滚动方向
const direction = ScrollDirectionChecker.getDirection();
console.log('当前滚动方向:', direction);
```

## 适用场景

- 当需要根据页面滚动方向来执行某些操作时，如显示或隐藏导航栏、加载更多内容等。

## 总结

- `ScrollDirectionChecker` 类是一个方便的工具，它可以帮助我们检测页面的滚动方向，从而实现根据滚动方向执行相应操作的功能。

## 引入

- 要在使用的项目中使用 `ScrollDirectionChecker` 类，您可以单独引入：

```js
import { ScrollDirectionChecker } from 'xxm-test-js';
```

## 贡献

- 希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。
