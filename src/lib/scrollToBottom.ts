/**
 * 滚动到容器底部。
 * @param {HTMLElement | Window} [container=window] - 要滚动的容器，默认为window。
 * @param {ScrollToOptions} [options={ behavior: 'smooth' }] - 滚动选项。
 * @returns {Promise<void>} - 滚动完成的Promise。
 * @example
 * ```javascript
 * // 使用示例
 * // 滚动到页面底部
 * scrollToBottom().then(() => {
 *   // 滚动完成后执行其他操作
 *   console.log('已滚动到页面底部');
 * });
 *
 * // 滚动到指定元素的底部
 * const element = document.getElementById('myElement');
 * scrollToBottom(element).then(() => {
 *   // 滚动完成后显示提示信息
 *   alert('已滚动到指定元素底部');
 * });
 * ```
 */
export function scrollToBottom(
  container: HTMLElement | Window = window,
  options: ScrollToOptions = { behavior: 'smooth' }
): Promise<void> {
  return new Promise((resolve) => {
    if (container === window) {
      const scrollHeight = document.documentElement.scrollHeight;
      container.scrollTo({ ...options, top: scrollHeight });
    } else {
      if ('scrollLeft' in container) {
        const scrollHeight = container.scrollHeight;
        container.scrollTo({ ...options, top: scrollHeight, left: container.scrollLeft });
      } else {
        const scrollHeight =
          'scrollHeight' in container
            ? container.scrollHeight
            : document.documentElement.scrollHeight;
        // 为了确保 scrollHeight 是 number 类型，进行类型断言
        container.scrollTo({ ...options, top: scrollHeight as number });
      }
    }
    const checkScroll = () => {
      if (
        (container === window &&
          window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) ||
        (container !== window &&
          (container as HTMLElement).scrollTop + (container as HTMLElement).clientHeight >=
            (container as HTMLElement).scrollHeight)
      ) {
        resolve();
      } else {
        requestAnimationFrame(checkScroll);
      }
    };
    requestAnimationFrame(checkScroll);
  });
}
