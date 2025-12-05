# 滚动到容器顶部（Scroll To Top）

## 概述

`scrollToTop` 函数用于将指定容器滚动到顶部。该函数特别适用于需要在页面中快速回到顶部或指定元素顶部的场景，例如在长页面中提供一个返回顶部的按钮，点击后调用该函数实现平滑滚动到顶部的效果。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
/**
 * 滚动到容器顶部。
 * @param {HTMLElement | Window} [container=window] - 要滚动的容器，默认为window。
 * @param {ScrollToOptions} [options={ top: 0, behavior: 'smooth' }] - 滚动选项。
 * @returns {Promise<void>} - 滚动完成的Promise。
 */
export function scrollToTop(
  container: HTMLElement | Window = window,
  options: ScrollToOptions = { top: 0, behavior: 'smooth' }
): Promise<void>;
```

## 参数

- `container`: 要滚动的容器，默认为 `window`。
- `options`: 滚动选项，默认为 `{ top: 0, behavior: 'smooth' }`。

## 返回值

返回一个 `Promise`，当滚动完成时解析。

## 示例用法

```js
// 滚动到页面顶部
scrollToTop().then(() => {
  // 滚动完成后隐藏滚动按钮
  const scrollButton = document.getElementById('scrollButton');
  if (scrollButton) {
    scrollButton.style.display = 'none';
  }
});

// 滚动到指定元素的顶部
const element = document.getElementById('myElement');
scrollToTop(element).then(() => {
  // 滚动完成后显示提示信息
  alert('已滚动到指定元素顶部');
});
```

## 适用场景

- 长页面中提供返回顶部的功能。
- 页面中需要快速滚动到指定元素顶部的场景。

## 总结

- `scrollToTop` 是一个简单而实用的工具，它允许开发者轻松地将指定容器滚动到顶部，并支持自定义滚动选项。这个函数在处理长页面或需要快速滚动到顶部的场景中非常有用。

## 引入

要在使用的项目中使用 `scrollToTop` 函数，您可以单独引入：

```js
import { scrollToTop } from 'xxm-test-js';
```

## 贡献

希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。
