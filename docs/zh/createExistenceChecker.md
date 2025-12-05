# 创建存在性检查函数（Create Existence Checker）

## 概述

`createExistenceChecker` 函数用于创建一个闭包函数，该闭包函数可以检查给定值是否存在于预定义的字符串列表中。此功能对于需要快速验证某个值是否属于特定集合的场景非常有用，例如关键词过滤、选项验证或权限控制等。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
/**
 * 创建一个存在性检查函数。
 *
 * @param {string} str - 逗号分隔的字符串，表示要包含在映射中的关键字或值。
 * @param {boolean} [expectsLowerCase=false] - 指示映射的键是否应该被转换为小写。
 * @returns {MakeMapFunction} - 返回一个闭包函数，该函数接收一个字符串并返回布尔值，指示该字符串是否存在于映射中。
 */
export function createExistenceChecker(str: string, expectsLowerCase?: boolean): MakeMapFunction;
```

## 类型定义

```typescript
type MakeMapFunction = (val?: string) => boolean;
```

## 参数

- `str`: 逗号分隔的字符串，表示要包含在映射中的关键字或值。
- `expectsLowerCase` (可选): 布尔值，指示映射的键是否应该被转换为小写，默认为 `false`。

## 返回值

- 返回一个闭包函数，该函数接收一个字符串参数 `val` 并返回一个布尔值，指示该字符串是否存在于映射中。如果 `val` 是 `undefined` 或 `null`，则返回 `false`。

## 示例用法

```js
// 使用示例：大小写敏感的存在性检查函数
const checkKeywords = createExistenceChecker('html,css,javascript');
console.log(checkKeywords('HTML')); // 输出: false
console.log(checkKeywords('css')); // 输出: true

// 使用示例：大小写不敏感的存在性检查函数
const checkKeywordsIgnoreCase = createExistenceChecker('html,css,javascript', true);
console.log(checkKeywordsIgnoreCase('HTML')); // 输出: true
console.log(checkKeywordsIgnoreCase('CSS')); // 输出: true
```

## 适用场景

- 关键词过滤：限制用户输入只能是预定义的一组关键词。
- 选项验证：确保传入的状态或选项是有效的。
- 权限控制：检查用户是否有特定的权限标记。
- 事件处理：对特定类型的事件作出响应。
- 属性白名单/黑名单：限定允许的属性名称。
- 解析和转换：匹配并转换特定字段的内容。
- 语言或区域设置：确认语言代码或地区代码的有效性。
- API 路由匹配：匹配请求路径与已知的 API 端点。

## 总结

- `createExistenceChecker` 是一个强大且灵活的工具，它允许开发者轻松地创建一个用于验证值是否存在于预定义列表中的闭包函数，并支持大小写敏感或不敏感的选择。这个函数在需要高效查找预定义值列表的场景中非常有用。

## 引入

要在使用的项目中使用 `createExistenceChecker` 函数，您可以单独引入：

```js
import { createExistenceChecker } from 'xxm-test-js';
```

## 贡献

希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。
