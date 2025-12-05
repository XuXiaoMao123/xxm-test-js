# 获取全屏元素方法（Get Fullscreen Element Method）

## 概述

`getFullscreenElement` 函数用于获取当前页面中处于全屏模式的元素。该函数会处理不同浏览器的兼容性问题，确保在主流浏览器中都能正确获取到全屏元素。它在需要根据全屏元素进行一些特定操作的场景中非常有用，例如在用户退出全屏时进行一些清理工作、判断某个元素是否处于全屏状态等。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
/**
 * 获取当前处于全屏模式的元素。
 *
 * @returns {HTMLElement | null} 如果有元素处于全屏模式，则返回该元素；否则返回 null。
 */
export function getFullscreenElement(): HTMLElement | null;
```

## 参数

- 该函数不接受任何参数。

## 返回值

- 如果有元素处于全屏模式，则返回该 HTMLElement 元素。
- 如果当前没有元素处于全屏模式，则返回 null。

## 示例用法

```js
const fullscreenElement = getFullscreenElement();
if (fullscreenElement) {
  console.log('当前全屏元素:', fullscreenElement);
} else {
  console.log('当前没有元素处于全屏模式');
}
```

## 适用场景

- 状态判断：在某些交互逻辑中，需要判断某个元素是否处于全屏状态，以便执行不同的操作，例如显示不同的按钮图标。
- 清理工作：当用户退出全屏时，可以根据获取到的全屏元素进行一些相关的清理工作，如重置样式、停止某些动画等。

## 总结

- `getFullscreenElement` 函数为开发者提供了一种简单而有效的方式来获取当前处于全屏模式的元素。通过处理浏览器兼容性，它在各种需要对全屏元素进行操作的场景中都能可靠地工作。无论是为了实现特定的交互逻辑还是进行资源清理，该函数都是一个实用的工具。

## 引入

要在使用的项目中使用 `getFullscreenElement` 函数，您可以单独引入：

```js
import { getFullscreenElement } from 'xxm-test-js';
```

## 贡献

希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。如果您发现文档或函数实现有任何错误、不足，欢迎提交反馈或贡献代码以改进它。
