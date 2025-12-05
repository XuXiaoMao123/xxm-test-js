/**
 * 获取当前处于全屏模式的元素。
 *
 * @returns {HTMLElement | null} 如果有元素处于全屏模式，则返回该元素；否则返回 null。
 * @example
 * ```typescript
 * 示例使用
 * const fullscreenElement = getFullscreenElement();
 * if (fullscreenElement) {
 *     console.log('当前全屏元素:', fullscreenElement);
 * } else {
 *     console.log('当前没有元素处于全屏模式');
 * }
 * ```
 */
export function getFullscreenElement(): HTMLElement | null {
  return (
    document.fullscreenElement ||
    (document as any).webkitFullscreenElement ||
    (document as any).mozFullScreenElement ||
    (document as any).msFullscreenElement ||
    null
  );
}
