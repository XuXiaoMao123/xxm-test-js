# 并发执行一组异步任务（Run Tasks With Concurrency）

## 概述

`runTasksWithConcurrency` 函数用于并发执行一组返回 Promise 的异步任务，同时限制并发执行的任务数量。该函数允许开发者控制多少个任务可以同时运行，这对于管理资源和避免系统过载非常重要。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

```typescript
/**
 * 并发执行一组异步任务，限制最大并发数。
 *
 * @param tasks - 任务数组，每个任务都是一个返回 Promise 的函数。
 * @param concurrency - 允许的最大并发数。
 * @returns 返回一个包含所有任务结果的 Promise 数组。
 */
export async function runTasksWithConcurrency<T>(
  tasks: (() => Promise<T>)[],
  concurrency: number
): Promise<T[]>;
```

## 参数

- `tasks`: 一个函数数组，其中每个函数都应该返回一个 Promise，代表一个异步操作。
- `concurrency`: 一个数字，表示允许的最大并发任务数。

## 返回值

- 返回一个 `Promise`，当所有的任务都完成时，它会解析为一个包含所有任务结果的数组。

## 示例用法

```js
// 使用示例
const task1 = () => new Promise((resolve) => setTimeout(() => resolve('Task 1'), 1000));
const task2 = () => new Promise((resolve) => setTimeout(() => resolve('Task 2'), 500));
const task3 = () => new Promise((resolve) => setTimeout(() => resolve('Task 3'), 750));

async function execute() {
  const tasks = [task1, task2, task3];
  const results = await runTasksWithConcurrency(tasks, 2); // 最大并发数为2
  console.log(results); // 输出：['Task 2', 'Task 3', 'Task 1']
}

execute();
```

## 适用场景

- 资源管理：在需要控制并发请求的数量以节省资源或避免过载的情况下使用。
- 异步流程控制：当多个异步任务需要按顺序或分批执行时，可用于优化性能。

## 总结

- `runTasksWithConcurrency` 是一个有效的工具，可以在并发执行多个异步任务的同时，确保不会超过指定的并发限制。这对于网络请求、文件读写等可能消耗大量资源的操作特别有用。

## 引入

- 要在使用的项目中使用 `runTasksWithConcurrency` 函数，您可以单独引入：

```js
import { runTasksWithConcurrency } from 'xxm-test-js';
```

## 贡献

- 希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。
