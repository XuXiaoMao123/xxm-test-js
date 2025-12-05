# 将文本复制到剪贴板（Copy Text To Clipboard）

## 概述

`copyTextToClipboard` 函数用于将指定的文本复制到用户的剪贴板。该函数返回一个 Promise，表示复制操作是否成功完成。它首先尝试使用现代浏览器提供的 `navigator.clipboard.writeText` 方法来执行复制操作，如果该方法不可用，则会回退到传统的基于 `document.execCommand('copy')` 的方法。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
/**
 * 将文本复制到剪贴板。
 *
 * @param text - 要复制的文本。
 * @returns Promise，表示复制操作是否成功。
 */
export function copyTextToClipboard(text: string): Promise<void>;
```

## 参数

- `text`: 需要复制到剪贴板的字符串。

## 返回值

- 返回一个 `Promise` 对象，当复制操作成功时解析为 undefined，若失败则拒绝并提供错误信息。

## 示例用法

```js
// 使用示例
copyTextToClipboard('Hello, world!')
  .then(() => {
    console.log('Text copied successfully!');
  })
  .catch((error) => {
    console.error('Failed to copy text:', error);
  });
```

## 适用场景

- 用户交互：在用户界面中提供一键复制文本的功能，如复制链接、代码片段等。
- 自动化流程：在自动化脚本或工具中自动复制某些生成的数据到剪贴板。

## 总结

- `copyTextToClipboard` 提供了一种方便的方法来实现跨浏览器兼容的文本复制功能。它确保了即使在较旧的浏览器环境中也能顺利地将文本复制到剪贴板，这对于提升用户体验和便利性非常有用。

## 引入

要在使用的项目中使用 `copyTextToClipboard` 函数，您可以单独引入：

```js
import { copyTextToClipboard } from 'xxm-test-js';
```

## 贡献

希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。
