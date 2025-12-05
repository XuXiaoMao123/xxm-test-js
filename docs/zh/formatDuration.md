# 格式化时间差函数（formatDuration）

## 概述

`formatDuration` 函数用于将毫秒数转换为易读的时间格式（如"1 小时 30 分钟"）。该函数会根据传入的毫秒数，计算并返回相应的时间描述。如果传入的毫秒数无效，将返回错误提示。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
/**
 * 格式化时间差，将毫秒数转换为易读的时间格式（如"1小时30分钟"）。
 * 该函数会根据传入的毫秒数，计算并返回相应的时间描述。
 * 如果传入的毫秒数无效，将返回错误提示。
 * @param {number} milliseconds - 要格式化的时间差（毫秒）。
 * @param {Object} [options] - 可选配置项。
 * @param {boolean} [options.includeSeconds=false] - 是否包含秒数。
 * @param {boolean} [options.compact=false] - 是否使用紧凑格式（如"1h30m"）。
 * @returns {string} - 格式化后的时间字符串。
 */
export function formatDuration(
  milliseconds: number,
  options?: {
    includeSeconds?: boolean;
    compact?: boolean;
  }
): string;
```

## 参数

- `milliseconds`: 要格式化的时间差（毫秒）。必须是大于或等于 0 的有效数字。
- `options`: 可选的配置对象，包含以下属性：
- `includeSeconds`: 布尔值，默认为`false`，表示是否在结果中包含秒数。
- `compact`: 布尔值，默认为`false`，表示是否使用紧凑格式（如"1h30m"）而不是完整格式（如"1 小时 30 分钟"）。

## 返回值

- 格式化后的时间字符串，如"1 小时 30 分钟"或"1h30m"。如果传入无效的毫秒数，将返回"无效的时间差"。

## 示例用法

```js
// 示例1: 格式化1小时30分钟
const duration1 = 1 * 60 * 60 * 1000 + 30 * 60 * 1000;
console.log(formatDuration(duration1)); // 输出: 1小时30分钟

// 示例2: 格式化1小时30分钟15秒，包含秒数
const duration2 = 1 * 60 * 60 * 1000 + 30 * 60 * 1000 + 15 * 1000;
console.log(formatDuration(duration2, { includeSeconds: true })); // 输出: 1小时30分钟15秒

// 示例3: 使用紧凑格式
console.log(formatDuration(duration1, { compact: true })); // 输出: 1h30m

// 示例4: 格式化包含天的时间差
const duration3 = 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000;
console.log(formatDuration(duration3)); // 输出: 2天3小时

// 示例5: 传入无效的毫秒数
console.log(formatDuration(-1000)); // 输出: 无效的时间差

// 示例6: 传入0毫秒
console.log(formatDuration(0)); // 输出: 0分钟
console.log(formatDuration(0, { includeSeconds: true })); // 输出: 0秒
```

## 应用场景

- **时间显示**：在应用中展示任务耗时、视频时长等信息。
- **倒计时**：显示距离某个事件的剩余时间。
- **日志记录**：格式化操作耗时，便于日志分析。
- **性能监控**：显示函数执行时间，用于性能优化。

## 注意事项

- 函数内部对传入的毫秒数进行了有效性验证，确保其为非负数。
- 当传入 0 毫秒时，函数会根据是否包含秒数返回"0 分钟"或"0 秒"。
- 时间单位转换基于标准的时间计算（1 天=24 小时，1 小时=60 分钟，1 分钟=60 秒）。
