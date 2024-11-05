# 格式化日期时间函数（Handle Time）

## 概述

`handelTime` 函数用于将输入的日期时间值格式化为指定格式的字符串。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
/**
 * 格式化日期时间字符串。
 * 
 * @param {string | Date} cellValue - 输入的日期时间值，可以是字符串或 Date 对象。
 * @param {string} [format='yyyy-MM-dd'] - 期望的日期时间格式字符串，包含 'yyyy', 'MM', 'dd', 'HH', 'mm', 'ss' 等占位符。
 * @returns {string} - 格式化后的日期时间字符串。
 */
export declare function handelTime(cellValue: string | Date, format?: string): string;
```

## 参数

- `cellValue`: 输入的日期时间值，可以是字符串或 `Date` 对象。
- `format` (可选): 期望的日期时间格式字符串，默认为 'yyyy-MM-dd'。支持的占位符包括 'yyyy', 'MM', 'dd', 'HH', 'mm', 'ss' 等。

## 返回值

- 返回格式化后的日期时间字符串。

## 示例用法

```js
const time = new Date();
const formatTime1 = handelTime(time); // 使用默认格式
const formatTime2 = handelTime(time, 'yyyy-MM-dd'); // 指定格式
```

## 适用场景

- 日期时间显示：在用户界面上需要以特定格式显示日期时间。
- 数据处理：在处理和存储日期时间数据时，需要将其转换为统一的格式。

## 总结

- 格式化日期时间函数是一个实用的工具，它可以帮助我们将日期时间值转换为易于阅读和处理的字符串格式，满足不同的显示和存储需求。

## 安装

- 要在使用的项目中使用 handelTime 函数，您可以单独安装：
```js
import { handelTime } from 'xxm-test-js/dist/lib/handelTime.js';
```

## 贡献

- 希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。
