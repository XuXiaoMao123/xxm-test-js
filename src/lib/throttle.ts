/**
 * 创建一个节流函数，该函数会在最后一次调用后的指定时间后停止执行。
 * Copyright (c) 2024 xxm
 *
 * @param func - 需要节流的函数。
 * @param limit - 节流的时间间隔，单位是毫秒。
 * @returns 一个新的函数，该函数会在节流时间内限制原函数的执行。
 * @example
 * ```vue
 * <template>
 *   <div id="app"></div>
 * </template>
 *
 * <script>
 * import { throttle } from 'xxm-test-js';
 *
 * export default {
 *   name: 'App',
 *   data() {
 *     return {
 *       throttledHandleScroll: null
 *     }
 *   },
 *   methods: {
 *     handleScroll() {
 *       console.log('页面正在滚动...');
 *     }
 *   },
 *   mounted() {
 *     this.throttledHandleScroll = throttle(this.handleScroll, 200);
 *     window.addEventListener('scroll', this.throttledHandleScroll);
 *   },
 *   beforeDestroy() {
 *     window.removeEventListener('scroll', this.throttledHandleScroll);
 *   }
 * };
 * </script>
 * ```
 */
type ThrottleFunction<T extends unknown[]> = (...args: T) => void;

export function throttle<T extends unknown[]>(
  func: (...args: T) => void,
  limit: number
): ThrottleFunction<T> {
  let lastFunc: NodeJS.Timeout | null = null;
  let lastRan = 0;

  return function(...args: T) {
    const time = Date.now();
    if (time - lastRan >= limit) {
      func(...args);
      lastRan = time;
      lastFunc = null;
    } else if (lastFunc === null) {
      lastFunc = setTimeout(() => {
        func(...args);
        lastRan = Date.now();
        lastFunc = null;
      }, limit - (time - lastRan));
    }
  };
}
