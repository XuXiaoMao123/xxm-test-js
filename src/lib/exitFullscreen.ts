/**
 * 请求退出全屏模式。
 *
 * @throws {Error} 如果在退出全屏模式时发生错误，将抛出错误。
 * @example
 * ```typescript
 * // 示例使用
 * try {
 *   exitFullscreen();
 * } catch (error) {
 *   console.error(error);
 * }
 * ```
 */
export function exitFullscreen(): void {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if ((document as any).webkitExitFullscreen) {
    // Safari
    (document as any).webkitExitFullscreen();
  } else if ((document as any).msExitFullscreen) {
    // IE11
    (document as any).msExitFullscreen();
  } else {
    throw new Error('当前浏览器不支持退出全屏模式');
  }
}
