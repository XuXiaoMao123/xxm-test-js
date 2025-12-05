# 滚动到容器底部（Scroll To Bottom）

## 概述

`scrollToBottom` 函数用于将指定容器滚动到底部。该函数特别适用于需要在页面中快速滚动到页面底部或指定元素底部的场景，例如在聊天窗口中自动滚动到最新消息。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
/**
 * 滚动到容器底部。
 * @param {HTMLElement | Window} [container=window] - 要滚动的容器，默认为window。
 * @param {ScrollToOptions} [options={ behavior: 'smooth' }] - 滚动选项。
 * @returns {Promise<void>} - 滚动完成的Promise。
 */
export function scrollToBottom(container: HTMLElement | Window = window, options: ScrollToOptions = { behavior: 'smooth' }): Promise<void>
```

## 参数

- `container`: 要滚动的容器，默认为 `window`。
- `options`: 滚动选项，默认为 `{ behavior: 'smooth' }`。

## 返回值

返回一个 `Promise`，当滚动完成时解析。

## 示例用法

```js
// 滚动到页面底部
scrollToBottom().then(() => {
  // 滚动完成后执行其他操作
  console.log('已滚动到页面底部');
});

// 滚动到指定元素的底部
const element = document.getElementById('myElement');
scrollToBottom(element).then(() => {
  // 滚动完成后显示提示信息
  alert('已滚动到指定元素底部');
});
```

## 适用场景

- 聊天窗口中自动滚动到最新消息。
- 页面中需要快速滚动到指定元素底部的场景。

## 总结

- `scrollToBottom` 是一个简单而实用的工具，它允许开发者轻松地将指定容器滚动到底部，并支持自定义滚动选项。这个函数在处理需要滚动到页面底部或指定元素底部的场景中非常有用。

## 引入

要在使用的项目中使用 `scrollToBottom` 函数，您可以单独引入：
```js
import { scrollToBottom } from 'xxm-test-js';
```

## 贡献

希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。