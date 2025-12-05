# 深拷贝函数（Deep Copy）

## 概述

`deepCopy` 函数用于创建一个对象或数组的深拷贝。这意味着新对象或数组的属性和值与原始对象相同，且修改新对象不会影响原始对象。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
/**
 * 创建一个对象或数组的深拷贝。
 *
 * @param obj - 需要被拷贝的对象或数组。
 * @returns 一个新的对象或数组，其属性和值与原始对象相同。
 */
function deepCopy<T>(obj: T): T;
```

## 参数

- `obj`: 需要被拷贝的对象或数组。

## 返回值

- 返回一个新的对象或数组，其属性和值与原始对象相同，且类型与输入 obj 相同。

## 示例用法

```js
const originalObj = { a: 1, b: { c: 2 } };
const copiedObj = deepCopy(originalObj);
console.log(copiedObj); // 输出: { a: 1, b: { c: 2 } }

const originalArr = [1, 2, [3, 4]];
const copiedArr = deepCopy(originalArr);
console.log(copiedArr); // 输出: [1, 2, [3, 4]]
```

## 适用场景

- 当需要对对象或数组进行修改，但同时希望保留原始数据不变时。
- 在函数式编程中，为了保持不可变性，经常需要使用深拷贝。

## 总结

- 深拷贝函数是一种常用的工具函数，它可以帮助我们在不改变原始数据的前提下，对数据进行操作和修改。这在很多编程场景中都非常有用，尤其是在需要保持数据不变性的情况下。

## 引入

要在使用的项目中使用 `deepCopy` 函数，您可以单独引入：

```js
import { deepCopy } from 'xxm-test-js';
```

## 贡献

希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。
