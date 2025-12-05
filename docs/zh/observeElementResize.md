# 监听元素尺寸变化方法（Observe Element Resize）

## 概述

本部分提供了两个函数：`observeElementResize` 用于监听指定元素的尺寸变化，并在元素尺寸发生变化时执行传入的回调函数；`unobserveElementResize` 用于取消之前设置的对元素尺寸变化的监听。这两个函数利用了 `ResizeObserver API`，提供了高效且方便的方式来处理元素尺寸变化的监听和取消监听操作。

## 版权信息

版权所有 © 2024 xxm

## 函数签名

### `observeElementResize`
```typescript
/**
 * 监听元素尺寸变化并执行回调函数
 * @param {HTMLElement} targetElement - 要监听的目标元素
 * @param {(contentRect: DOMRectReadOnly) => void} callback - 当元素尺寸变化时要执行的回调函数
 * @returns {ResizeObserver} - 返回一个 ResizeObserver 实例，可用于后续的解除监听
 */
export function observeElementResize(targetElement: HTMLElement, callback: (contentRect: DOMRectReadOnly) => void): ResizeObserver
```
### `unobserveElementResize`
```typescript
/**
 * 取消对元素尺寸变化的监听
 * @param {ResizeObserver} observer - 之前创建的 ResizeObserver 实例
 */
export function unobserveElementResize(observer: ResizeObserver): void
```

## 参数
### `observeElementResize`
- `targetElement`：要监听尺寸变化的目标元素，必须是一个有效的 `HTMLElement`。如果传入的不是 `HTMLElement`，函数会抛出错误。
- `callback`：当元素尺寸发生变化时要执行的回调函数。该函数会接收一个 `contentRect` 对象作为参数，该对象包含了元素的新尺寸信息（如 `width`、`height` 等）。如果传入的不是函数，函数会抛出错误。

### `unobserveElementResize`
- `observer`：之前通过 `observeElementResize` 函数创建的 `ResizeObserver` 实例。如果传入的不是有效的 `ResizeObserver` 实例，函数会抛出错误。


## 返回值
### `observeElementResize`
- 返回一个 `ResizeObserver` 实例，你可以使用该实例的 disconnect 方法来解除对元素的监听。

### `unobserveElementResize`
- 该函数没有返回值。


## 示例用法
```js
const element = document.getElementById('myElement') as HTMLElement;
if (element) {
    const observer = observeElementResize(element, (contentRect) => {
        console.log('元素尺寸变化：', contentRect);
    });

    // 一段时间后取消监听
    setTimeout(() => {
        unobserveElementResize(observer);
        console.log('已取消监听元素尺寸变化');
    }, 5000);
}
```

## 适用场景
- 响应式布局：在网页设计中，根据元素尺寸的变化动态调整布局，当不需要再监听时取消监听以节省性能。
- 图表更新：当图表容器的尺寸变化时，重新绘制图表，在特定条件下取消监听。
- 自适应内容：根据元素尺寸的变化调整内容的显示方式，在合适的时候停止监听。

## 总结
- `observeElementResize` 和 `unobserveElementResize` 函数为开发者提供了完整的解决方案，用于监听和取消对元素尺寸变化的监听。通过使用 `ResizeObserver API`，避免了传统方法的性能问题，使得代码更加简洁和易于维护。无论是在响应式设计还是动态内容更新方面，这两个函数都能发挥重要作用。

## 引入
要在使用的项目中使用这两个函数，您可以单独引入：
```js
import { observeElementResize, unobserveElementResize } from 'xxm-test-js';
```

## 贡献
希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。如果您发现文档或函数实现有任何错误、不足，欢迎提交反馈或贡献代码以改进它。


