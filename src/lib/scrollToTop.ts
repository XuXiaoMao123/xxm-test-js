/**
 * 滚动到容器顶部。
 * @param {HTMLElement | Window} [container=window] - 要滚动的容器，默认为window。
 * @param {ScrollToOptions} [options={ top: 0, behavior: 'smooth' }] - 滚动选项。
 * @returns {Promise<void>} - 滚动完成的Promise。
 * @example
 * ```javascript
 * // 使用示例
 * // 滚动到页面顶部
 * scrollToTop().then(() => {
 *   // 滚动完成后隐藏滚动按钮
 *   const scrollButton = document.getElementById('scrollButton');
 *   if (scrollButton) {
 *     scrollButton.style.display = 'none';
 *   }
 * });
 *
 * // 滚动到指定元素的顶部
 * const element = document.getElementById('myElement');
 * scrollToTop(element).then(() => {
 *   // 滚动完成后显示提示信息
 *   alert('已滚动到指定元素顶部');
 * });
 * ```
 */
export function scrollToTop(
  container: HTMLElement | Window = window,
  options: ScrollToOptions = { top: 0, behavior: 'smooth' }
): Promise<void> {
  return new Promise((resolve) => {
    if (container === window) {
      container.scrollTo(options);
    } else {
      if ('scrollLeft' in container) {
        container.scrollTo({ ...options, left: container.scrollLeft });
      } else {
        container.scrollTo(options);
      }
    }
    const checkScroll = () => {
      if (
        (container === window &&
          (window.pageYOffset || document.documentElement.scrollTop) <= options.top!) ||
        (container !== window &&
          'scrollTop' in container &&
          (container as HTMLElement).scrollTop <= options.top!)
      ) {
        resolve();
      } else {
        requestAnimationFrame(checkScroll);
      }
    };
    requestAnimationFrame(checkScroll);
  });
}
