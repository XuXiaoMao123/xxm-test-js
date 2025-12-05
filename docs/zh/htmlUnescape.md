# 将经过 HTML 转义的字符串进行反转义（HTML Unescape）

## 概述

`htmlUnescape` 函数用于将经过 HTML 转义的字符串进行反转义。该函数接受一个字符串作为参数，返回反转义后的字符串。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
/**
 * 将经过 HTML 转义的字符串进行反转义
 * @param {string | null | undefined} str - 要反转义的字符串，可为 null 或 undefined
 * @returns {string} 反转义后的字符串
 */
export function htmlUnescape(str: string | null | undefined): string;
```

## 参数

- `str`: 类型为 `string | null | undefined`，要反转义的字符串，可为 null 或 undefined。

## 返回值

- 返回一个 `string` 类型的值，表示反转义后的字符串。

## 示例用法

```typescript
// 示例使用
const unescapedStr = htmlUnescape('&lt;div&gt;Hello, World!&lt;/div&gt;');
console.log('反转义后的字符串为：', unescapedStr);
// 反转义后的字符串为： <div>Hello, World!</div>
```

## 适用场景

- 处理 HTML 内容：在处理从 HTML 页面中提取的内容时，使用该函数可以将转义后的字符串还原为原始字符串。
- 解析 HTML 数据：在解析 HTML 数据时，使用该函数可以确保特殊字符被正确反转义，避免数据出错。

## 总结

- `htmlUnescape` 提供了一种简单的方法来将经过 HTML 转义的字符串进行反转义。

## 引入

要在使用的项目中使用 `htmlUnescape` 函数，您可以单独引入：

```js
import { htmlUnescape } from 'xxm-test-js';
```

## 贡献

希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。
