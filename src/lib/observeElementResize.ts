/**
 * 监听元素尺寸变化并执行回调函数
 * @param {HTMLElement} targetElement - 要监听的目标元素
 * @param {(contentRect: DOMRectReadOnly) => void} callback - 当元素尺寸变化时要执行的回调函数
 * @returns {ResizeObserver} - 返回一个 ResizeObserver 实例，可用于后续的解除监听
 * @example
 * ```typescript
 * // 示例使用
 * const element = document.getElementById('myElement') as HTMLElement;
 * if (element) {
 *    const observer = observeElementResize(element, (contentRect) => {
 *        console.log('元素尺寸变化：', contentRect);
 *    });
 *    setTimeout(() => unobserveElementResize(observer), 5000);
 * }
 * ```
 */
export function observeElementResize(
  targetElement: HTMLElement,
  callback: (contentRect: DOMRectReadOnly) => void
): ResizeObserver {
  if (!(targetElement instanceof HTMLElement)) {
    throw new Error('targetElement 必须是一个有效的 HTMLElement');
  }
  if (typeof callback !== 'function') {
    throw new Error('callback 必须是一个函数');
  }

  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.target === targetElement) {
        callback(entry.contentRect);
      }
    }
  });

  observer.observe(targetElement);
  return observer;
}

/**
 * 取消对元素尺寸变化的监听
 * @param {ResizeObserver} observer - 之前创建的 ResizeObserver 实例
 * @example
 * ```typescript
 * // 示例使用
 * const element = document.getElementById('myElement') as HTMLElement;
 * if (element) {
 *    const observer = observeElementResize(element, (contentRect) => {
 *        console.log('元素尺寸变化：', contentRect);
 *    });
 *    setTimeout(() => unobserveElementResize(observer), 5000);
 * }
 * ```
 */
export function unobserveElementResize(observer: ResizeObserver): void {
  if (observer instanceof ResizeObserver) {
    observer.disconnect();
  } else {
    throw new Error('observer 必须是一个有效的 ResizeObserver 实例');
  }
}
