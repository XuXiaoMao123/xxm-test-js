# 过滤对象属性函数（filterObject）

## 概述

`filterObject` 函数用于根据提供的过滤条件函数过滤对象的属性。该函数会遍历对象的所有可枚举属性，并根据过滤条件保留或移除属性，返回一个包含满足条件属性的新对象。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
/**
 * 根据条件过滤对象的属性。
 * 该函数会遍历对象的所有可枚举属性，并根据提供的过滤条件函数保留或移除属性。
 * @template T - 原始对象类型
 * @param {T} obj - 要过滤的对象。
 * @param {(value: any, key: string, obj: T) => boolean} predicate - 过滤条件函数，返回true的属性会被保留，返回false的属性会被移除。
 * @returns {Partial<T>} - 过滤后的新对象，只包含满足条件的属性。
 */
export function filterObject<T extends Record<string, any>>(
  obj: T,
  predicate: (value: any, key: string, obj: T) => boolean
): Partial<T>;
```

## 参数

- `obj`: 要过滤的对象。必须是一个有效的对象。
- `predicate`: 过滤条件函数，接收三个参数：
  - `value`: 当前属性的值
  - `key`: 当前属性的键名
  - `obj`: 原始对象
    返回 `true` 时保留该属性，返回 `false` 时移除该属性。

## 返回值

- 过滤后的新对象（`Partial<T>`），只包含满足条件的属性。返回的对象类型是原始对象类型的部分类型。

## 示例用法

```js
// 示例1: 过滤出值为数字类型的属性
const obj1 = { a: 1, b: 'string', c: 3, d: null };
const filteredObj1 = filterObject(obj1, (value) => typeof value === 'number');
console.log(filteredObj1); // 输出: { a: 1, c: 3 }

// 示例2: 过滤出属性名长度大于1的属性
const obj2 = { a: 1, ab: 2, abc: 3 };
const filteredObj2 = filterObject(obj2, (_, key) => key.length > 1);
console.log(filteredObj2); // 输出: { ab: 2, abc: 3 }

// 示例3: 组合条件过滤
const obj3 = { a: 1, b: 2, c: 3, d: 4 };
const filteredObj3 = filterObject(obj3, (value, key) => value > 2 && key !== 'd');
console.log(filteredObj3); // 输出: { c: 3 }

// 示例4: 过滤出非空属性
const obj4 = { a: 1, b: null, c: undefined, d: '' };
const filteredObj4 = filterObject(
  obj4,
  (value) => value !== null && value !== undefined && value !== ''
);
console.log(filteredObj4); // 输出: { a: 1 }

// 示例5: 配合其他函数使用
const user = {
  id: 1,
  name: '张三',
  age: 25,
  email: 'zhangsan@example.com',
  address: null,
  phone: '13800138000',
};

// 获取用户的有效联系方式
const contactInfo = filterObject(user, (value, key) => {
  const contactKeys = ['email', 'phone'];
  return contactKeys.includes(key) && value;
});
console.log(contactInfo); // 输出: { email: 'zhangsan@example.com', phone: '13800138000' }
```

## 应用场景

- **数据清洗**：过滤掉对象中的无效、空或不需要的属性。
- **对象转换**：根据特定条件提取对象的部分属性，创建新的对象。
- **数据脱敏**：移除敏感属性，保护用户隐私。
- **数据格式化**：根据前端展示需求，过滤出需要显示的属性。
- **API 请求前处理**：过滤掉不需要发送到服务器的本地属性。

## 注意事项

- 函数只会遍历对象自身的可枚举属性，不会处理原型链上的属性。
- 如果传入的第一个参数不是对象，函数会抛出错误。
- 如果传入的第二个参数不是函数，函数会抛出错误。
- 返回的是一个新对象，不会修改原始对象。

## 引入方式

要在项目中使用 `filterObject` 函数，您可以单独引入：

```js
import { filterObject } from 'xxm-test-js';
```

或者引入整个工具库：

```js
import xxmJs from 'xxm-test-js';
// 使用：xxmJs.filterObject(对象, 过滤条件)
```
