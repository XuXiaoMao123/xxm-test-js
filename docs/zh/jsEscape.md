# 将字符串进行 JS 转义（JS Escape）

## 概述

`jsEscape` 函数用于将字符串进行 JS 转义。该函数接受一个字符串作为参数，返回转义后的字符串。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
/**
 * 将字符串进行 JS 转义
 * @param {string | null | undefined} str - 要转义的字符串，可为 null 或 undefined
 * @returns {string} 转义后的字符串
 */
export function jsEscape(str: string | null | undefined): string;
```

## 参数

- `str`: 类型为 `string | null | undefined`，要转义的字符串，可为 null 或 undefined。

## 返回值

- 返回一个 `string` 类型的值，表示转义后的字符串。

## 示例用法

```typescript
// 示例使用
const escapedStr = jsEscape('Hello " World ' Example');
console.log('转义后的字符串为：', escapedStr);
// 输出: 转义后的字符串为： Hello \" World \' Example
```

## 适用场景

- 防止 JS 注入攻击：在需要将用户输入的内容嵌入到 JS 代码中时，使用该函数可以防止 JS 注入攻击。
- 生成 JS 代码：在生成 JS 代码时，使用该函数可以确保特殊字符被正确转义，避免代码出错。

## 总结

- `jsEscape` 提供了一种简单的方法来将字符串进行 JS 转义。

## 引入

要在使用的项目中使用 `jsEscape` 函数，您可以单独引入：

```js
import { jsEscape } from 'xxm-test-js';
```

## 贡献

希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。
