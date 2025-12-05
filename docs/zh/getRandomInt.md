# 获取指定范围内的随机整数（Get Random Int）

## 概述

`getRandomInt` 函数用于获取指定范围内的随机整数。该函数接受最小值和最大值作为参数，返回一个介于这两个值之间的随机整数。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

````typescript
/**
 * 获取指定范围内的随机整数。
 *
 * @param min - 最小值（包含）。
 * @param max - 最大值（包含）。
 * @returns 一个介于 min 和 max 之间的随机整数。
 *
 * @example
 * ```typescript
 * // 示例使用
 * const randomInt = getRandomInt(1, 10);
 * console.log('随机整数为：', randomInt);
 * ```
 */
export function getRandomInt(min: number, max: number): number;
````

## 参数

- `min`: 类型为 `number`，最小值（包含）。
- `max`: 类型为 `number`，最大值（包含）。

## 返回值

- 返回一个 `number` 类型的值，表示介于 `min` 和 `max` 之间的随机整数。

## 示例用法

```typescript
// 示例使用
const randomInt = getRandomInt(1, 10);
console.log('随机整数为：', randomInt);
```

## 适用场景

- 随机数生成：在需要生成指定范围内随机整数的场景中使用，如游戏开发、随机排序等。

## 总结

- `getRandomInt` 提供了一种简单的方法来获取指定范围内的随机整数。

## 引入

要在使用的项目中使用 `getRandomInt` 函数，您可以单独引入：

```js
import { getRandomInt } from 'xxm-test-js';
```

## 贡献

希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。
