# 将字符串转换为数组（String To Array）

## 概述

`stringToArray` 函数将一个给定的字符串按照指定的分隔符分割成一个数组。此函数对于解析逗号分隔值(CSV)格式的数据、处理由特定符号分隔的文本信息等场景非常有用。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
/**
 * 将字符串转换为数组。
 *
 * @template T 分隔符的类型，必须是字符串或正则表达式。
 *
 * @param {string} str - 要转换的字符串。
 * @param {T} [separator=','] - 自定义分隔符，默认为 ','。
 * @returns {string[]} 转换后的字符串数组。
 */
export function stringToArray<T extends string | RegExp>(str: string, separator: T = ',' as T): string[];
```

## 参数
- `str`: 要转换的原始字符串。
- `separator`: 用于分割字符串的分隔符，默认值为逗号（,），可以是字符串或正则表达式。

## 返回值
- 返回一个字符串数组，该数组由原字符串根据`separator`参数指定的分隔符分割而成。


## 示例用法
```js
// 使用示例
try {
  const result = stringToArray('apple,banana,cherry');
  console.log(result); // 输出: ["apple", "banana", "cherry"]

  const resultWithSpace = stringToArray('one two three', ' ');
  console.log(resultWithSpace); // 输出: ["one", "two", "three"]

  const resultWithRegex = stringToArray('one-two-three', /-/);
  console.log(resultWithRegex); // 输出: ["one", "two", "three"]

  // 错误的使用示例
  const resultWithError = stringToArray([1, 2, 3] as any); // 将抛出 TypeError
} catch (error) {
  console.error(error);
}
```

## 适用场景
- 数据解析：当需要解析CSV格式或其他由特定符号分隔的数据时。
- 文本处理：在处理文本信息时，可能需要按照特定规则将文本拆分为多个部分。
- 用户界面：在构建用户界面时，可能需要将一段文本根据一定的逻辑拆分成多个元素显示。

## 总结
- `stringToArray` 是一个简单而灵活的工具，它允许开发者轻松地将字符串根据指定分隔符转换为数组，并支持字符串和正则表达式作为分隔符。这个函数在处理需要分割的字符串数据时非常有用。

## 引入
要在使用的项目中使用 `stringToArray` 函数，您可以单独引入：
```js
import { stringToArray } from 'xxm-test-js';
```

## 贡献
希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。


