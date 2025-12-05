# 防抖函数（Debounce）

## 概述

`debounce` 函数是一个工具函数，它将延迟调用传入的 `func` 函数，直到自最后一次调用防抖函数后经过了 `delay` 毫秒。这个函数特别适用于您想要限制函数执行频率的场景，例如用户输入时触发的连续事件。

## 版权信息

版权所有 (c) 2024 xxm

## 函数签名

```typescript
/**
 * 创建一个防抖函数，该函数会延迟调用 `func` 直到自最后一次调用防抖函数后 `delay` 毫秒已过去。
 *
 * @template T - 函数类型，表示被防抖的函数。
 * @param {T} func - 需要防抖的函数。
 * @param {number} delay - 延迟执行的时间，单位为毫秒。
 * @returns {(...args: Parameters<T>) => void} 返回一个防抖后的函数。
 */
function debounce<T>(func: T, delay: number): (...args: Parameters<T>) => void;
```

## 参数

- `func (T)`: 需要防抖的函数。
- `delay (number)`: 延迟执行的时间，单位为毫秒。

## 返回值

- 返回一个防抖后的函数，类型为 `(...args: Parameters<T>) => void`。

## 示例用法

- 示例 1: 用户输入搜索
  假设我们有一个搜索框，每当用户输入时，我们希望在用户停止输入后延迟执行搜索操作。使用 debounce 函数可以实现这一点：

```js
function search(query) {
  console.log(`Searching for: ${query}`);
}

const debouncedSearch = debounce(search, 300);

// 假设这个函数被绑定到一个输入框的 'input' 事件
document.getElementById('search-input').addEventListener('input', (event) => {
  debouncedSearch(event.target.value);
});
```

- 示例 2: 窗口调整大小
  在调整窗口大小时，我们希望在用户停止调整后执行某些操作。使用 debounce 函数可以避免频繁触发事件处理函数：

```js
function handleResize() {
  console.log('Window resized');
}

const debouncedResize = debounce(handleResize, 100);

window.addEventListener('resize', debouncedResize);
```

## 适用场景

- 用户输入：如搜索框、表单验证等。
- 窗口调整：如响应式布局、图表重绘等。
- 滚动事件：如无限滚动、懒加载等。

## 总结

防抖函数是一种强大的工具，可以帮助我们优化性能，减少不必要的计算。通过合理使用防抖函数，可以显著提升用户体验和应用性能。

## 引入

要在使用的项目中使用 `debounce` 函数，您可以单独引入：

```js
import { debounce } from 'xxm-test-js';
```

## 贡献

希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。
