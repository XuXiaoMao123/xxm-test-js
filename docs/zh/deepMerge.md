# 深度合并函数（Deep Merge）

## 概述

`deepMerge` 函数用于递归合并两个对象。它能够深度合并嵌套的对象结构，并保持类型安全。该函数不会修改原始对象，而是返回一个新的合并后的对象。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
/**
 * 递归合并两个对象。
 *
 * @param target - 目标对象，作为合并的基础。
 * @param source - 源对象，其属性将合并到目标对象中。
 * @returns 返回一个新的合并后的对象。
 */
function deepMerge<T extends Record<string, any>, U extends Record<string, any>>(
  target: T,
  source: U
): T & U;
```

## 参数

- `target`: 目标对象，作为合并的基础。
- `source`: 源对象，其属性将合并到目标对象中。

## 返回值

- 返回一个新的对象，类型为 `T & U`（目标对象和源对象的类型交集）。

## 示例用法

```js
// 基本用法
const obj1 = {
  a: 1,
  b: {
    c: 2,
  },
};

const obj2 = {
  b: {
    d: 3,
  },
  e: 4,
};

const result = deepMerge(obj1, obj2);
console.log(result); // 输出: { a: 1, b: { c: 2, d: 3 }, e: 4 }

// 合并多个对象
const config1 = {
  database: {
    host: 'localhost',
    port: 5432,
    options: {
      ssl: true,
    },
  },
};

const config2 = {
  database: {
    port: 3306,
    options: {
      timeout: 5000,
    },
  },
};

const mergedConfig = deepMerge(config1, config2);
console.log(mergedConfig);
// 输出: {
//   database: {
//     host: 'localhost',
//     port: 3306,
//     options: {
//       ssl: true,
//       timeout: 5000
//     }
//   }
// }
```

## 适用场景

- 合并配置对象
- 合并状态对象
- 深度更新对象属性
- 合并 API 响应数据
- 合并用户设置和默认设置

## 注意事项

1. 该函数不会合并数组，数组会被源对象的值覆盖
2. 如果源对象的属性值为 `undefined`，该属性不会被合并
3. 函数会跳过 `null` 值的合并
4. 对于大型对象，合并操作可能会影响性能

## 总结

- 深度合并函数是一个强大的工具函数，它可以帮助我们在不修改原始对象的情况下，将多个对象的属性合并到一个新的对象中。这在处理配置、状态管理等场景中特别有用。

## 引入

要在使用的项目中使用 `deepMerge` 函数，您可以单独引入：

```js
import { deepMerge } from 'xxm-test-js';
```

## 贡献

希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。
