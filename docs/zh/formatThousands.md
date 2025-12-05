# 格式化数字函数（Format Thousands）

## 概述

`formatThousands` 函数用于将数字格式化，添加千分位分隔符，并保留指定的小数位数。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
/**
 * 格式化数字，添加千分位分隔符。
 *
 * @param {number} num - 需要格式化的数字。
 * @param {number} [decimalPlaces=2] - 保留的小数位数，默认为2位。
 * @returns {string} 返回格式化后的字符串，包含千分位分隔符。
 */
export declare function formatThousands(num: number, decimalPlaces?: number): string;
```

## 参数

- `num`: 需要格式化的数字。
- `decimalPlaces` (可选): 保留的小数位数，默认为 2 位。

## 返回值

- 返回格式化后的字符串，包含千分位分隔符。

## 示例用法

```js
console.log(formatThousands(1234567.891)); // 输出 "1,234,567.89"
console.log(formatThousands(1234567.891, 0)); // 输出 "1,234,568"
console.log(formatThousands(1234567.891, 3)); // 输出 "1,234,567.891"
```

## 适用场景

- 金融和会计：在需要显示格式化的货币金额时非常有用。
- 数据展示：在用户界面上展示格式化的数字，提高数据的可读性。

## 总结

格式化数字函数是一个实用的工具，它可以帮助我们将数字转换成更易读的格式，特别是在需要展示大量数据时，千分位分隔符能够使得数字更加清晰。

## 引入

- 要在使用的项目中使用 `formatThousands` 函数，您可以单独引入：

```js
import { formatThousands } from 'xxm-test-js';
```

## 贡献

- 希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。
