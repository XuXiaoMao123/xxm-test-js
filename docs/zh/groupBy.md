# 数组元素分组（Group By）

## 概述

`groupBy` 函数是一个灵活的数组分组工具，它可以根据指定的条件将数组元素分组到不同的集合中。与 `categorizeBy` 相比，`groupBy` 提供了更强大的功能，它不仅支持按属性名分组，还支持通过自定义函数来确定分组规则。这使得它在处理各种复杂的数据分组场景时非常有用。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
/**
 * 根据指定条件对数组元素进行分组。
 *
 * @template T - 数组元素的类型。
 * @template K - 分组键的类型，默认为 string。
 * @param {T[]} array - 要分组的数组。
 * @param {(item: T) => K | keyof T} grouper - 分组函数或属性名。如果是函数，将用其返回值作为分组键；如果是字符串，将用该属性的值作为分组键。
 * @returns {Record<string, T[]>} - 分组后的对象，其中每个键是分组值（转为字符串），对应的值是该分组的元素数组。
 */
export function groupBy<T extends object, K = string>(
  array: T[],
  grouper: ((item: T) => K) | keyof T
): Record<string, T[]>;
```

## 参数

- `array`: 要分组的对象数组。
- `grouper`: 分组依据，可以是一个函数或属性名：
  - 如果是函数，该函数接收数组中的每个元素作为参数，并返回一个值作为分组键。
  - 如果是字符串，将使用该属性名在数组元素中对应的值作为分组键。

## 返回值

- 返回一个以字符串为键、对象数组为值的对象。每一个键都是分组值（转换成字符串形式），而对应的值则是所有属于该分组的对象组成的数组。

## 示例用法

### 1. 使用属性名进行分组

```javascript
import { groupBy } from 'xxm-test-js';

const fruits = [
  { name: 'Apple', type: 'fruit' },
  { name: 'Carrot', type: 'vegetable' },
  { name: 'Banana', type: 'fruit' },
  { name: 'Broccoli', type: 'vegetable' },
];

const groupedByType = groupBy(fruits, 'type');
console.log(groupedByType);
// 输出:
// {
//   fruit: [{ name: 'Apple', type: 'fruit' }, { name: 'Banana', type: 'fruit' }],
//   vegetable: [{ name: 'Carrot', type: 'vegetable' }, { name: 'Broccoli', type: 'vegetable' }]
// }
```

### 2. 使用自定义函数进行分组

```javascript
import { groupBy } from 'xxm-test-js';

const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 },
  { name: 'David', age: 35 },
  { name: 'Eve', age: 30 },
];

// 根据年龄范围分组
const groupedByAgeRange = groupBy(users, (user) => {
  if (user.age < 25) return 'young';
  if (user.age < 35) return 'middle';
  return 'old';
});

console.log(groupedByAgeRange);
// 输出:
// {
//   middle: [
//     { name: 'Alice', age: 25 },
//     { name: 'Bob', age: 30 },
//     { name: 'Charlie', age: 25 },
//     { name: 'Eve', age: 30 }
//   ],
//   old: [{ name: 'David', age: 35 }]
// }
```

### 3. 基于计算属性进行分组

```javascript
import { groupBy } from 'xxm-test-js';

const products = [
  { name: 'Product A', price: 10, category: 'electronics' },
  { name: 'Product B', price: 20, category: 'clothing' },
  { name: 'Product C', price: 15, category: 'electronics' },
  { name: 'Product D', price: 25, category: 'clothing' },
];

// 根据价格和类别的组合进行分组
const groupedByCategoryAndPrice = groupBy(
  products,
  (product) => `${product.category}-${product.price > 15 ? 'expensive' : 'cheap'}`
);

console.log(groupedByCategoryAndPrice);
// 输出:
// {
//   'electronics-cheap': [{ name: 'Product A', price: 10, category: 'electronics' }],
//   'clothing-expensive': [{ name: 'Product B', price: 20, category: 'clothing' }],
//   'electronics-cheap': [{ name: 'Product C', price: 15, category: 'electronics' }],
//   'clothing-expensive': [{ name: 'Product D', price: 25, category: 'clothing' }]
// }
```

## 注意事项

1. 当数组元素不是对象或为 `null` 时，这些元素将被忽略。
2. 如果使用属性名作为分组依据，但该属性在元素中不存在或值为 `undefined`，该元素将被忽略。
3. 所有的分组键都会被转换为字符串，以确保它们可以作为对象的有效键。

## 与 categorizeBy 的区别

`groupBy` 函数是 `categorizeBy` 的增强版本，提供了更灵活的分组能力：

- `categorizeBy` 只能根据对象的属性名进行分组。
- `groupBy` 不仅可以根据属性名分组，还可以使用自定义函数来生成更复杂的分组规则。
