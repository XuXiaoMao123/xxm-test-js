# 清理数组中的假值（Clean Array）

## 概述

`cleanArray` 函数用于清理给定数组中的所有假值（`falsy values`），返回一个仅包含真值（`truthy values`）的一维数组。该函数可以帮助开发者过滤掉那些在布尔上下文中被视为 `false` 的元素，如 0, `false`, `null`, `undefined`, `NaN` 等。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
/**
 * 清理数组中的假值，返回仅含真值的一维数组。
 *
 * @param arr - 需要清理的数组。
 * @returns 清理后的一维数组，只包含真值元素。
 */
function cleanArray(arr: any[]): any[];
```

## 参数

- `arr`: 需要进行清理的数组，可以包含任何类型的元素。

## 返回值

- 返回一个新的数组，这个数组是原数组的一个子集，其中只保留了那些被认为是真值的元素。

## 示例用法

```js
// 使用示例
const mixedArray = [0, 1, false, 'text', null, undefined, [], {}, NaN, 42];
const cleanedArray = cleanArray(mixedArray);
console.log(cleanedArray); // 输出: [1, 'text', [], {}, 42]
```

## 适用场景

- 数据净化：当需要从数组中移除所有假值，以确保后续处理的数据都是有效的真值时。
- 表单验证：在用户输入数据之后，可能需要清除未填写或无效的字段。

## 总结

- `cleanArray` 是一个简洁而强大的工具，它可以快速地帮助开发者去除数组中的假值，使得最终得到的数组只包含有意义的数据，这对于提高代码的健壮性和数据处理效率非常有帮助。

## 引入

要在使用的项目中使用 `cleanArray` 函数，您可以单独引入：

```js
import { cleanArray } from 'xxm-test-js';
```

## 贡献

希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。
