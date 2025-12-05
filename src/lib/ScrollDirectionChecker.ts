/**
 * 用于检测页面滚动方向的工具类。
 * 该类提供了一个静态方法来获取当前的滚动方向，不包含事件监听，需要时手动调用。
 *
 * @returns {'up' | 'down' | 'top' | 'bottom'} 当前的滚动方向，可能的值为 'up'（向上滚动）、'down'（向下滚动）、'top'（页面顶部）、'bottom'（页面底部）。
 * @example
 * ```javascript
 * const direction = ScrollDirectionChecker.getDirection();
 * console.log('当前滚动方向:', direction);
 * ```
 */
class ScrollDirectionChecker {
  // 添加配置项
  private static config: { ignoreThreshold: number } = { ignoreThreshold: 1 };

  // 使用更通用的方法获取滚动位置
  private static getScrollPosition(): number {
    return window.pageYOffset ?? document.documentElement.scrollTop ?? document.body.scrollTop ?? 0;
  }

  // 修改初始化代码
  private static lastScrollPosition: number = this.getScrollPosition();
  private static lastDirection: 'up' | 'down' | 'top' | 'bottom' =
    this.lastScrollPosition <= 0 ? 'top' : 'down';

  public static getDirection(): 'up' | 'down' | 'top' | 'bottom' {
    const currentPosition = this.getScrollPosition();

    // 1. 检测是否在顶部/底部
    if (currentPosition <= 0) {
      this.lastDirection = 'top';
    } else if (currentPosition + window.innerHeight >= document.documentElement.scrollHeight - 1) {
      this.lastDirection = 'bottom';
    }
    // 2. 计算方向变化
    else {
      const diff = currentPosition - this.lastScrollPosition;
      if (Math.abs(diff) > this.config.ignoreThreshold) {
        // 使用配置项忽略微小滚动
        this.lastDirection = diff > 0 ? 'down' : 'up';
      }
    }

    this.lastScrollPosition = currentPosition;
    return this.lastDirection;
  }
}
export { ScrollDirectionChecker };
