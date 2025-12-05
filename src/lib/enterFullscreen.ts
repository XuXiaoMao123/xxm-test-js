/**
 * 请求指定元素进入全屏模式。
 *
 * @param {HTMLElement | null} element - 要进入全屏模式的 HTML 元素，可能为 null。
 * @throws {TypeError} 如果传入的参数不是有效的 HTMLElement 或 null，将抛出错误。
 *
 * @example
 * ```typescript
 * const targetElement = document.getElementById('your-element-id');
 * enterFullscreen(targetElement);
 * ```
 */
export function enterFullscreen(element: HTMLElement | null): void {
  // 检查传入的元素是否为有效的 HTMLElement 或 null
  if (element !== null && !(element instanceof HTMLElement)) {
    throw new TypeError('传入的参数必须是有效的 HTMLElement 或 null');
  }

  if (element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).webkitRequestFullscreen) {
      // Safari
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).msRequestFullscreen) {
      // IE11
      (element as any).msRequestFullscreen();
    }
  }
}
