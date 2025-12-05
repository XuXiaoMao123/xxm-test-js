# 数组去重函数（Unique Array）

## 概述

`uniqueArray` 函数是一个通用的数组去重工具，它可以对数组进行去重操作，支持基本类型（数字、字符串、布尔值等）和对象类型的数组去重。该函数还提供了灵活的比较方式，包括默认比较、基于对象属性名的比较和自定义比较函数。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
/**
 * 数组去重函数
 * 对数组进行去重操作，支持基本类型和对象类型
 * 
 * @template T - 数组元素的类型
 * @param {T[]} array - 需要去重的数组
 * @param {string|((a: T, b: T) => boolean)} [comparison] - 可选的比较参数
 *   - 如果是字符串，则作为对象的属性名进行比较
 *   - 如果是函数，则作为自定义比较函数
 * @returns {T[]} - 去重后的新数组
 */
export declare function uniqueArray<T>(
    array: T[], 
    comparison?: string | ((a: T, b: T) => boolean)
): T[];
```

## 参数

- `array`: 需要去重的数组。必须是一个有效的数组。
- `comparison` (可选): 比较参数，有两种类型：
  - 如果是字符串，则作为对象的属性名进行比较
  - 如果是函数，则作为自定义比较函数，接收两个参数，返回布尔值表示两个元素是否相同

## 返回值

- 返回去重后的新数组，不改变原数组。

## 示例用法

### 基本类型数组去重

```js
// 数字数组去重
const numbers = [1, 2, 2, 3, 4, 4, 5];
console.log(uniqueArray(numbers)); // 输出: [1, 2, 3, 4, 5]

// 字符串数组去重
const strings = ['a', 'b', 'a', 'c'];
console.log(uniqueArray(strings)); // 输出: ['a', 'b', 'c']

// 混合基本类型数组去重
const mixed = [1, '1', 1, 'a', 'a', true, false, true, null, null, undefined, undefined];
console.log(uniqueArray(mixed)); // 输出: [1, '1', 'a', true, false, null, undefined]

// NaN 值的特殊处理
const withNaN = [1, NaN, 2, NaN, 3];
console.log(uniqueArray(withNaN)); // 输出: [1, NaN, 2, 3]（只保留一个NaN）
```

### 对象数组去重 - 通过属性名

```js
// 通过对象的id属性去重
const users = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 1, name: '张三' }
];
console.log(uniqueArray(users, 'id')); 
// 输出: [{ id: 1, name: '张三' }, { id: 2, name: '李四' }]

// 通过对象的name属性去重
const products = [
  { id: 1, name: '苹果', price: 5 },
  { id: 2, name: '香蕉', price: 3 },
  { id: 3, name: '苹果', price: 6 }
];
console.log(uniqueArray(products, 'name'));
// 输出: [{ id: 1, name: '苹果', price: 5 }, { id: 2, name: '香蕉', price: 3 }]
```

### 对象数组去重 - 通过自定义比较函数

```js
// 通过自定义函数比较对象
const customCompare = (a, b) => a.name === b.name;
const users = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '张三' }
];
console.log(uniqueArray(users, customCompare));
// 输出: [{ id: 1, name: '张三' }, { id: 2, name: '李四' }]

// 复杂嵌套对象去重
const complexUsers = [
  { id: 1, profile: { age: 25, city: '北京' } },
  { id: 2, profile: { age: 30, city: '上海' } },
  { id: 3, profile: { age: 25, city: '北京' } }
];
const complexCompare = (a, b) => 
  a.profile.age === b.profile.age && a.profile.city === b.profile.city;
console.log(uniqueArray(complexUsers, complexCompare));
// 输出: [{ id: 1, profile: { age: 25, city: '北京' } }, { id: 2, profile: { age: 30, city: '上海' } }]
```

## 应用场景

- **数据处理**：在数据处理过程中，去除重复数据，确保数据的唯一性。
- **表单验证**：验证用户输入的数据是否与已有数据重复。
- **API 数据清洗**：处理从 API 获取的数据，去除重复项。
- **统计分析**：在数据统计分析前，确保数据的准确性和唯一性。
- **前端展示**：优化前端数据展示，避免重复内容的显示。

## 注意事项

- 函数不会修改原始数组，而是返回一个新的去重后的数组。
- 如果传入的第一个参数不是数组，函数会抛出错误。
- 对于对象类型的数组，默认比较方式可能无法正确工作，建议使用属性名或自定义比较函数。
- NaN 值在 JavaScript 中是特殊的，`NaN !== NaN`，但 `uniqueArray` 函数会特殊处理，只保留一个 NaN。
- 使用属性名进行对象比较时，会使用 `JSON.stringify` 将属性值转换为字符串进行比较，对于包含循环引用的对象可能会有问题。

## 引入方式

要在项目中使用 `uniqueArray` 函数，您可以单独引入：

```js
import { uniqueArray } from 'xxm-test-js';
```

或者引入整个工具库：

```js
import xxmJs from 'xxm-test-js';
// 使用：xxmJs.uniqueArray(数组, 比较参数)
```