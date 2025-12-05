# 获取相对时间函数（getRelativeTime）

## 概述

`getRelativeTime` 函数用于根据传入的日期与当前日期的差值，计算并返回相应的相对时间描述。如果传入的日期无效，将返回错误提示；如果在日期计算过程中出现错误，将抛出异常。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
/**
 * 获取相对时间，如刚刚、几天前、几个月前、几年前。
 * 该函数会根据传入的日期与当前日期的差值，计算并返回相应的相对时间描述。
 * 如果传入的日期无效，将返回错误提示。
 * 如果在日期计算过程中出现错误，将抛出异常。
 * @param {Date} date - 要比较的日期，必须是一个有效的Date对象。
 * @returns {string} - 相对时间字符串，可能的值有：刚刚、x 分钟前、x 小时前、x 天前、x 个月前、x 年前；若传入的时间参数无效，返回 '传入的时间参数无效'。
 * @throws {Error} - 如果在日期计算过程中出现错误，抛出 '日期计算出错: [具体错误信息]' 的异常。
 */
export function getRelativeTime(date: Date): string;
```

## 参数

- `date`: 要比较的日期，必须是一个有效的 Date 对象。

## 返回值

- 相对时间字符串，可能的值有：刚刚、x 分钟前、x 小时前、x 天前、x 个月前、x 年前；若传入的时间参数无效，返回 '传入的时间参数无效'。

## 示例用法

```js
// 示例1: 传入当前时间，返回 '刚刚'
const now = new Date();
console.log(getRelativeTime(now)); // 输出: 刚刚

// 示例2: 传入10分钟前的时间，返回 '10 分钟前'
const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);
console.log(getRelativeTime(tenMinutesAgo)); // 输出: 10 分钟前

// 示例3: 传入1天前的时间，返回 '1 天前'
const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
console.log(getRelativeTime(oneDayAgo)); // 输出: 1 天前

// 示例4: 传入无效的日期，返回 '传入的时间参数无效'
const invalidDate = new Date('invalid date');
console.log(getRelativeTime(invalidDate)); // 输出: 传入的时间参数无效
```

## 适用场景

- 显示时间相关信息：在需要显示相对时间的场景中，如社交媒体的动态时间、消息的发送时间等。

## 总结

- `getRelativeTime` 函数是一个方便的工具，它可以帮助我们根据传入的日期与当前日期的差值，计算并返回相应的相对时间描述。

## 引入

- 要在使用的项目中使用 `getRelativeTime` 函数，您可以单独引入：

```js
import { getRelativeTime } from 'xxm-test-js';
```

## 贡献

- 希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。
