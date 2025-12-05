# 通用排序函数（Sort Array）

## 概述

`sortArray` 函数是一个通用的排序工具，它可以对普通数组或对象数组根据指定字段进行升序或降序排序。该函数支持数字、字符串、字符串数字以及混合类型的排序。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
/**
 * 通用排序函数
 * 对普通数组或对象数组根据指定字段进行升序或降序排序
 * 
 * @param {Array<any>} array - 要排序的数组
 * @param {string} [order='asc'] - 排序顺序，'asc' 表示升序，'desc' 表示降序
 * @param {string|null} [field=null] - 对象数组中用于排序的字段名，如果是普通数组则为null
 * @param {boolean} [numericStrings=false] - 是否将字符串作为数字处理（如果可能）
 * @returns {Array<any>} - 排序后的数组
 */
export declare function sortArray<T>(
    array: T[], 
    order?: 'asc' | 'desc', 
    field?: keyof T | null,
    numericStrings?: boolean
): T[];
```

## 参数

- `array`: 要排序的数组。
- `order` (可选): 排序顺序，默认为 'asc' 表示升序，'desc' 表示降序。
- `field` (可选): 对象数组中用于排序的字段名，如果是普通数组则为 null。
- `numericStrings` (可选): 是否将字符串作为数字处理（如果可能），默认为 false。

## 返回值

- 返回排序后的数组。

## 示例用法

### 基本排序

```js
// 数字数组排序
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
console.log(sortArray(numbers)); // 升序排序 [1, 1, 2, 3, 4, 5, 6, 9]
console.log(sortArray(numbers, 'desc')); // 降序排序 [9, 6, 5, 4, 3, 2, 1, 1]

// 字符串数组排序
const strings = ["banana", "apple", "orange"];
console.log(sortArray(strings)); // 字典序升序排序 ["apple", "banana", "orange"]
console.log(sortArray(strings, 'desc')); // 字典序降序排序 ["orange", "banana", "apple"]
```

### 字符串数字排序

```js
// 字符串数字排序
const stringNumbers = ["10", "2", "1", "21"];
console.log(sortArray(stringNumbers)); 
// 字典序升序排序 ["1", "10", "2", "21"]

console.log(sortArray(stringNumbers, 'asc', null, true)); 
// 数值升序排序 ["1", "2", "10", "21"]
```

### 混合类型排序

```js
// 混合类型排序（数字和字符串数字）
const mixedValues = [5, "10", 1, "2"];
console.log(sortArray(mixedValues, 'asc', null, true)); 
// 数值升序排序 [1, "2", 5, "10"]
```

### 对象数组排序

```js
interface User {
    name: string;
    age: number | string; // 年龄可能是数字或字符串
    score: string; // 分数存储为字符串
}

const users: User[] = [
    { name: "John", age: 30, score: "100" },
    { name: "Alice", age: "25", score: "85" },
    { name: "Bob", age: 28, score: "120" }
];

// 根据年龄升序排序（混合类型）
console.log(sortArray(users, 'asc', 'age', true)); 
// 输出: [{ name: "Alice", age: "25", score: "85" }, { name: "Bob", age: 28, score: "120" }, { name: "John", age: 30, score: "100" }]

// 根据分数（字符串数字）升序排序
console.log(sortArray(users, 'asc', 'score', true)); 
// 输出: [{ name: "Alice", age: "25", score: "85" }, { name: "John", age: 30, score: "100" }, { name: "Bob", age: 28, score: "120" }]

// 根据姓名字典序降序排序
console.log(sortArray(users, 'desc', 'name'));
// 输出: [{ name: "John", age: 30, score: "100" }, { name: "Bob", age: 28, score: "120" }, { name: "Alice", age: "25", score: "85" }]
```

## 适用场景

- **数据处理**：在需要对数据进行排序时，无论是简单的数组还是复杂的对象数组。
- **用户界面**：在表格或列表中显示排序后的数据。
- **字符串数字排序**：处理包含数字字符串的数组，如 ["1", "10", "2"] 需要按数值而非字典序排序。
- **混合类型处理**：处理同时包含数字和字符串数字的数组或对象字段。

## 特性

- 支持普通数组和对象数组的排序
- 支持升序和降序排序
- 支持字符串数字的数值排序
- 支持混合类型（数字和字符串数字）的排序
- 智能处理不同类型值的比较

## 总结

通用排序函数是一个强大而灵活的工具，它不仅可以对普通数组和对象数组进行排序，还能智能地处理字符串数字和混合类型的排序。通过 `numericStrings` 参数，可以控制是否将字符串作为数字进行处理，从而满足不同的排序需求。

## 引入

要在使用的项目中使用 `sortArray` 函数，您可以单独引入：
```js
import { sortArray } from 'xxm-test-js';
```

## 贡献
希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。
