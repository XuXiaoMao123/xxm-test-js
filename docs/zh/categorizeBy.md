# 根据属性值对对象数组进行分类（Categorize By）

## 概述

`categorizeBy` 函数接收一个对象数组和一个键名，然后根据每个对象中该键对应的值将这些对象归类到不同的组中。此函数对于需要按照特定属性对数据集进行分组的场景非常有用，例如在处理用户列表、产品目录等。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
/**
 * 根据对象数组中每个元素指定属性的值进行分类。
 *
 * @template T - 数组元素的类型。
 * @param {T[]} array - 要分类的对象数组。
 * @param {keyof T} key - 用于分类的属性名，必须是对象中存在的属性。
 * @returns {Record<string, T[]>} - 分类后的新对象，其中每个键都是由 `key` 指定的属性值（转为字符串），对应的值是由具有相同键值的对象组成的数组。
 */
export function categorizeBy<T extends object>(array: T[], key: keyof T): Record<string, T[]>;
```

## 参数

- `array`: 要分类的对象数组。
- `key`: 用于分类的属性名，必须是对象中存在的属性，并且不能为 `undefined`。

## 返回值

- 返回一个以字符串为键、对象数组为值的对象。每一个键都是由 `key` 指定的属性值（转换成字符串形式），而对应的值则是所有拥有相同键值的对象组成的数组。

## 示例用法

```js
// 使用示例
const fruits = [
  { name: 'Apple', type: 'fruit' },
  { name: 'Carrot', type: 'vegetable' },
  { name: 'Banana', type: 'fruit' },
  { name: 'Broccoli', type: 'vegetable' },
];
const categorizedFruits = categorizeBy(fruits, 'type');
console.log(categorizedFruits);
// 输出:
// {
//   fruit: [{ name: 'Apple', type: 'fruit' }, { name: 'Banana', type: 'fruit' }],
//   vegetable: [{ name: 'Carrot', type: 'vegetable' }, { name: 'Broccoli', type: 'vegetable' }]
// }

const numbers = [
  { id: 1, category: 10 },
  { id: 2, category: 20 },
  { id: 3, category: 10 },
];
const categorizedNumbers = categorizeBy(numbers, 'category');
console.log(categorizedNumbers);
// 输出:
// {
//   "10": [{ id: 1, category: 10 }, { id: 3, category: 10 }],
//   "20": [{ id: 2, category: 20 }]
// }
```

## 适用场景

- 数据分组：当需要按照某个特定属性对一组对象进行分组时。
- 数据分析：在数据分析中，可能需要根据某些特征对记录进行分类。
- 用户界面：在构建用户界面时，可能需要根据用户的属性或产品的特性来组织显示内容。

## 总结

- `categorizeBy` 是一个简单而强大的工具，它允许开发者轻松地根据对象的属性值对对象数组进行分类。这个函数在处理需要按属性分组的数据时非常有用。

## 引入

要在使用的项目中使用 `categorizeBy` 函数，您可以单独引入：

```js
import { categorizeBy } from 'xxm-test-js';
```

## 贡献

希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。
