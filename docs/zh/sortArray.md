# 通用排序函数（Sort Array）

## 概述

`sortArray` 函数是一个通用的排序工具，它可以对普通数组或对象数组根据指定字段进行升序或降序排序。

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
 * @returns {Array<any>} - 排序后的数组
 */
export declare function sortArray<T>(array: T[], order?: 'asc' | 'desc', field?: keyof T | null): T[];
```

## 参数

- `array`: 要排序的数组。
- `order` (可选): 排序顺序，默认为 'asc' 表示升序，'desc' 表示降序。
- `field` (可选): 对象数组中用于排序的字段名，如果是普通数组则为 null。

## 返回值

- 返回排序后的数组。

## 示例用法

```js
// 示例用法
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
console.log(sortArray(numbers)); // 升序排序 [1, 1, 2, 3, 4, 5, 6, 9]
console.log(sortArray(numbers, 'desc')); // 降序排序 [9, 6, 5, 4, 3, 2, 1, 1]

const strings = ["banana", "apple", "orange"];
console.log(sortArray(strings)); // 字典序升序排序 ["apple", "banana", "orange"]
console.log(sortArray(strings, 'desc')); // 字典序降序排序 ["orange", "banana", "apple"]

interface User {
    name: string;
    age: number;
}

const users: User[] = [
    { name: "John", age: 30 },
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 }
];

// 根据年龄升序排序
console.log(sortArray(users, 'asc', 'age'));
// 输出: [{ name: "Alice", age: 25 }, { name: "John", age: 30 }, { name: "Bob", age: 30 }]

// 根据姓名字典序降序排序
console.log(sortArray(users, 'desc', 'name'));
// 输出: [{ name: "John", age: 30 }, { name: "Bob", age: 30 }, { name: "Alice", age: 25 }]
```

## 适用场景

- 数据处理：在需要对数据进行排序时，无论是简单的数组还是复杂的对象数组。
- 用户界面：在表格或列表中显示排序后的数据。

## 总结

- 通用排序函数是一个强大的工具，它提供了一种灵活的方式来对数组进行排序，无论是升序还是降序，无论是普通数组还是对象数组，都能满足需求。

## 安装

- 要在使用的项目中使用 sortArray 函数，您可以单独安装：
```js
import { sortArray } from 'xxm-test-js/dist/lib/sortArray.js';
```

## 贡献
- 希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。
